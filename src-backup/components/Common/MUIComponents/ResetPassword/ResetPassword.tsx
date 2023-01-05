import React, { ReactElement } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import styles from './ResetPassword.module.scss';
import classes from '../LoginForm/Login.module.scss';
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import auth from '../../../../firebase/firebase_client';
import { useRouter } from 'next/router';
import { FirebaseErrorMessages } from '../../../../firebase/constants/errors';
import UnknownOperation from './UnknownOperation';
interface Props {
  params: any;
}
import { useAppDispatch } from '../../../../redux/app/hooks';
import { updateNotification } from '../../../../redux/slices/notifications';
import Spinner from '../../Spinner/Spinner';

export default function ResetPassword(props: Props): ReactElement {
  const router = useRouter();
  const { params } = props;
  const { oobCode } = params;
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordUpdated, setPasswordUpdated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isUserValid, setUserValid] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const arePasswordsMatching = password === confirmPassword;
  const dispatch = useAppDispatch();

  const updatePasswordHandler = () => {
    if (!arePasswordsMatching || password.length < 8) {
      dispatch(
        updateNotification({
          message: 'Password too Weak, you must use a strong password.',
          show: true,
          status: 'error',
          title: 'Password Reset Failed',
        })
      );
      return;
    } else {
      confirmPasswordReset(auth, oobCode, password)
        .then(() => {
          dispatch(
            updateNotification({
              message: 'You may go back and login to your account.',
              show: true,
              status: 'success',
              title: 'Password Updated Successfully',
            })
          );
          router.push('/login/merchants/individuals');
          setPasswordUpdated(true);
        })
        .catch((error) => {
          dispatch(
            updateNotification({
              message:
                'Password verification failed. Try again or contact the administrator: ' +
                error.message,
              show: true,
              status: 'error',
              title: 'Password Reset Failed',
            })
          );
        });
    }
  };

  React.useEffect(() => {
    if (oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then(() => {
          setUserValid(true);
          setLoading(false);
        })
        .catch((error) => {
          dispatch(
            updateNotification({
              message:
                FirebaseErrorMessages[
                  error.message as keyof typeof FirebaseErrorMessages
                ] ??
                'Invalid Operation. Please try again or contact support: ' +
                  error.message,
              show: true,
              status: 'error',
              title: 'Password Reset Failed',
              timeout: 5000,
            })
          );
          setLoading(false);
          setUserValid(false);
        });
    }
  }, [oobCode, dispatch]);

  const handleChangePassword = (value: string) => setPassword(value);
  const visibilityHandler = () => setShowPassword((prev) => !prev);
  const passwordError = password.length < 8 && password.length > 0;
  return isLoading ? (
    <Spinner />
  ) : isUserValid ? (
    <React.Fragment>
      <div
        className={[
          styles.CustomLoginColumn,
          styles.CustomLoginColumn_gaps,
        ].join(' ')}>
        <label className={styles.OTPStyles}>Enter New Password</label>
        <div className={classes.LoginRowGrid}>
          <div className={classes.LoginRow}>
            <LockIcon />
            <TextField
              required
              className={classes.FormInputField}
              label='Password'
              size='small'
              type={showPassword ? 'text' : 'password'}
              value={password}
              error={passwordError}
              helperText={passwordError ? 'Weak Password' : ''}
              onChange={(e) => handleChangePassword(e.target.value)}
              InputProps={{
                endAdornment: showPassword ? (
                  <VisibilityOffIcon onClick={visibilityHandler} />
                ) : (
                  <VisibilityIcon onClick={visibilityHandler} />
                ),
              }}
            />
          </div>
        </div>
        <div className={classes.LoginRowGrid}>
          <div className={classes.LoginRow}>
            <LockIcon />
            <TextField
              required
              className={classes.FormInputField}
              label='Confirm Password'
              value={confirmPassword}
              type={'password'}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!arePasswordsMatching}
              helperText={!arePasswordsMatching ? 'Passwords do not match' : ''}
              size='small'
            />
          </div>
        </div>
        <Button
          className='fw ThemeButtonBlack'
          variant='contained'
          onClick={updatePasswordHandler}>
          Update Password
        </Button>
        {passwordUpdated && (
          <label className='success-green'>Password Changed Successfully</label>
        )}
      </div>
    </React.Fragment>
  ) : (
    <UnknownOperation />
  );
}
