import React, {useCallback, useEffect, useState, useRef} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Image from "next/image";
import {IMetaData} from "../../../../../../redux/interfaces/backend/apis";
import {useAppSelector} from "../../../../../../redux/app/hooks";
import {ref, uploadBytes} from "firebase/storage";
import Client from "../../../../../../firebase/firebase_client_exports";
import {ResponseParams} from "../../../../../../redux/interfaces/backend/apiHandlers";

/*import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";*/

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from "react-image-crop";
import {canvasPreview} from "./react-image-crop/canvasPreview";

const centerAspectCrop = (
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
) => {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
};

export interface AddStoryFrontend {
    fileName: string;
    fullPath: string;
    generation: string;
    textContent: string;
    fp: string;
    isDeleted: boolean;
    metadata?: IMetaData;
    createdAt?: any;
    fileType?: string;
}

const initialAddStoryForm: AddStoryFrontend = {
    fileName: "",
    fullPath: "",
    generation: "",
    textContent: "",
    fp: "",
    isDeleted: false,
    createdAt: new Date(),
    fileType: "",
    metadata: {
        name: "",
        uid: "",
    },
};

const ImageStoryComponent = (props: any) => {
    const {
        file,
        handleUserStoryPromptClose,
        setFile,
        setFileUploaded,
        getStories,
    } = props;

    //New Image Cropper
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [rotation, setRotation] = useState(0);
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState<number | undefined>(16 / 9);

    //Old Image Cropper
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [fileName, setFileName] = useState<string>("");
    const [serviceForm, setServiceForm] =
        useState<AddStoryFrontend>(initialAddStoryForm);

    const [saveImage, setSaveImage] = useState(false);
    const [imageFile, setImageFile] = useState<string>("");
    const [textContent, setTextContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [backendMsg, setBackendMsg] = React.useState("");

    useEffect(() => {
        if (file && file.file !== undefined) {
            setCrop(undefined); // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setImgSrc(reader?.result?.toString() || "")
            );
            reader.readAsDataURL(file?.file);
        }
    }, [file]);

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (aspect) {
            const {width, height} = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    };

    const handleToggleAspectClick = () => {
        if (aspect) {
            setAspect(undefined);
        } else if (imgRef.current) {
            const {width, height} = imgRef.current;
            setAspect(16 / 9);
            setCrop(centerAspectCrop(width, height, 16 / 9));
        }
    };

    useEffect(() => {
        setFileName(file?.file?.name);
    }, [file]);

    const {
        firebaseToken,
        uid,
        user: {displayName},
    } = useAppSelector((state) => state.user);

    useEffect(() => {
        initialAddStoryForm.fileName = file?.file?.name;
        initialAddStoryForm.fileType = file?.file?.type;
        initialAddStoryForm.metadata = {
            name: displayName,
            uid: uid,
        };
    }, [file, displayName, uid]);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            // @ts-ignore
            if (completedCrop?.width && completedCrop?.height && imgRef.current) {
                const croppedImage = await canvasPreview(
                    imgRef.current,
                    completedCrop,
                    scale,
                    rotate,
                    fileName,
                    imgSrc
                );
                // @ts-ignore
                setCroppedImage(croppedImage);
            }
        } catch (e) {
            console.error(e);
        }
    }, [completedCrop, fileName, imgSrc, rotate, scale]);

    const handleButtonClose = () => {
        setSaveImage(false);
        // setFile("/loading.png");
        setFile({
            preview: "",
        });
        setFileUploaded(false);
        handleUserStoryPromptClose();
    };

    const errorLogger = (error: any, msg: string) => {
        console.log(error);
        setBackendMsg(msg);
        setLoading(false);
    };

    const saveImageStory = async () => {
        if (loading) {
            alert("Please Wait for current process to complete");
            return;
        }
        if (file) {
            if (
                file.file.type == null &&
                file.file.name == null &&
                serviceForm?.fileName === "" &&
                serviceForm?.fileType === ""
            ) {
                setBackendMsg("Uploaded File is not Valid. Please Retry");
                return;
            }
            setLoading(true);
            if (croppedImage) {
                const blobImage = await fetch(croppedImage).then((r) => r.blob());
                const imageFileStorage = new File([blobImage], fileName, {
                    type: file?.file?.type,
                    lastModified: new Date().getTime(),
                });

                if (croppedImage) {
                    const fileType = file.file.type ?? serviceForm.fileType;
                    const docName = `image_${new Date().getTime()}_${fileName}`;
                    const fullPath = `db-dev/user-metadata/stories/images/${uid}/${docName}`;
                    const storageRef = ref(Client.storage, fullPath);
                    uploadBytes(storageRef, imageFileStorage, {
                        contentType: fileType,
                    })
                        .then(() => {
                            serviceForm.fileName = fileName;
                            serviceForm.fullPath = fullPath;
                            serviceForm.fileType = fileType;
                            serviceForm.textContent = textContent;
                            serviceForm.isDeleted = false;
                            serviceForm.fp = docName;
                            serviceForm.generation = new Date().getTime().toString();
                            serviceForm.covercreatedAt = new Date();
                            const payload: any = {
                                payload: serviceForm,
                                firebaseToken,
                                create: true,
                            };
                            fetch("/api/stories/add-stories", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(payload),
                            })
                                .then((response) =>
                                    response
                                        .json()
                                        .then((data: ResponseParams) => {
                                            const {error, msg} = data;
                                            if (error) {
                                                errorLogger(msg, msg);
                                            } else {
                                                setBackendMsg("");
                                                setLoading(false);
                                                handleButtonClose();
                                                getStories(firebaseToken);
                                            }
                                        })
                                        .catch((error) =>
                                            errorLogger(
                                                error,
                                                "Unable to Parse Info. Please try again"
                                            )
                                        )
                                )
                                .catch((error) =>
                                    errorLogger(error, "Unable to Upload Info. Please try again!")
                                );
                        })
                        .catch((error) => errorLogger(error, "Error Uploading Image"));
                }
            } else {
                errorLogger("Failed", "Error Uploading Image");
            }
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <Button onClick={handleButtonClose}>
                    <CloseRoundedIcon/>
                </Button>
                <Typography variant="subtitle1">Add to Story</Typography>
                {!saveImage ? (
                    <Box
                        sx={{float: "right", display: {xs: "flex", md: "inline-block"}}}
                    >
                        <Button
                            onClick={handleToggleAspectClick}
                            variant={"outlined"}
                            sx={{ml: 3,mr:1}}
                        >
                            Custom Crop
                        </Button>
                        <Button
                            onClick={() => {
                                showCroppedImage();
                                setSaveImage(true);
                            }}
                        >
                            Next
                        </Button>
                    </Box>
                ) : (
                    <Button onClick={saveImageStory}>Save</Button>
                )}
            </Box>
            {!saveImage ? (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:'center',
                            position: "relative",
                            minWidth: "100%",
                            width: "auto",
                            maxWidth: 300,
                            maxHeight: 400,
                            height:'aut0',
                            borderRadius: "20px",
                            background: "white",
                        }}
                    >
                        {Boolean(imgSrc) && (
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={aspect}
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    style={{
                                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        height:'100%',
                                        objectFit:'contain',
                                        backgroundPosition:'center',
                                        backgroundSize:'contain'
                                    }}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        )}
                    </Box>
                </>
            ) : (
                croppedImage && (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                width: "auto",
                                gap: 2,
                            }}
                        >
                            <Image
                                style={{
                                    borderRadius: "5px",
                                }}
                                src={croppedImage}
                                width={"200"}
                                height={"300"}
                                alt={croppedImage}
                                // layout={"responsive"}
                            />
                            <Box>
                                <TextField
                                    multiline
                                    id="caption"
                                    minRows={12}
                                    value={textContent}
                                    onChange={(e) => setTextContent(e.target.value)}
                                    fullWidth
                                    label="Caption"
                                    variant="outlined"
                                />
                            </Box>
                        </Box>
                    </>
                )
            )}
            {(loading || backendMsg) && (
                <Typography variant={"h6"} sx={{textAlign: "center"}}>
                    Sending story...
                </Typography>
            )}
        </>
    );
};

export default ImageStoryComponent;
