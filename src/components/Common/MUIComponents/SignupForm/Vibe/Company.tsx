import React, { ReactElement } from 'react';
import TextField from '@mui/material/TextField';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MuiPhoneNumber from 'material-ui-phone-number';
import Button from '@mui/material/Button';

import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';
import SwapScreen from '../../MUI-Header/SwapScreen';
import classes from './VibeForms.module.scss';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import OTPDialog from '../../../OTPPopup/OTPPopup';
import ImageCarasoul from '../../../ImageCarasoul/ImageCarasoul';
import { companyScreens, companySignupImagePaths } from '../../../../constants/loginUiScreens';
import { signupValidation } from '../../../../../lib/frontend/validateNativeForm';

import { updateNotification, hideNotification } from '../../../../../redux/slices/notifications';
import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks';
import { SignupFormCompanyFormState } from '../../../../../redux/interfaces';
import { signupValidationIndividual, replaceArrayOfElements } from '../../../../../lib/frontend/validateNativeForm';
import auth from '../../../../../firebase/firebase_client';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  updateEmail,
  updatePassword as updateFirebasePassword,
  deleteUser,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { updateLoading } from '../../../../../redux/slices/signup';
import { prepareCompanySignupRequest } from '../../../../../lib/frontend/prepareSignupRequest';
import { firebaseErrorTranslater } from '../../../../../firebase/errorTranslater';

const maxMultilineRows = 3;
const timeoutSeconds = 3000; //1s = 1000ms

const initiaFormState: SignupFormCompanyFormState = {
  companyName: '',
  companyAddress: '',
  fullName: '',
  email: '',
  companyPhone: '',
  tieupDetails: '',
  socialMediaLink: '',
  aboutTheCompany: '',
  website: '',
  achievements: '',
  specificRequests: '',
};

interface ResponsePayload {
  numberExists?: boolean;
  emailExists?: boolean;
}
interface RequestPayload {
  number: string;
  email: string;
}

