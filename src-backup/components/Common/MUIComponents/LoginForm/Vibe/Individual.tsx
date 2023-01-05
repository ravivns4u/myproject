import React, { ReactElement } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import { indigo } from '@mui/material/colors';
import classes from '../Login.module.scss';

import { useRouter } from 'next/router';
import { screens } from '../../../../constants/loginUiScreens';
import SwapScreen from '../../MUI-Header/SwapScreen';
import { frontendRoutes } from '../../../../constants/frontend-routes';
import ImageCarasoul from '../../../ImageCarasoul/ImageCarasoul';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginEmailPasswordValidation } from '../../../../../lib/frontend/validateNativeForm';
import Client from '../../../../../firebase/firebase_client_exports';

import { updateNotification, hideNotification } from '../../../../../redux/slices/notifications';
import { updateLoading } from '../../../../../redux/slices/signup';
import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks';
import { getUserDetails } from '../../../../../redux/slices/user';
import { firebaseErrorTranslater } from '../../../../../firebase/errorTranslater';
interface Props {
  imagePaths: string[];
}

interface FormProps {
  email: string;
  password: string;
}

const initiaFormState: FormProps = {
  email: '',
  password: '',
};

export default function LoginForm(props: Props): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [formFields, setFormFields] = React.useState(initiaFormState);
  const { loading } = useAppSelector((state) => state.signup);
  const formChangeHandler = (value: string | number, key: string) => {
    setTouched(true);
    setFormFields({
      ...formFields,
      [key]: value,
    });
  };
  const loginFormHandler = () => {
    if (loading) {
      dispatch(
        updateNotification({
          message: 'Please wait for ongoing process to complete before initiating new process.',
          show: true,
          status: 'pending',
          title: 'Please Wait',
          timeout: 3000,
        })
      );
      return;
    }

    const { email, password } = formFields;
    dispatch(
      updateNotification({
        message: "We're logging you in...",
        show: true,
        status: 'pending',
        title: 'Logging in...',
      })
    );
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      dispatch(
        updateNotification({
          message: errors[errorKeys[0]],
          show: true,
          status: 'error',
          title: 'Invalid Form Fields',
        })
      );
      return;
    } else {
      dispatch(updateLoading({ loading: true }));
      signInWithEmailAndPassword(Client.auth, email, password)
        .then((userCredential) => {
          userCredential.user
            .getIdToken()
            .then((token) => {
              // setTimeout(()=> {
                dispatch(getUserDetails({ firebaseToken: token }));
              // },3000)
              dispatch(updateLoading({ loading: false }));
              dispatch(hideNotification());
            })
            .catch((error) => {
              dispatch(updateLoading({ loading: false }));
              dispatch(
                updateNotification({
                  message: firebaseErrorTranslater(error.message),
                  show: true,
                  status: 'error',
                  title: 'Login Failed',
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
              status: 'error',
              title: 'Login Failed',
              timeout: 10000,
            })
          );
        });
    }
  };
  const visibilityHandler = () => setShowPassword((showPassword) => !showPassword);
  const errors = loginEmailPasswordValidation(formFields, touched);
  return (
    <React.Fragment>
      <SwapScreen pages={screens} />
      <div className={classes.LoginColumnGridS1}>
        <ImageCarasoul respondtoLogin imagePaths={props.imagePaths} />
        <div className={classes.LoginColumn}>
          <div className={classes.LoginRowSpecific}>
            <MailIcon />
            <TextField
              fullWidth
              required
              className={classes.FormInputField}
              label='Email Address'
              size='small'
              type='email'
              value={formFields.email}
              error={errors.email !== undefined}
              helperText={errors.email !== undefined ? errors.email : null}
              onChange={(e) => formChangeHandler(e.target.value, 'email')}
              // defaultValue='Hello World'
            />
          </div>

          <div className={classes.LoginRowSpecific}>
            <LockIcon />
            <TextField
              fullWidth
              required
              className={classes.FormInputField}
              label='Password'
              size='small'
              type={showPassword ? 'text' : 'password'}
              value={formFields.password}
              error={errors.password !== undefined}
              helperText={errors.password !== undefined ? errors.password : null}
              onChange={(e) => formChangeHandler(e.target.value, 'password')}
              sx={{ ml: { xs: 2.5, md: 'auto' } }}
              InputProps={{
                endAdornment: showPassword ? (
                  <VisibilityOffIcon onClick={visibilityHandler} style={{ cursor: 'pointer', paddingRight: 0 }} />
                ) : (
                  <VisibilityIcon onClick={visibilityHandler} style={{ cursor: 'pointer', paddingRight: 0 }} />
                ),
              }}
              // defaultValue='Hello World'
            />
          </div>
          <div className={classes.LoginRowSpecific}>
            <FormControlLabel className={'fw'} control={<Checkbox />} label='Remember Me' />
          </div>
          <div className={classes.ActionContainer}>
            <Button className={'fw ThemeButtonBlack'} variant='contained' onClick={loginFormHandler}>
              Login
            </Button>
            <br />
            <Button
              onClick={() => router.push(frontendRoutes.FORGOT_PASSWORD)}
              style={{
                textTransform: 'initial',
                color: indigo[500],
              }}
            >
              Forgot Password?
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
