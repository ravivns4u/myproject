import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
// import DesktopDatePicker from "@mui/x-date-pickers/DesktopDatePicker";

// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import {LocalizationProvider} from "@mui/x-date-pickers";
// import LocalizationProvider from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import OtpInput from "react-otp-input";
import Link from "next/link";
import {
  signupCustomers,
  replaceArrayOfElements,
} from "../../../lib/frontend/validateNativeForm";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  updateProfile,
  deleteUser,
  User,
} from "firebase/auth";
import Spinner from "../../Common/Spinner/Spinner";
import Client from "../../../firebase/firebase_client_exports";
import { firebaseErrorTranslater } from "../../../firebase/errorTranslater";
import { useRouter } from "next/router";
import { prepareCustomerSignupRequest } from "../../../lib/frontend/prepareSignupRequest";
import { CustomerPayload } from "../../../redux/interfaces/frontend/user";
import { FirebaseCustomerSchema } from "../../../redux/interfaces/backend/firestore/registerNewUser";
import { frontendRoutes } from "../../constants/frontend-routes";
interface RequestPayload {
  number: string;
  email: string;
}
interface ResponsePayload {
  numberExists?: boolean;
  emailExists?: boolean;
}
type Props = {
  classes: { [key: string]: string };
  handleClose: () => void;
  toggleToLogin: () => any;
};

interface ExpectedPayload {
  idToken: string;
  payload: FirebaseCustomerSchema;
}