export default function LoginForm(): ReactElement {
  const [formFields, setFormFields] = React.useState(initiaFormState);
  const [touched, setTouched] = React.useState('');
  const [showDialog, setShowDialog] = React.useState(false);
  const [isPasswordValid, setPasswordValid] = React.useState(false);
  const [sentOtp, setSentOtp] = React.useState(false);
  const [otp, setOTP] = React.useState([0, 0, 0, 0, 0, 0]);
  const [password, setPassword] = React.useState('');
  const { loading } = useAppSelector((state) => state.signup);
  const [internalLoading, setInternalLoading] = React.useState(false);

  const [confirmationResult, setConfirmationResult] = React.useState<ConfirmationResult>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const updatePassword = (newValue: string, validPassword: boolean) => {
    setPasswordValid(validPassword);
    setPassword(newValue);
  };

  const updateOTP = (newValue: number[]) => {
    setOTP(newValue);
  };

  const handleOnSubmitMobile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (internalLoading) {
      dispatch(
        updateNotification({
          message: 'Please wait for ongoing process to finish!',
          show: true,
          status: 'error',
          title: 'Process in Progress',
        })
      );
      return;
    }
    const checkPyload: RequestPayload = {
      number: formFields.companyPhone,
      email: formFields.email,
    };
    fetch('/api/verify-non-existing-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkPyload),
    })
      .then((response) =>
        response
          .json()
          .then((data) => {
            const { numberExists, emailExists } = data.payload as ResponsePayload;
            if (numberExists) {
              dispatch(
                updateNotification({
                  message: 'Mobile Number already exists. Please try with a different number.',
                  show: true,
                  status: 'error',
                  title: 'Mobile Number Exists',
                })
              );
              return;
            } else if (emailExists) {
              dispatch(
                updateNotification({
                  message: 'Email already exists. Please try with a different email.',
                  show: true,
                  status: 'error',
                  title: 'Email Exists',
                })
              );
              return;
            } else {
              //Replace Everything Here
              dispatch(
                updateNotification({
                  message: 'Please Wait, while we validate your info...',
                  show: true,
                  status: 'pending',
                  title: 'Signing you up...',
                })
              );

              const appVerifier = new RecaptchaVerifier(
                'firebase-recaptcha',
                {
                  size: 'invisible',
                  callback: () => {},
                },
                auth
              );
              const phoneNumber = replaceArrayOfElements(formFields.companyPhone, ['(', ')', ' ', '-']);

              // signInWithPhoneNumber(auth, `+16505553434`, appVerifier)
              signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                  dispatch(hideNotification());
                  setShowDialog(true);
                  setSentOtp(true);
                  setConfirmationResult(confirmationResult);
                })
                .catch((error) => {
                  console.log('Error = ', error.message);

                  if (error.message === 'Firebase: Invalid format. (auth/invalid-phone-number).')
                    dispatch(
                      updateNotification({
                        message: 'Phone Number Entered is not valid or unreachable.',
                        show: true,
                        status: 'error',
                        title: 'Invalid Phone Number',
                      })
                    );
                  else
                    dispatch(
                      updateNotification({
                        message: firebaseErrorTranslater(error.code),
                        show: true,
                        status: 'error',
                        title: 'Error',
                      })
                    );
                  setTimeout(() => {
                    router.reload();
                  }, timeoutSeconds);
                });
            }
          })
          .catch((error) => {
            console.log('Error Occured while checking for existing account = ', error);
            dispatch(
              updateNotification({
                message: 'Something went wrong. Please try again later.',
                show: true,
                status: 'error',
                title: 'Error!',
                timeout: 5000,
              })
            );
          })
      )
      .catch((error) => {
        dispatch(
          updateNotification({
            message:
              'While trying to validate your details an unexpected error occured. Please try again or contact the Support.',
            show: true,
            status: 'error',
            title: 'Unexpected Error Occured',
            timeout: 5000,
          })
        );
        setInternalLoading(false);
      });
    //Ends
  };

  const onOtpSubmit = (otp: string) => {
    if (loading) {
      dispatch(
        updateNotification({
          message: 'Please wait for ongoing process to complete before initiating new process.',
          show: true,
          status: 'pending',
          title: 'Please Wait',
          timeout: 5000,
        })
      );
      return;
    }
    if (!isPasswordValid) {
      dispatch(
        updateNotification({
          message: 'Password too Weak, you must use a strong password.',
          show: true,
          status: 'error',
          title: "Passowrds don't match!",
        })
      );
      return;
    }
    dispatch(updateLoading({ loading: true }));
    if (confirmationResult) {
      confirmationResult.confirm(otp).then(
        (result) => {
          const { email } = formFields;
          setShowDialog(false);
          dispatch(
            updateNotification({
              message: 'Hang on... Signing you In!',
              show: true,
              status: 'pending',
              title: 'Signing In',
            })
          );

          const user = result.user;
          updateEmail(user, email)
            .then(() => {
              updateFirebasePassword(user, password)
                .then(() => {
                  sendEmailVerification(user)
                    .then(() => {
                      const name = formFields.fullName.length ? formFields.fullName : 'Guest';
                      updateProfile(user, {
                        displayName: name,
                      });
                      user.getIdToken().then((token) => {
                        const fbBody = prepareCompanySignupRequest(formFields, user.uid, token);
                        fetch('/api/register-new-user', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(fbBody),
                        })
                          .then((response) => response.json())
                          .catch((error) => {
                            console.log('Error Occured while registering User = ', error);
                            dispatch(
                              updateNotification({
                                message: 'Something went wrong. Please try again later.',
                                show: true,
                                status: 'error',
                                title: 'Error!',
                                timeout: 5000,
                              })
                            );
                            deleteUser(user);
                            setTimeout(() => {
                              router.reload();
                            }, timeoutSeconds);
                          })
                          .then(() => {
                            dispatch(
                              updateNotification({
                                message:
                                  "You're now registered with Break Free. Upon Admin approval, you will be able to login. Meanwhile you may verify your Email Account for added security.",
                                show: true,
                                status: 'success',
                                title: 'Success!',
                                timeout: 5000,
                              })
                            );
                            dispatch(updateLoading({ loading: false }));
                          })
                          .catch((error) => {
                            dispatch(
                              updateNotification({
                                message: 'Something went wrong. Please try again later.',
                                show: true,
                                status: 'error',
                                title: 'Error!',
                                timeout: 5000,
                              })
                            );
                            deleteUser(user);
                            dispatch(updateLoading({ loading: false }));
                            setTimeout(() => {
                              router.reload();
                            }, timeoutSeconds);
                            console.log('Error happened while submitting the data = ', error);
                          });
                      });
                    })
                    .catch((error) => {
                      console.log('Error while sending Email Verification = ', error.message);
                      dispatch(updateLoading({ loading: false }));
                      dispatch(
                        updateNotification({
                          message:
                            'You have been successfully registered but the email verification process failed. Please contact the admin.',
                          show: true,
                          status: 'success',
                          title: 'Success!',
                        })
                      );
                    });
                })
                .catch((error) => {
                  console.log('Error while setting up password = ', error.message);
                  dispatch(updateLoading({ loading: false }));
                  deleteUser(user).then(() => {
                    dispatch(
                      updateNotification({
                        message: 'Password too Weak, you must use a strong password.',
                        show: true,
                        status: 'error',
                        title: 'Weak Password',
                      })
                    );
                    setTimeout(() => {
                      router.reload();
                    }, timeoutSeconds);
                  });
                });
            })
            .catch((error) => {
              console.log('Error while setting Email = ', error.message);

              deleteUser(user).then(() => {
                dispatch(
                  updateNotification({
                    message:
                      'The Email you provided is already associated with another account. Please use a different email.',
                    show: true,
                    status: 'error',
                    title: 'Email Already Exists',
                  })
                );
                dispatch(updateLoading({ loading: false }));
                setTimeout(() => {
                  router.reload();
                }, timeoutSeconds);
              });
            });
        },
        (error) => {
          console.log('Error while verifying OTP', error.message);
          setShowDialog(false);
          dispatch(
            updateNotification({
              message: 'OTP Validation failed... Redirecting you back to Signup Page!',
              show: true,
              status: 'error',
              title: 'Error',
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
          message: 'OTP Validation failed... Redirecting you back to Signup Page!',
          show: true,
          status: 'error',
          title: 'Error',
        })
      );
      setTimeout(() => {
        router.reload();
      }, timeoutSeconds);
    }
  };

  const formChangeHandler = (value: string, key: string) => {
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

  const errors = signupValidation(formFields);
  return (
    <React.Fragment>
      <SwapScreen pages={companyScreens} />
      <div className={classes.LoginColumnGrid}>
        <ImageCarasoul respondtoLogin={false} imagePaths={companySignupImagePaths} />

        <div className={[classes.LoginColumn].join(' ')}>
          <div className={classes.LoginRowGrid}>
            <PersonIcon />
            <TextField
              required
              className={classes.FormInputField}
              label='Name of Company'
              size='small'
              type='text'
              value={formFields.companyName}
              error={touched == 'companyName' && errors.companyName !== undefined}
              helperText={touched && errors.companyName !== undefined ? errors.companyName : ''}
              onChange={(e) => formChangeHandler(e.target.value, 'companyName')}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <MailIcon />
            <TextField
              className={classes.FormInputField}
              label='Company Address'
              size='small'
              value={formFields.companyAddress}
              onChange={(e) => formChangeHandler(e.target.value, 'companyAddress')}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <MailIcon />
            <TextField
              required
              className={classes.FormInputField}
              label='Full Name'
              size='small'
              value={formFields.fullName}
              error={touched == 'fullName' && errors.fullName !== undefined}
              helperText={touched && errors.fullName !== undefined ? errors.fullName : ''}
              onChange={(e) => formChangeHandler(e.target.value, 'fullName')}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <MailIcon />
            <TextField
              required
              className={classes.FormInputField}
              label='Email Address'
              size='small'
              type='email'
              value={formFields.email}
              error={touched == 'email' && errors.email !== undefined}
              helperText={touched && errors.email !== undefined ? errors.email : ''}
              onChange={(e) => formChangeHandler(e.target.value, 'email')}
            />
          </div>

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
              value={formFields.companyPhone}
              error={touched == 'companyPhone' && errors.companyPhone !== undefined}
              helperText={touched && errors.companyPhone !== undefined ? errors.companyPhone : ''}
              onChange={(e) => formChangeHandler(e.toString(), 'companyPhone')}
              sx={{
                svg: {
                  height: '20px',
                },
              }}
            />
          </div>
          <div className={classes.LoginRowGrid}>
            <MailIcon />
            <TextField
              className={classes.FormInputField}
              label='Any Tie Ups?'
              size='small'
              value={formFields.tieupDetails}
              onChange={(e) => formChangeHandler(e.target.value, 'tieupDetails')}
            />
          </div>
        </div>

        <div className={[classes.LoginColumn].join(' ')}>
          <div className={classes.LoginRowGrid}>
            <ShareIcon />
            <TextField
              className={classes.FormInputField}
              label='Social Media Links'
              size='small'
              type='text'
              multiline
              maxRows={maxMultilineRows}
              value={formFields.socialMediaLink}
              onChange={(e) => formChangeHandler(e.target.value, 'socialMediaLink')}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <TextField
              className={classes.FormInputField}
              label='Website Link'
              size='small'
              type='text'
              value={formFields.website}
              onChange={(e) => formChangeHandler(e.target.value, 'website')}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <TextField
              className={classes.FormInputField}
              label="Company's Achievements"
              size='small'
              type='text'
              multiline
              maxRows={maxMultilineRows}
              value={formFields.achievements}
              onChange={(e) => formChangeHandler(e.target.value, 'achievements')}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <TextField
              className={classes.FormInputField}
              label='Any Other Specific Requests?'
              size='small'
              type='text'
              multiline
              maxRows={maxMultilineRows}
              value={formFields.specificRequests}
              onChange={(e) => formChangeHandler(e.target.value, 'specificRequests')}
            />
          </div>

          <div className={classes.LoginRowGrid}>
            <CorporateFareIcon />
            <TextField
              className={classes.FormInputField}
              label='About the Company'
              size='small'
              type='text'
              multiline
              rows={maxMultilineRows}
              value={formFields.aboutTheCompany}
              onChange={(e) => formChangeHandler(e.target.value, 'aboutTheCompany')}
            />
          </div>
        </div>
      </div>
      <Button
        variant='contained'
        className={[classes.ButtonUtility, 'ThemeButtonBlack'].join(' ')}
        onClick={(e) => {
          const errorKeys = Object.keys(errors);
          if (errorKeys.length) {
            dispatch(
              updateNotification({
                message: errors[errorKeys[0]],
                show: true,
                status: 'error',
                title: 'Invalid Form Fields',
              })
            );
          } else if (!touched) {
            dispatch(
              updateNotification({
                message: 'Can not submit form without the required fields',
                show: true,
                status: 'error',
                title: 'Invalid Form Fields',
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
      <div id='firebase-recaptcha'></div>
    </React.Fragment>
  );
}
