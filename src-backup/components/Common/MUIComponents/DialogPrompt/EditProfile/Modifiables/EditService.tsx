import React from "react";
import classes from "./Modifiables.module.scss";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDropzone } from "react-dropzone";
import ImageIcon from "@mui/icons-material/Image";
import Button from "@mui/material/Button";
import WarningIcon from "@mui/icons-material/Warning";
import type { ServiceRequestForm, ServiceRequestPayload, } from "../../../../../../redux/interfaces/backend/apis/servicePortfolio";
import Image from "next/image";
import Spinner from "../../../../Spinner/Spinner";
import { useAppDispatch, useAppSelector, } from "../../../../../../redux/app/hooks";
import Client from "../../../../../../firebase/firebase_client_exports";
import { ref, StorageReference, uploadBytes } from "firebase/storage";
import { updateNotification } from "../../../../../../redux/slices/notifications";
import { useRouter } from "next/router";
import { IdentifierType, SubIdentifierType } from "../EditFormDynamic";
import { IMetaData } from "../../../../../../redux/interfaces/backend/apis";
import { Autocomplete, createFilterOptions, FormControlLabel, Radio, RadioGroup, } from "@mui/material";
import { ResponseParams } from "../../../../../../redux/interfaces/backend/apiHandlers";
import { IServiceFrontendValidation } from "../../../../../../pages/api/v2/user-profile/services/validate-service-user";
import MUIEditAutoComplete from "../../../AutoComplete/MUIEditAutoComplete";

interface EditServiceProps {
    formCloseHandler?: () => void;
    formState: ServiceRequestForm;
    triggerChanges: () => void;
    identifier: IdentifierType;
    subidentifier: SubIdentifierType;
    metadata: IMetaData;
    open: boolean;
}

const filter = createFilterOptions();

