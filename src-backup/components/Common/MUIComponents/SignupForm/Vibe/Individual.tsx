import React, { ReactElement } from "react";
import TextField from "@mui/material/TextField";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MuiPhoneNumber from "material-ui-phone-number";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ShareIcon from "@mui/icons-material/Share";
import SwapScreen from "../../MUI-Header/SwapScreen";
import classes from "./VibeForms.module.scss";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import {
  signupValidationIndividual,
  replaceArrayOfElements,
} from "../../../../../lib/frontend/validateNativeForm";
import ImageCarasoul from "../../../ImageCarasoul/ImageCarasoul";
import {
  screens,
  individualSignupImagePaths,
} from "../../../../constants/loginUiScreens";
import OTPDialog from "../../../OTPPopup/OTPPopup";
import {
  GeoAPIResponseInterface,
  SignupFormState,
} from "../../../../../redux/interfaces";
import { useAppDispatch } from "../../../../../redux/app/hooks";
import {
  updateNotification,
  hideNotification,
} from "../../../../../redux/slices/notifications";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  updateEmail,
  updatePassword as updateFirebasePassword,
  deleteUser,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { prepareIndividualSignupRequest } from "../../../../../lib/frontend/prepareSignupRequest";
import Client from "../../../../../firebase/firebase_client_exports";
import { useRouter } from "next/router";
import { firebaseErrorTranslater } from "../../../../../firebase/errorTranslater";
import { ResponseParams } from "../../../../../redux/interfaces/backend/apiHandlers";
import { createFilterOptions } from "@mui/material";

const maxMultilineRows = 3;
const timeoutSeconds = 5000; //Mili Seconds actually
interface RequestPayload {
  number: string;
  email: string;
}

const filter = createFilterOptions();

const initiaFormState: SignupFormState = {
  fullName: "",
  email: "",
  phone: "",
  socialMediaLink: "",
  serviceTypes: "Our Tie Ups",
  achievements: "",
  specificRequests: "",
  professionType: "Beginner",
  categories: [],
  state: "Assam",
  city: "Agra",
  workExperience: 0,
  profession: [],
  languages: "",
  bio: "",
};

interface ResponsePayload {
  numberExists?: boolean;
  emailExists?: boolean;
}