export default function LoginPopup({
  classes,
  handleClose,
  toggleToLogin,
}: Props) {
  const [phone, setPhoneNumber] = React.useState("");
  const [date, setDate] = React.useState(new Date().toDateString());
  const [validated, setValidated] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const [otp, setOTP] = React.useState("");

  const [confirmationResult, setConfirmationResult] =
    React.useState<ConfirmationResult>();

  const onErrorHandler = (user: User, message: string) => {
    setError(firebaseErrorTranslater(message));
    deleteUser(user);
    // setTimeout(() => {
    //   router.reload();
    //   console.log("Error happened while submitting the data = ", error);
    // }, 3000);
  };

  const onOtpSubmit = () => {
    if (loading) return;

    if (otp.length < 6) {
      setError("OTP is not valid");
      return;
    }
    if (!confirmationResult) {
      setError("Internal Error, Kindly refresh the page");
      return;
    }
    if (confirmationResult) {
      setLoading(true);
      confirmationResult.confirm(otp).then(
        (result) => {
          const user = result.user;
          updateEmail(user, email)
            .then(() => {
              updatePassword(user, password)
                .then(() => {
                  sendEmailVerification(user)
                    .then(() => {
                      const name =
                        displayName.length > 0 ? displayName : "Guest";
                      updateProfile(user, {
                        displayName: name,
                      });
                      user.getIdToken().then((token) => {
                        const payload: CustomerPayload = {
                          email,
                          displayName,
                          phone,
                          dob: date,
                        };
                        handleClose();
                        const firestorePayload = prepareCustomerSignupRequest(
                          payload,
                          user.uid
                        );
                        const fbBody: ExpectedPayload = {
                          payload: firestorePayload,
                          idToken: token,
                        };
                        fetch("/api/customers/register", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(fbBody),
                        })
                          .then((response) => {
                            toggleToLogin();
                            return response.json();
                          })
                          .catch((error) => {
                            setLoading(false);
                            onErrorHandler(user, error);
                          })
                          .then(() => {
                            setLoading(false);
                          })
                          .catch((error) => {
                            setLoading(false);
                            onErrorHandler(user, error);
                          });
                      });
                    })
                    .catch((error) => {
                      setLoading(false);
                      onErrorHandler(user, error);
                    });
                })
                .catch((error) => {
                  onErrorHandler(user, error);
                });
            })
            .catch((error) => {
              setLoading(false);
              onErrorHandler(user, error);
            });
        },
        (error) => {
          setLoading(false);
          setError(firebaseErrorTranslater(error.message));
          // setTimeout(() => {
          //   router.reload();
          // }, 3000);
        }
      );
    } else {
      setError("OTP Validation failed... Redirecting you back to Signup Page!");
      // setTimeout(() => {
      //   router.reload();
      // }, 3000);
    }
  };

  const polishedPN = replaceArrayOfElements(phone, ["(", ")", " ", "-"]);

  const onSubmit = () => {
    if (loading) {
      return;
    }
    const errors = signupCustomers({
      phone,
      email,
      password,
      confirmPassword,
      displayName,
    });
    const keys = Object.keys(errors);
    if (keys.length > 0) {
      setError(errors[keys[0]]);
      return;
    } else {
      setLoading(true);
      const checkPyload: RequestPayload = {
        number: phone,
        email: email,
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
              const { numberExists, emailExists } =
                data.payload as ResponsePayload;
              if (numberExists) {
                setError("Phone Number Already Exists");
                setLoading(false);
              } else if (emailExists) {
                setError("Email Already Exists");
                setLoading(false);
              } else {
                setError("");
                setLoading(false);
                const appVerifier = new RecaptchaVerifier(
                  "firebase-recaptcha",
                  {
                    size: "invisible",
                    callback: () => {},
                  },
                  Client.auth
                );
                const phoneNumber = replaceArrayOfElements(polishedPN, [
                  "(",
                  ")",
                  " ",
                  "-",
                ]);
                signInWithPhoneNumber(Client.auth, phoneNumber, appVerifier)
                  .then((confirmationResult) => {
                    setValidated(true);
                    setConfirmationResult(confirmationResult);
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.log("error", error);
                    setError(firebaseErrorTranslater(error.message));
                    // setTimeout(() => {
                    //   router.reload();
                    // }, 3000);
                    setLoading(false);
                  });
              }
            })
            .catch((error) => {
              console.error(error);
              setError(firebaseErrorTranslater(error.message));
              // setTimeout(() => {
              //   router.reload();
              // }, 3000);
              setLoading(false);
            })
        )
        .catch((error) => {
          console.error(error);
          setError(firebaseErrorTranslater(error.message));
          // setTimeout(() => {
          //   router.reload();
          // }, 3000);
          setLoading(false);
        });
    }
  };
  return (
    <React.Fragment>
      {console.log("loading:", loading)}
      {console.log("validated:", validated)}

      {loading ? (
        <Spinner />
      ) : !validated ? (
        <React.Fragment>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={classes.LoginHeaderWithBox}>
              <h1 className={classes.LoginHeader}>Sign Up</h1>
              <CloseIcon className={classes.CloseIcon} onClick={handleClose} />
            </div>
            <label className={classes.Tagline}>
              It&apos;s as easy as wind!
            </label>
            <div className={classes.HorizontalLine}></div>
            <br />
            <div className={classes.FormLayout}>
              <TextField
                className={classes.TextField}
                label={"Full Name"}
                size="small"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <TextField
                className={classes.TextField}
                label={"Email Address"}
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <DesktopDatePicker
                label="Date of Birth"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={(event) =>
                  setDate(event ?? new Date().toDateString())
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.TextField}
                    size="small"
                  />
                )}
              />
              <MuiPhoneNumber
                variant="outlined"
                name="phone"
                data-cy="user-phone"
                required
                className={classes.TextField}
                label="Phone Number"
                size="small"
                defaultCountry={"in"}
                value={phone}
                onChange={(e) => setPhoneNumber(e.toString())}
                sx={{
                  svg: {
                    height: "20px",
                  },
                }}
              />
              <div className={classes.TwoFieldRow}>
                <TextField
                  className={classes.TextField}
                  label={"Enter Password"}
                  type={"password"}
                  size="small"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  className={classes.TextField}
                  label={"Confirm Password"}
                  type={"password"}
                  size="small"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <FormControl
                component="fieldset"
                className={classes.RadioButtonGroup}
              >
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  row
                  defaultValue="male"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio size={"small"} />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio size={"small"} />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio size={"small"} />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <p className={classes.BottomLine}>
              By Clicking next, you agree to our
              <Link href="/termsandconditions">
                <span className={classes.SmallText} onClick={handleClose}>
                  Terms and Services
                </span>
              </Link>
              and
              <Link href="/privacypolicy">
                <span className={classes.SmallText} onClick={handleClose}>
                  {" "}
                  Privacy Policy
                </span>
              </Link>
            </p>
            <p className={classes.BottomLine}>
              Already have an account?
              <span className={classes.SmallText} onClick={toggleToLogin}>
                Log in
              </span>
            </p>
            {error !== "" && <p className={classes.errorText}>{error}</p>}

            <Button
              onClick={onSubmit}
              className={[classes.SmallButton, "ThemeButtonYellow"].join(" ")}
            >
              Next
            </Button>
          </LocalizationProvider>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={classes.LoginHeaderWithBox}>
            <h1 className={classes.LoginHeader}>Verify Your Credentials</h1>
            <CloseIcon className={classes.CloseIcon} onClick={handleClose} />
          </div>
          <div className={classes.HorizontalLine}></div>
          <br />
          <p className={classes.InfoText}>
            A one time password has been sent to{" "}
            {`${polishedPN.slice(0, 4)}****${polishedPN.slice(8, 16)}`}
          </p>
          <br />
          <OtpInput
            value={otp}
            onChange={setOTP}
            numInputs={6}
            containerStyle={classes.OTPBox}
            separator={<div></div>}
          />
          <Button
            className={[classes.SmallButton, "ThemeButtonYellow"].join(" ")}
            onClick={onOtpSubmit}
          >
            Verify
          </Button>
        </React.Fragment>
      )}
      <div id="firebase-recaptcha"></div>
    </React.Fragment>
  );
}
