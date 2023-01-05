import React, { ReactElement } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import classes from '../LoginForm/Login.module.scss';

import { useRouter } from 'next/router';
import { imagePaths } from '../../../constants/loginUiScreens';
import { frontendRoutes } from '../../../constants/frontend-routes';
import ImageCarasoul from '../../ImageCarasoul/ImageCarasoul';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import styles from './ResetPassword.module.scss';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Button } from '@mui/material';
import OTPInput from '../../MUIComponents/SignupForm/StageComponents/OtpInput';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { sendPasswordResetEmail } from 'firebase/auth';
import auth from '../../../../firebase/firebase_client';
export default function LoginForm(): ReactElement {
  const router = useRouter();
  const [isEmail, setEmail] = React.useState(true);
  const [validated, setValidated] = React.useState(false);
  const [otp, setOtp] = React.useState([0, 0, 0, 0]);
  const [canresetPassword, setResetPassword] = React.useState(false);

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleChangePassword = (value: string) => setPassword(value);
  const visibilityHandler = () => setShowPassword((prev) => !prev);
  const arePasswordsMatching = password === confirmPassword;
  const [passwordUpdated, setPasswordUpdated] = React.useState(false);

  const updateRadioAction = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value === 'Email');

  return (
    <React.Fragment>
      <div className={classes.LoginColumnGridS1}>
        <ImageCarasoul respondtoLogin imagePaths={imagePaths} />

        <div className={styles.CustomLoginColumn}>
          {!canresetPassword ? (
            <React.Fragment>
              <h4 className={styles.ResetPasswordHeader}>
                Choose any of the option below.
              </h4>
              <RadioGroup
                aria-label='Choose any of the option below.'
                defaultValue='Email'
                value={isEmail ? 'Email' : 'Mobile'}
                name='radio-buttons-group'>
                <FormControlLabel
                  value='Email'
                  control={
                    <Radio onChange={updateRadioAction} color='secondary' />
                  }
                  label='Reset your password using your registered Email address.'
                />
                <FormControlLabel
                  value='Mobile'
                  control={
                    <Radio onChange={updateRadioAction} color='secondary' />
                  }
                  label='Reset your password using your Mobile Number.'
                />
              </RadioGroup>
              <br />
              {isEmail ? (
                <div className={classes.LoginRowSpecific}>
                  <MailIcon />
                  <TextField
                    required
                    className={classes.FormInputField}
                    label='Email Address'
                    size='small'
                    type='email'
                    // defaultValue='Hello World'
                  />
                </div>
              ) : (
                <div className={classes.LoginRowGrid}>
                  <LocalPhoneIcon />
                  <MuiPhoneNumber
                    variant='outlined'
                    name='phone'
                    data-cy='user-phone'
                    required
                    className={classes.FormInputField}
                    label='Phone Number'
                    size='small'
                    defaultCountry={'in'}
                    onChange={() => null}
                    sx={{
                      svg: {
                        height: '20px',
                      },
                    }}
                  />
                </div>
              )}
              <br />
              {validated ? (
                <React.Fragment>
                  <label className={styles.OTPStyles}>Enter OTP</label>
                  <br />
                  <OTPInput otp={otp} onChange={setOtp} hideOtpLabel />
                  <br />
                </React.Fragment>
              ) : null}

              <Button
                className='fw'
                variant='contained'
                onClick={() => {
                  if (!validated) setValidated(true);
                  else setResetPassword(true);
                }}>
                {validated
                  ? 'Reset Password'
                  : isEmail
                  ? 'Send Email'
                  : 'Send OTP'}
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={styles.Column}>
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
                      error={password.length < 8}
                      helperText={password.length < 8 ? 'Weak Password' : ''}
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
                      helperText={
                        !arePasswordsMatching ? 'Passwords do not match' : ''
                      }
                      size='small'
                    />
                  </div>
                </div>
                <Button
                  className='fw'
                  variant='contained'
                  onClick={() => setPasswordUpdated(true)}>
                  Update Password
                </Button>
                {passwordUpdated && (
                  <label className='success-green'>
                    Password Changed Successfully
                  </label>
                )}
              </div>
            </React.Fragment>
          )}
          <Button
            variant='contained'
            onClick={() => {
              console.log('Password reset initiating');
              sendPasswordResetEmail(auth, 'activity.schoolsh2@gmail.com')
                .then(() => console.log('Verification Sent'))
                .catch((error) => console.log('Error occured'));
            }}>
            Reset Pasword Demo
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}