export default function LoginForm(): ReactElement {
  const [showDialog, setShowDialog] = React.useState(false);
  const [formFields, setFormFields] = React.useState(initiaFormState);
  const [touched, setTouched] = React.useState("");
  const [cities, setCities] = React.useState<string[]>([]);
  const [state, setState] = React.useState("");
  const [isPasswordValid, setPasswordValid] = React.useState(false);
  const [sentOtp, setSentOtp] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [genders, setGenders] = React.useState([] as string[]);
  const [languages, setLanguages] = React.useState([] as string[]);
  const [categories, setCategories] = React.useState([]);
  const [profession, setProfession] = React.useState([]);

  React.useEffect(() => {
    console.log("verify env", process.env);
    const fetchLanguages = () => {
      fetch("/api/v2/languages")
        .then((res) => {
          return res
            .json()
            .then((data: any) => {
              console.log(data, "Daata Payload");
              setCategories(data.payload.category);
              setProfession(data.payload.profession);
              setLanguages(data.payload.languages);
              setGenders(data.payload.genders);
            })
            .catch((error) => console.log("response language error", error));
        })
        .catch((error) => console.log("fetch language error", error));
    };
    fetchLanguages();
  }, []);

  React.useEffect(() => {
    const fetchGeoData = () => {
      fetch("/api/geo").then((res) =>
        res.json().then((data) => {
          const { cities } = data as GeoAPIResponseInterface;
          setCities(cities);
        })
      );
    };
    fetchGeoData();
  }, []);

  const [password, setPassword] = React.useState("");
  const [otp, setOTP] = React.useState([0, 0, 0, 0, 0, 0]);

  const triggerCityChange = (cityData: any) => {
    const cityList = cityData;
    fetch("/api/get-state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: cityList }),
    })
      .then((response) =>
        response
          .json()
          .then((data) => {
            const { state } = data;
            setState(state);
            setFormFields({ ...formFields, state, city: cityList });
          })
          .catch((error) => console.log("Unexpected Error occured"))
      )
      .catch((error) => console.log("Unexpected Error occured"));
  };

  const [confirmationResult, setConfirmationResult] =
    React.useState<ConfirmationResult>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onOtpSubmit = (otp: string) => {
    if (!isPasswordValid) {
      dispatch(
        updateNotification({
          message: "Password too Weak, you must use a strong password.",
          show: true,
          status: "error",
          title: "Passowrds don't match!",
          timeout: 3000,
        })
      );
      return;
    }
    if (confirmationResult) {
      confirmationResult.confirm(otp).then(
        (result) => {
          const { email } = formFields;
          setShowDialog(false);
          dispatch(
            updateNotification({
              message: "Hang on... Signing you In!",
              show: true,
              status: "pending",
              title: "Signing In",
            })
          );

          const user = result.user;

          updateEmail(user, email)
            .then(() => {
              updateFirebasePassword(user, password)
                .then(() => {
                  sendEmailVerification(user)
                    .then(() => {
                      const name = formFields.fullName.length
                        ? formFields.fullName
                        : "Guest";
                      updateProfile(user, {
                        displayName: name,
                      });
                      user.getIdToken().then((token) => {
                        const fbBody = prepareIndividualSignupRequest(
                          formFields,
                          user.uid,
                          token
                        );
                        console.log(fbBody, "BODY");
                        fetch("/api/register-new-user", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(fbBody),
                        })
                          .then((response) => response.json())
                          .catch((error) => {
                            console.log(
                              "Error Occured while registering User = ",
                              error
                            );
                            dispatch(
                              updateNotification({
                                message:
                                  "Something went wrong. Please try again later.",
                                show: true,
                                status: "error",
                                title: "Error!",
                                timeout: 5000,
                              })
                            );
                            deleteUser(user);
                            setTimeout(() => {
                              router.reload();
                            }, timeoutSeconds);
                          })
                          .then((data) => {
                            dispatch(
                              updateNotification({
                                message:
                                  "You're now registered with Break Free. Upon Admin approval, you will be able to login. Meanwhile you may verify your Email Account for added security.",
                                show: true,
                                status: "success",
                                title: "Success!",
                                timeout: 8000,
                              })
                            );
                          })
                          .catch((error) => {
                            dispatch(
                              updateNotification({
                                message:
                                  "Something went wrong. Please try again later.",
                                show: true,
                                status: "error",
                                title: "Error!",
                                timeout: 5000,
                              })
                            );
                            deleteUser(user);
                            setTimeout(() => {
                              router.reload();
                            }, timeoutSeconds);
                            console.log(
                              "Error happened while submitting the data = ",
                              error
                            );
                          });
                      });
                    })
                    .catch((error) => {
                      console.log(
                        "Error while sending Email Verification = ",
                        error.message
                      );
                      dispatch(
                        updateNotification({
                          message:
                            "You have been successfully registered but the email verification process failed. Please contact the admin.",
                          show: true,
                          status: "success",
                          title: "Success!",
                        })
                      );
                    });
                })
                .catch((error) => {
                  console.log(
                    "Error while setting up password = ",
                    error.message
                  );
                  deleteUser(user).then(() => {
                    dispatch(
                      updateNotification({
                        message:
                          "Password too Weak, you must use a strong password.",
                        show: true,
                        status: "error",
                        title: "Weak Password",
                      })
                    );
                    setTimeout(() => {
                      router.reload();
                    }, timeoutSeconds);
                  });
                });
            })
            .catch((error) => {
              console.log("Error while setting Email = ", error.message);

              deleteUser(user).then(() => {
                dispatch(
                  updateNotification({
                    message:
                      "The Email you provided is already associated with another account. Please use a different email.",
                    show: true,
                    status: "error",
                    title: "Email Already Exists",
                  })
                );
                setTimeout(() => {
                  router.reload();
                }, timeoutSeconds);
              });
            });
        },
        (error) => {
          console.log("Error while verifying OTP", error.message);
          setShowDialog(false);
          dispatch(
            updateNotification({
              message:
                "OTP Validation failed... Redirecting you back to Signup Page!",
              show: true,
              status: "error",
              title: "Error",
            })
          );
          setTimeout(() => {
            router.reload();
          }, timeoutSeconds);
        }
      );
    } else {
      setShowDialog(false);

      dispatch(
        updateNotification({
          message:
            "OTP Validation failed... Redirecting you back to Signup Page!",
          show: true,
          status: "error",
          title: "Error",
        })
      );
      setTimeout(() => {
        router.reload();
      }, timeoutSeconds);
    }
  };

  const updatePassword = (newValue: string, validPassword: boolean) => {
    setPasswordValid(validPassword);
    setPassword(newValue);
  };

  const updateOTP = (newValue: number[]) => {
    setOTP(newValue);
  };

  const handleOnSubmitMobile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (loading) {
      dispatch(
        updateNotification({
          message: "Please wait for ongoing process to finish!",
          show: true,
          status: "error",
          title: "Process in Progress",
        })
      );
      return;
    }
    const checkPyload: RequestPayload = {
      number: formFields.phone,
      email: formFields.email,
    };
    fetch("/api/verify-non-existing-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkPyload),
    })
      .then((response) =>
        response
          .json()
          .then((data) => {
            console.log("data", data)
            const { numberExists, emailExists } =
              data.payload as ResponsePayload;
            if (numberExists) {
              dispatch(
                updateNotification({
                  message:
                    "Mobile Number already exists. Please try with a different number.",
                  show: true,
                  status: "error",
                  title: "Mobile Number Exists",
                })
              );
              return;
            } else if (emailExists) {
              console.log("emailexists",emailExists)
              dispatch(
                updateNotification({
                  message:
                    "Email already exists. Please try with a different email.",
                  show: true,
                  status: "error",
                  title: "Email Exists",
                })
              );
              return;
            } else {
              dispatch(
                updateNotification({
                  message: "Please Wait, while we validate your info...",
                  show: true,
                  status: "pending",
                  title: "Signing you up...",
                })
              );

              const appVerifier = new RecaptchaVerifier(
                "firebase-recaptcha",
                {
                  size: "invisible",
                  callback: () => {},
                },
                Client.auth
              );
              const phoneNumber = replaceArrayOfElements(formFields.phone, [
                "(",
                ")",
                " ",
                "-",
              ]);

              // signInWithPhoneNumber(auth, `+16505553434`, appVerifier)
              signInWithPhoneNumber(Client.auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                  dispatch(hideNotification());
                  setShowDialog(true);
                  setSentOtp(true);
                  setConfirmationResult(confirmationResult);
                  setLoading(false);
                })
                .catch((error) => {
                  console.log("Error = ", error.message);

                  if (
                    error.message ===
                    "Firebase: Invalid format. (auth/invalid-phone-number)."
                  )
                    dispatch(
                      updateNotification({
                        message:
                          "Phone Number Entered is not valid or unreachable.",
                        show: true,
                        status: "error",
                        title: "Invalid Phone Number",
                      })
                    );
                  else
                    dispatch(
                      updateNotification({
                        message: firebaseErrorTranslater(error.code),
                        show: true,
                        status: "error",
                        title: "Error",
                      })
                    );
                  setTimeout(() => {
                    router.reload();
                  }, timeoutSeconds);
                });
            }
          })
          .catch((error) => {
            console.log(
              "Error Occured while checking for existing account = ",
              error
            );
            dispatch(
              updateNotification({
                message: "Something went wrong. Please try again later.",
                show: true,
                status: "error",
                title: "Error!",
                timeout: 5000,
              })
            );
          })
      )
      .catch((error) => {
        dispatch(
          updateNotification({
            message:
              "While trying to validate your details an unexpected error occured. Please try again or contact the Support.",
            show: true,
            status: "error",
            title: "Unexpected Error Occured",
            timeout: 5000,
          })
        );
        setLoading(false);
      });
  };

  const formChangeHandler = (
    value: string | number | string[],
    key: string
  ) => {
    setTouched(key);
    setFormFields({
      ...formFields,
      [key]: value,
    });
  };

  const resetForm = () => {
    setShowDialog(false);
    setFormFields(initiaFormState);
  };

  const errors = signupValidationIndividual(formFields, touched);

  return (
    <React.Fragment>
      <SwapScreen pages={screens} />
      <div className={classes.LoginColumnGrid}>
        <ImageCarasoul
          respondtoLogin={false}
          imagePaths={individualSignupImagePaths}
        />
        <div className={[classes.LoginColumn].join(" ")}>
          <div className={classes.LoginRowGrid}>
            <PersonIcon />
            <TextField
              required
              className={classes.FormInputField}
              label="Full Name"
              size="small"
              type="text"
              value={formFields.fullName}
              onChange={(e) => formChangeHandler(e.target.value, "fullName")}
              error={errors.fullName !== undefined}
              helperText={errors.fullName}
              id="filled-error-helper-text"
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <MailIcon />
            <TextField
              required
              className={classes.FormInputField}
              label="Email Address"
              size="small"
              type="email"
              value={formFields.email}
              error={errors.email !== undefined}
              helperText={errors.email}
              onChange={(e) => formChangeHandler(e.target.value, "email")}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <LocalPhoneIcon />
            <MuiPhoneNumber
              variant="outlined"
              name="phone"
              data-cy="user-phone"
              required
              className={classes.FormInputField}
              label="Phone Number"
              size="small"
              defaultCountry={"in"}
              value={formFields.phone}
              error={errors.phone !== undefined}
              helperText={errors.phone}
              onChange={(e) => formChangeHandler(e.toString(), "phone")}
              sx={{
                svg: {
                  height: "20px",
                },
              }}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <ShareIcon />
            <TextField
              className={classes.FormInputField}
              label="Social Media Links"
              size="small"
              type="text"
              multiline
              value={formFields.socialMediaLink}
              error={errors.socialMediaLink !== undefined}
              helperText={errors.socialMediaLink}
              onChange={(e) => {
                formChangeHandler(e.target.value, "socialMediaLink");
              }}
              maxRows={maxMultilineRows}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <Autocomplete
              disablePortal
              options={[
                "Workshop/Training",
                "Social Media Promotion",
                "Our Tie Ups",
                "Networking",
              ]}
              value={formFields.serviceTypes}
              onChange={(_, e) => {
                if (e) formChangeHandler(e.toString(), "serviceTypes");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Services you are looking for"
                  className={classes.FormInputField}
                  size="small"
                  value={formFields.serviceTypes}
                  onChange={(e) => {
                    formChangeHandler(e.target.value, "serviceTypes");
                  }}
                />
              )}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <TextField
              className={classes.FormInputField}
              label="Any Other Specific Requests?"
              size="small"
              type="text"
              multiline
              maxRows={maxMultilineRows}
              value={formFields.specificRequests}
              onChange={(e) =>
                formChangeHandler(e.target.value, "specificRequests")
              }
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <TextField
              className={classes.FormInputField}
              label="Languages you speak"
              size="small"
              type="text"
              value={formFields.languages}
              onChange={(e) => formChangeHandler(e.target.value, "languages")}
            />
          </div>
          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <TextField
              className={classes.FormInputField}
              label="Bio"
              size="small"
              type="text"
              value={formFields.bio}
              error={errors.bio !== undefined}
              helperText={errors.bio}
              onChange={(e) => formChangeHandler(e.target.value, "bio")}
            />
          </div>
        </div>
        <div className={[classes.LoginColumn].join(" ")}>
          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <Autocomplete
              disablePortal
              options={profession}
              multiple={false}
              onChange={(_, e) => {
                if (e) formChangeHandler([e], "profession");
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some(
                  (option) => inputValue === option.title
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push(inputValue);
                }
                return filtered;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Profession"
                  className={classes.FormInputField}
                  size="small"
                  value={formFields.profession}
                />
              )}
            />
          </div>
          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <Autocomplete
              disablePortal
              options={categories}
              multiple={false}
              onChange={(_, e) => {
                if (e) formChangeHandler([e], "categories");
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some(
                  (option) => inputValue === option?.title
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push(inputValue);
                }
                return filtered;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  className={classes.FormInputField}
                  size="small"
                  value={formFields.categories}
                />
              )}
            />
          </div>
          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <Autocomplete
              disablePortal
              options={["Beginner", "Intermediate", "Expert"]}
              value={formFields.professionType}
              onChange={(_, e) => {
                if (e)
                  formChangeHandler(e.toString() as string, "professionType");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Level of Profession"
                  className={classes.FormInputField}
                  size="small"
                  value={formFields.professionType}
                  onChange={(e) =>
                    formChangeHandler(e.target.value, "professionType")
                  }
                />
              )}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <LocationCityIcon />
            <Autocomplete
              disablePortal
              options={cities}
              value={formFields.city}
              onChange={(_, e) => {
                if (e) {
                  formChangeHandler(e.toString(), "city");
                  triggerCityChange(e.toString());
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  required
                  className={classes.FormInputField}
                  size="small"
                  value={formFields.city}
                  onChange={(e) => {
                    formChangeHandler(e.target.value, "city");
                    triggerCityChange(e.target.value);
                  }}
                />
              )}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <LocationOnIcon />
            <TextField
              disabled
              label="State"
              className={classes.FormInputField}
              size="small"
              value={state}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <BusinessCenterIcon />
            <TextField
              className={classes.FormInputField}
              label="Work Experience"
              size="small"
              type={"number"}
              value={formFields.workExperience}
              onChange={(e) =>
                formChangeHandler(+e.target.value, "workExperience")
              }
              InputProps={{
                endAdornment: <label>Years</label>,
              }}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <TextField
              className={classes.FormInputField}
              label="Your Achievements"
              size="small"
              type="text"
              value={formFields.achievements}
              error={errors.achievements !== undefined}
              helperText={errors.achievements}
              onChange={(e) =>
                formChangeHandler(e.target.value, "achievements")
              }
              multiline
              maxRows={maxMultilineRows}
            />
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        className={[classes.ButtonUtility, "ThemeButtonBlack"].join(" ")}
        onClick={(e) => {
          const errorKeys = Object.keys(errors);
          if (errorKeys.length) {
            dispatch(
              updateNotification({
                message: errors[errorKeys[0]],
                show: true,
                status: "error",
                title: "Invalid Form Fields",
              })
            );
          } else if (!touched) {
            dispatch(
              updateNotification({
                message: "Can not submit form without the required fields",
                show: true,
                status: "error",
                title: "Invalid Form Fields",
              })
            );
          } else {
            if (sentOtp) setShowDialog(true);
            else handleOnSubmitMobile(e);
          }
        }}
      >
        Next
      </Button>
      <OTPDialog
        password={password}
        otp={otp}
        handleSubmit={onOtpSubmit}
        handleChangePassword={updatePassword}
        handleChangeOTP={updateOTP}
        open={showDialog}
        handleClose={() => resetForm()}
      />
      <div id="firebase-recaptcha"></div>
    </React.Fragment>
  );
}
