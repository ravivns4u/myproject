import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, TextField, Box } from "@mui/material";
import signInWithGoogleId from "../../../firebase/signinWithGoogle";
import signInWithFacebookId from "../../../firebase/signinWithFacebook";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import { getCustomerDetails } from "../../../redux/slices/user";
import { updateLoading } from "../../../redux/slices/signup";
import {
  hideNotification,
  updateNotification,
} from "../../../redux/slices/notifications";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import Client from "../../../firebase/firebase_client_exports";
import { firebaseErrorTranslater } from "../../../firebase/errorTranslater";
import { loginEmailPasswordValidation } from "../../../lib/frontend/validateNativeForm";
import { frontendRoutes } from "../../../components/constants/frontend-routes";
import { CustomerState } from "../../../redux/interfaces/frontend/user";

// import { FacebookAuthProvider } from "firebase/auth";
// import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

type Props = {
  classes: { [key: string]: string };
  handleClose: () => void;
  toggleToSignup: () => void;
};

interface FormProps {
  email: string;
  password: string;
}

const initiaFormState: FormProps = {
  email: "",
  password: "",
};

export default function LoginPopup({
  classes,
  handleClose,
  toggleToSignup,
}: Props) {
  const router = useRouter();

  // States used for login
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [formFields, setFormFields] = React.useState(initiaFormState);
  const { loading } = useAppSelector((state) => state.signup);
  const { isLoggedIn } = useAppSelector((state) => state.user);

  const formChangeHandler = (value: string | number, key: string) => {
    setTouched(true);
    setFormFields({
      ...formFields,
      [key]: value,
    });
  };

  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn);
    console.log("loading: ", loading);
    if (isLoggedIn) {
      router.push("/customers/home");
      handleClose();
    }
  }, [loading, router, isLoggedIn]);

  const loginFormHandler = () => {
    if (loading) {
      console.log("loading", loading);
      dispatch(
        updateNotification({
          message:
            "Please wait for ongoing process to complete before initiating new process.",
          show: true,
          status: "pending",
          title: "Please Wait",
          timeout: 3000,
        })
      );
      return;
    }

    const { email, password } = formFields;
    console.log("formFields", formFields);
    dispatch(
      updateNotification({
        message: "We're logging you in...",
        show: true,
        status: "pending",
        title: "Logging in...",
      })
    );

    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      dispatch(
        updateNotification({
          message: errors[errorKeys[0]],
          show: true,
          status: "error",
          title: "Invalid Form Fields",
        })
      );
      return;
    } else {
      dispatch(updateLoading({ loading: true }));
      signInWithEmailAndPassword(Client.auth, email, password)
        .then((userCredential) => {
          console.log("userCredential", userCredential);
          console.log(
            "Client.auth, email, password",
            Client.auth,
            email,
            password
          );
          userCredential.user
            .getIdToken()
            .then((token) => {
              // console.log("token", token)
              // setTimeout(()=> {
              dispatch(getCustomerDetails({ firebaseToken: token }));
              // },3000)
              console.log("token", token);
              dispatch(updateLoading({ loading: false }));
              dispatch(hideNotification());
              // handleClose();
              // router.push("/customers/home");
            })
            .catch((error) => {
              dispatch(updateLoading({ loading: false }));
              dispatch(
                updateNotification({
                  message: firebaseErrorTranslater(error.message),
                  show: true,
                  status: "error",
                  title: "Login Failed",
                  timeout: 10000,
                })
              );
            });
        })
        .catch((error) => {
          console.log(error.message);
          dispatch(updateLoading({ loading: false }));
          dispatch(
            updateNotification({
              message: firebaseErrorTranslater(error.message),
              show: true,
              status: "error",
              title: "Login Failed",
              timeout: 10000,
            })
          );
        });
    }
  };

  const visibilityHandler = () =>
    setShowPassword((showPassword) => !showPassword);
  const errors = loginEmailPasswordValidation(formFields, touched);

  console.log(" in Login form");

  const dispatch = useAppDispatch();

  // Facebook authentication

  const onHandleFacebookLogin = async () => {
    const loginResponse: any = await signInWithFacebookId();
    if (loginResponse.status) {
      console.log("token", loginResponse.accessToken);
      dispatch(
        getCustomerDetails({ firebaseToken: loginResponse.accessToken })
      );
      dispatch(updateLoading({ loading: false }));
      dispatch(hideNotification());
      // router.push("/customers/home")
    } else {
      // Error handle
    }
  };

  // const provider = new FacebookAuthProvider();

  const onHandleGoogleLogin = async () => {
    const loginResponse: any = await signInWithGoogleId();
    if (loginResponse.status) {
      console.log("token", loginResponse.accessToken);
      dispatch(
        getCustomerDetails({ firebaseToken: loginResponse.accessToken })
      );
      dispatch(updateLoading({ loading: false }));
      dispatch(hideNotification());
      // handleClose();
      // router.push("/customers/home")
    } else {
      // Error handle
    }
  };

  return (
    <React.Fragment>
      <div className={classes.LoginHeaderWithBox}>
        <h1 className={classes.LoginHeader}>Log in</h1>
        <CloseIcon className={classes.CloseIcon} onClick={handleClose} />
      </div>
      <label className={classes.Tagline}>Get inside the soul!</label>
      <div className={classes.HorizontalLine}></div>
      <br />
      <TextField
        required
        className={classes.TextField}
        label={"Email Address"}
        size="small"
        type="email"
        value={formFields.email}
        error={errors.email !== undefined}
        helperText={errors.email !== undefined ? errors.email : null}
        onChange={(e) => formChangeHandler(e.target.value, "email")}
      />
      <br />
      <TextField
        className={classes.TextField}
        label={"Enter Password"}
        type={showPassword ? "text" : "password"}
        size="small"
        value={formFields.password}
        error={errors.password !== undefined}
        helperText={errors.password !== undefined ? errors.password : null}
        onChange={(e) => formChangeHandler(e.target.value, "password")}
      />
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
        mt={3}
      >
        <Button
          className={[classes.SmallButton, "ThemeButtonYellow"].join(" ")}
          onClick={loginFormHandler}
        >
          Login
        </Button>
        <label
          className={classes.ForgotPassword}
          onClick={() => {
            router.push(frontendRoutes.FORGOT_PASSWORD);
            handleClose();
          }}
        >
          Forgot Password?
        </label>
      </Box>
      <p className={classes.Tagline}>
        Don&apos;t have an account?
        <span className={classes.ForgotPassword} onClick={toggleToSignup}>
          {" "}
          Sign Up
        </span>
      </p>
      <Button
        onClick={onHandleFacebookLogin}
        className={[
          classes.SmallButton,
          classes.SocialButton,
          classes.SmallButtonFb,
        ].join(" ")}
      >
        <FacebookOutlinedIcon />
        <span style={{ marginLeft: "3px" }}>Continue with Facebook</span>
      </Button>
      <Button
        onClick={onHandleGoogleLogin}
        className={[
          classes.SmallButton,
          classes.SocialButton,
          classes.SmallButtonGoogle,
        ].join(" ")}
      >
        <GoogleIcon />
        <span style={{ marginLeft: "3px" }}>Continue with Google</span>
      </Button>
    </React.Fragment>
  );
}
