import React, { ReactElement } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import classes from '../LoginForm/Login.module.scss';

import { useRouter } from 'next/router';
import { resetPasswordImagePaths } from '../../../constants/loginUiScreens';
import ImageCarasoul from '../../ImageCarasoul/ImageCarasoul';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import styles from './ResetPassword.module.scss';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../../../redux/app/hooks';
import { updateNotification } from '../../../../redux/slices/notifications';
import { sendPasswordResetEmail } from 'firebase/auth';
import Client from '../../../../firebase/firebase_client_exports';
import { FirebaseErrorMessages } from '../../../../firebase/constants/errors';

export default function LoginForm(): ReactElement {
  const [isEmail, setEmail] = React.useState(true);
  const [emailAddress, setEmailAddress] = React.useState('');
  const dispatch = useAppDispatch();

  const updateRadioAction = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value === 'Email');

  return (
    <React.Fragment>
      <div className={classes.LoginColumnGridS1}>
        <ImageCarasoul respondtoLogin imagePaths={resetPasswordImagePaths} />
        {
          <div className={styles.CustomLoginColumn}>
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
                {/* {<FormControlLabel
                  value='Mobile'
                  control={
                    <Radio onChange={updateRadioAction} color='secondary' />
                  }
                  label='Reset your password using your Mobile Number.'
                />} */}
              </RadioGroup>
              <br />
              {
                isEmail ? (
                  <div className={classes.LoginRowSpecific}>
                    <MailIcon />
                    <TextField
                      required
                      className={classes.FormInputField}
                      label='Email Address'
                      size='small'
                      type='email'
                      value={emailAddress}
                      onChange={(event) => {
                        setEmailAddress(event.target.value);
                      }}
                    />
                  </div>
                ) : null
                // {<div className={classes.LoginRowGrid}>
                //   <LocalPhoneIcon />
                //   <MuiPhoneNumber
                //     variant='outlined'
                //     name='phone'
                //     data-cy='user-phone'
                //     required
                //     className={classes.FormInputField}
                //     label='Phone Number'
                //     size='small'
                //     defaultCountry={'in'}
                //     onChange={() => null}
                //   />
                // </div>}
              }
              <br />

              <Button
                className='fw ThemeButtonBlack'
                variant='contained'
                onClick={() => {
                  if (!isEmail) {
                    dispatch(
                      updateNotification({
                        message:
                          "Resetting Password via OTP isn't yet supported. Please use the email option.",
                        show: true,
                        status: 'error',
                        title: 'OTP Services are unreachable',
                      })
                    );
                    return;
                  }
                  dispatch(
                    updateNotification({
                      message: 'Verifying and Sending Email link...',
                      show: true,
                      status: 'pending',
                      title: 'Sending Email',
                    })
                  );

                  sendPasswordResetEmail(Client.auth, emailAddress)
                    .then(() => {
                      dispatch(
                        updateNotification({
                          message:
                            "We've sent you an email with a link to reset your password. You may close this window.",
                          show: true,
                          status: 'success',
                          title: 'Password Reset Email Sent',
                        })
                      );
                    })
                    .catch((error) => {
                      dispatch(
                        updateNotification({
                          message:
                            FirebaseErrorMessages[
                              error.message as keyof typeof FirebaseErrorMessages
                            ] ?? 'Unexpected Error Happened',
                          show: true,
                          status: 'error',
                          title: 'Error',
                        })
                      );
                    });
                }}>
                Reset Password
              </Button>
            </React.Fragment>
          </div>
        }
      </div>
    </React.Fragment>
  );
}