export default function EditService(props: EditServiceProps) {
    const { formCloseHandler, formState, triggerChanges, open } = props;
    const router = useRouter();
    const [error, setError] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const closeModal = () => {
        setLoading(false);
        if (formCloseHandler) formCloseHandler();
    };
    const [fileUploaded, _] = React.useState(true);
    const [serviceForm, setServiceForm] =
        React.useState<ServiceRequestForm>(formState);
    const [file, setFile] = React.useState<any>({
        preview: serviceForm.publicUri ?? "/loading.png",
    });
    const { firebaseToken, uid, user: { plan } } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [imageUpdated, setImageUpdated] = React.useState(false);

    const [languages, setLanguages] = React.useState([] as string[]);
    const [genres, setGenres] = React.useState([] as string[]);
    const [genders, setGenders] = React.useState([] as string[]);
    const [cities, setCities] = React.useState([] as string[]);
    const [backendError, setBackendError] = React.useState("");
    const [category, setCategory] = React.useState([] as any[]);
    const [profession, setProfession] = React.useState([]);

    React.useEffect(() => {
        fetch("/api/v2/languages")
            .then((res) =>
                res
                    .json()
                    .then((data: ResponseParams) => {
                        setLanguages(data?.payload?.languages);
                        setCategory(data?.payload?.category?.map((value: any) => {
                            return { label: value, value: value };
                        }));
                        setProfession(data?.payload?.profession);
                    })
                    .catch((error) => console.log(error))
            )
            .catch((error) => console.error(error));
        fetch("/api/v2/cities")
            .then((data) =>
                data
                    .json()
                    .then((data) => {
                        setCities(data.payload);
                    })
                    .catch((error) => console.log(error))
            )
            .catch((error) => console.log(error));
    }, []);

    React.useEffect(() => {
        setFile({
            preview: formState.publicUri ?? "/loading.png",
        });
    }, [formState.publicUri]);

    const onFormChangeHandler = (
        formKey: keyof ServiceRequestForm,
        value: any
    ) => {
        setServiceForm({
            ...serviceForm,
            [formKey]: value,
        });
    };

    const onDrop = React.useCallback((acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
            setError(true);
        } else setError(false);
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setFile({
                file: file,
                preview: URL.createObjectURL(file),
            });
            setImageUpdated(true);
        }
    }, []);

    const errorOperator = (payload: {
        error: any;
        shouldcloseModal?: boolean;
        shouldSetBackendMessage?: boolean;
        updateMessage?: string;
        shouldUpdateMessage?: boolean;
    }) => {
        const {
            error,
            shouldcloseModal,
            shouldSetBackendMessage,
            updateMessage,
            shouldUpdateMessage,
        } = payload;
        if (shouldcloseModal) closeModal();
        if (shouldSetBackendMessage)
            setBackendError(
                updateMessage ?? "Unexpected Error from Server while validating inputs"
            );
        if (shouldUpdateMessage)
            dispatch(
                updateNotification({
                    message: updateMessage ?? "Failed to add service! Kindly try again.",
                    status: "error",
                    show: true,
                    title: "Upload Failed",
                })
            );
        setLoading(false);
    };

    const resetToInitState = () => {
        setBackendError("");
        setImageUpdated(false);
    };

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        maxSize: 10000000, //10MB
        accept: ["image/*"],
        onDrop,
    });

    const uploadDataHandler = (
        storageRef: StorageReference,
        payload: ServiceRequestPayload
    ) => {
        uploadBytes(storageRef, file.file, {
            contentType: file.file.type,
        })
            .then(() => {
                payload.payload.absImagePath = storageRef.fullPath;
                fetch("/api/portfolio/upload-service", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                })
                    .then((response) => {
                        response.json().then((data) => {
                            if (!data.error) {
                                closeModal();
                                dispatch(
                                    updateNotification({
                                        message: "Service details updated!",
                                        status: "success",
                                        show: true,
                                        title: "Upload Successful",
                                        timeout: 5000,
                                    })
                                );
                                triggerChanges();
                                resetToInitState();
                            } else {
                                closeModal();
                                if (data.isLoggedOut) {
                                    updateNotification({
                                        message:
                                            "Failed to add service! Session Expired. Redirecting you to Login Page.",
                                        status: "error",
                                        show: true,
                                        title: "Session Expired",
                                        timeout: 5000,
                                    });
                                    setTimeout(
                                        () => router.push("/pages/login/merchants/individuals"),
                                        5000
                                    );
                                    return;
                                }
                                dispatch(
                                    updateNotification({
                                        message: "Failed to add service! Kindly try again.",
                                        status: "error",
                                        show: true,
                                        title: "Upload Failed",
                                    })
                                );
                            }
                        });
                    })
                    .catch((error) => {
                        errorOperator({
                            error,
                            shouldcloseModal: true,
                            updateMessage: "Failed to add service! Kindly try again.",
                            shouldUpdateMessage: true,
                        });
                    });
            })
            .catch((error) => {
                alert("Upload Failed. Kindly Retry");
                errorOperator({
                    error,
                    shouldcloseModal: true,
                    updateMessage: "Failed to add service! Kindly try again.",
                    shouldUpdateMessage: true,
                });
            });
    };

    const onSubmitHandler = () => {
        if (!file) {
            alert("Please upload an Image");
            return;
        }
        if (file !== null || file !== undefined) {
            const ts = new Date().getTime();
            const storageRef = ref(
                Client.storage,
                `/db-dev/user-metadata/portfolio/services/${uid}/${formState.serviceImageLoc}`
            );
            setLoading(true);
            setServiceForm((initialForm) => ({
                ...initialForm,
                serviceImageLoc: formState.serviceImageLoc,
                id: formState.id,
            }));
            const validatePayload: IServiceFrontendValidation = {
                payload: {
                    ...serviceForm,
                    serviceImageLoc: formState.serviceImageLoc,
                    serviceFileType: file.file.type,
                },
                firebaseToken: firebaseToken,
                modification: true,
                isService: true,
            };
            fetch("/api/v2/user-profile/services/validate-service-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validatePayload),
            })
                .then((data) =>
                    data
                        .json()
                        .then((data: ResponseParams) => {
                            if (data?.payload?.sessionExpired) {
                                errorOperator({
                                    error: data,
                                    shouldSetBackendMessage: true,
                                    updateMessage: data.msg,
                                });
                            } else if (data.payload.valid) {
                                resetToInitState();
                                closeModal();
                                setLoading(false);
                                if (imageUpdated) {
                                    uploadDataHandler(storageRef, validatePayload);
                                } else {
                                    fetch("/api/portfolio/upload-service", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(validatePayload),
                                    })
                                        .then((response) => {
                                            response.json().then((data) => {
                                                if (!data.error) {
                                                    closeModal();
                                                    dispatch(
                                                        updateNotification({
                                                            message: "Service updated successfully.",
                                                            status: "success",
                                                            show: true,
                                                            title: "Upload Successful",
                                                            timeout: 5000,
                                                        })
                                                    );
                                                    resetToInitState();
                                                    triggerChanges();
                                                } else {
                                                    closeModal();
                                                    if (data.isLoggedOut) {
                                                        dispatch(
                                                            updateNotification({
                                                                message:
                                                                    "Failed to add service! Session Expired. Redirecting you to Login Page.",
                                                                status: "error",
                                                                show: true,
                                                                title: "Session Expired",
                                                                timeout: 5000,
                                                            })
                                                        );
                                                        setTimeout(
                                                            () =>
                                                                router.push(
                                                                    "/pages/login/merchants/individuals"
                                                                ),
                                                            5000
                                                        );
                                                        return;
                                                    }
                                                    dispatch(
                                                        updateNotification({
                                                            message:
                                                                "Failed to add service! Kindly try again.",
                                                            status: "error",
                                                            show: true,
                                                            title: "Upload Failed",
                                                        })
                                                    );
                                                }
                                            });
                                        })
                                        .catch((error) => {
                                            errorOperator({
                                                error,
                                                shouldUpdateMessage: true,
                                                updateMessage:
                                                    "Failed to Update Service. Kindly try again!",
                                            });
                                        });
                                }
                            } else {
                                errorOperator({
                                    error: data,
                                    shouldSetBackendMessage: true,
                                    updateMessage: data.payload.message,
                                });
                            }
                        })
                        .catch((error) =>
                            errorOperator({
                                error,
                                shouldSetBackendMessage: true,
                                updateMessage:
                                    "Failed to validate service. Error while parsing the response from server.",
                            })
                        )
                )
                .catch((error) =>
                    errorOperator({
                        error,
                        shouldSetBackendMessage: true,
                        updateMessage:
                            "Failed to add service! Error while trying to validate details. Please try again",
                    })
                );
        }
    };
    React.useEffect(() => {
        setServiceForm({ ...formState });
        setFile({
            preview: formState.publicUri ?? "/loading.png",
            file: { type: formState.serviceFileType },
        });
    }, [formState]);

    return category === undefined || category?.length === 0 ? (
        <Spinner/>
    ) : (
        <React.Fragment>
            {backendError !== "" && (
                <label className={"error-red"} style={{ padding: "1rem" }}>
                    {backendError}
                </label>
            )}
            <div className={classes.EventGrid}>
                <TextField
                    required
                    className={[classes.service, classes.service_name].join(" ")}
                    label={"Service Name"}
                    size="small"
                    type="text"
                    defaultValue={serviceForm.serviceName}
                    value={serviceForm.serviceName}
                    onChange={(e) =>
                        onFormChangeHandler("serviceName", e.target.value as string)
                    }
                />
                {plan !== undefined &&
                    <MUIEditAutoComplete
                        options={category}
                        onFormChangeHandler={onFormChangeHandler}
                        label="Category"
                        formKey="category"
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            const { inputValue } = params;
                            const isExisting = options.some((option) => inputValue === option?.title);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push(inputValue);
                            }
                            return filtered;
                        }}
                        defaultValue={plan === "pro" ?
                            serviceForm?.category?.map((value: any) => {
                                return { label: value, value: value };
                            })
                            :
                            serviceForm?.category !== undefined && serviceForm?.category[0]}
                    />
                }

                <Autocomplete
                    disablePortal
                    options={languages}
                    value={serviceForm.serviceLanguage}
                    onChange={(_, e) => {
                        if (e) onFormChangeHandler("serviceLanguage", e.toString());
                    }}
                    defaultValue={serviceForm.serviceLanguage}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            className={[classes.service, classes.service_state].join(" ")}
                            label="Preferred Language"
                            size="small"
                            type="text"
                            value={serviceForm.serviceLanguage ?? "English"}
                            onChange={(e) =>
                                onFormChangeHandler("serviceLanguage", e.target.value as string)
                            }
                        />
                    )}
                />

                <Autocomplete
                    disablePortal
                    options={cities}
                    value={serviceForm.serviceCity}
                    onChange={(_, e) => {
                        if (e) onFormChangeHandler("serviceCity", e.toString());
                    }}
                    defaultValue={serviceForm.serviceCity}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            className={[classes.service, classes.service_city].join(" ")}
                            label="Service City"
                            size="small"
                            type="text"
                            value={serviceForm.serviceCity ?? "20th Nov 2021, Monday"}
                            onChange={(e) =>
                                onFormChangeHandler("serviceCity", e.target.value as string)
                            }
                        />
                    )}
                />

                <Autocomplete
                    disablePortal
                    options={["Male", "Female", "Other"]}
                    value={serviceForm.serviceGender}
                    defaultValue={serviceForm.serviceGender}
                    onChange={(_, e) => {
                        if (e) onFormChangeHandler("serviceGender", e.toString());
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            required
                            className={[classes.service, classes.service_pricing].join(" ")}
                            label="Gender"
                            size="small"
                            type="text"
                            value={serviceForm.servicePricing}
                            onChange={(e) =>
                                onFormChangeHandler("servicePricing", e.target.value)
                            }
                        />
                    )}
                />

                <Autocomplete
                    sx={{mb:2}}
                    disablePortal
                    limitTags={2}
                    multiple
                    options={profession}
                    onChange={(_, e) => {
                        if (e) onFormChangeHandler("profession", e as []);
                    }}
                    defaultValue={serviceForm?.profession}
                    value={serviceForm?.profession}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        const { inputValue } = params;
                        const isExisting = options.some((option) => inputValue === option.title);
                        if (inputValue !== '' && !isExisting) {
                            filtered.push(inputValue);
                        }
                        return filtered;
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Profession"
                            required
                            className={[
                                classes.TopSection_category,
                                classes.TopSectionCommon,
                            ].join(" ")}
                            size="small"
                            value={serviceForm.profession}
                        />
                    )}
                />

                <div
                    {...getRootProps()}
                    className={[classes.service, classes.service_uploadcanves].join(" ")}>
                    <input {...getInputProps()} />
                    {error ? (
                        <React.Fragment>
                            <WarningIcon
                                className={[
                                    classes.service_imageIcon,
                                    classes.service_imageIcon_red,
                                ].join(" ")}
                            />

                            <label
                                className={[
                                    classes.service_label,
                                    classes.service_label_red,
                                ].join(" ")}>
                                Only Images/Gifs upto 10MBs are allowed.
                            </label>
                        </React.Fragment>
                    ) : fileUploaded ? (
                        <React.Fragment>
                            <div className={classes.ImageContainer}>
                                <Image
                                    src={file.preview}
                                    alt={"preview service"}
                                    height={330}
                                    width={888}
                                    objectFit="contain"
                                    objectPosition="center"
                                />
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <ImageIcon className={classes.service_imageIcon}/>
                            <label className={classes.service_label}>
                                Add or Drag and Drop Photo
                            </label>
                        </React.Fragment>
                    )}
                </div>
                <TextField
                    className={[classes.service, classes.service_description].join(" ")}
                    label="Service Details"
                    size="small"
                    type="text"
                    multiline
                    rows={4}
                    value={serviceForm.serviceDescription}
                    defaultValue={serviceForm.serviceDescription}
                    onChange={(e) =>
                        onFormChangeHandler("serviceDescription", e.target.value)
                    }
                />
                <div className={[classes.service, classes.service_panIndia].join(" ")}>
                    <label>PAN India: </label>
                    <RadioGroup
                        aria-label="Host Details"
                        defaultValue={true}
                        value={serviceForm.panIndia}
                        name="radio-buttons-group"
                        className={classes.RadioGroup}
                        row>
                        <FormControlLabel
                            value={true}
                            control={
                                <Radio
                                    onChange={(e) => {
                                        onFormChangeHandler("panIndia", e.target.value);
                                    }}
                                    color="secondary"
                                />
                            }
                            label="Yes"
                        />
                        <FormControlLabel
                            value={false}
                            control={
                                <Radio
                                    onChange={(e) => {
                                        onFormChangeHandler("panIndia", e.target.value);
                                    }}
                                    color="secondary"
                                />
                            }
                            label="No"
                        />
                    </RadioGroup>
                    <div
                        className={[
                            classes.TopSectionCommon,
                            classes.TopSection_currency,
                        ].join(" ")}>
                        <TextField
                            className={classes.currencyLabel}
                            select
                            size="small"
                            value={serviceForm.currency ?? "INR"}
                            onChange={(event) =>
                                onFormChangeHandler("currency", event.target.value)
                            }>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            className={classes.currencyValue}
                            label="Pricing"
                            size="small"
                            type="number"
                            value={serviceForm.servicePricing}
                            defaultValue={serviceForm.servicePricing}
                            onChange={(event) =>
                                onFormChangeHandler("servicePricing", +event.target.value)
                            }
                        />
                    </div>
                </div>
                <div className={[classes.service, classes.service_button].join(" ")}>
                    <Button
                        className={["ThemeButtonBlack", classes.service_button_btn].join(
                            " "
                        )}
                        onClick={onSubmitHandler}>
                        Update Service
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
}

const currencies = [
    { value: "INR", label: "₹" },
    { value: "USD", label: "$" },
    { value: "EUR", label: "€" },
];
