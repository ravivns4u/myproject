import React from 'react';
import classes from './EditProfile.module.scss';

import { updateValidation } from '../../../../../lib/frontend/validateNativeForm';

import TextField from '@mui/material/TextField';
import MuiPhoneNumber from 'material-ui-phone-number';
import Button from '@mui/material/Button';

import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks';
import { updateNotification } from '../../../../../redux/slices/notifications';
import { getUserDetails } from '../../../../../redux/slices/user';
import { updateLoading } from '../../../../../redux/slices/signup';
import type { CombinedUserCompanySchema } from '../../../../../redux/interfaces/frontend/user';
import type { ExpectedUpdaeUserPayload } from '../../../../../redux/interfaces/backend/apis/UpdateUser';
import { getNotifications } from '../../../../../redux/slices/feedsNotification';

const maxMultilineRows = 3;

interface Props {
  user: CombinedUserCompanySchema;
  closeModal?: () => void;
}

export default function EditFormIndividual(props: Props) {
  const { user, closeModal } = props;
  const dispatch = useAppDispatch();
  const {
    signup: { loading },
    user: { firebaseToken },
  } = useAppSelector((state) => state);
  const [formFields, setFormFields] =
    React.useState<CombinedUserCompanySchema>(user);
  const formChangeHandler = (value: any, field: string) => {
    setTouched(true);
    setFormFields({
      ...formFields,
      [field]: value,
    });
  };

  const [touched, setTouched] = React.useState(false);
  const errors = updateValidation(formFields);

  const onClickHandler = async () => {
    closeModal && closeModal();
    if (loading) {
      dispatch(
        updateNotification({
          status: 'pending',
          message: 'Please wait for the update process to complete.',
          title: 'Processing',
          show: true,
        })
      );
      return;
    }
    const eKeys = Object.keys(errors);
    if (eKeys.length) {
      dispatch(
        updateNotification({
          status: 'error',
          message: 'Please fix the errors in the form before submitting.',
          title: 'Invalid Form Data',
          show: true,
        })
      );
      return;
    }
    dispatch(updateLoading({ loading: true }));
    dispatch(
      updateNotification({
        status: 'pending',
        message: 'Please wait for the operation to complete!',
        title: 'Uploading',
        show: true,
      })
    );
    const body: ExpectedUpdaeUserPayload = {
      firebaseToken: firebaseToken,
      updatedUserData: formFields,
    };

    fetch('/api/update-user-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) {
          dispatch(updateLoading({ loading: false }));
          dispatch(
            updateNotification({
              status: 'error',
              message: 'Update Operation Failed!',
              title: 'Error',
              show: true,
            })
          );
        } else {
          dispatch(updateLoading({ loading: false }));
          closeModal && closeModal();
          dispatch(
            updateNotification({
              message: 'Profile Update Successful!',
              show: true,
              status: 'success',
              title: 'Success',
            })
          );
          const payload = {
            uid: user.uid
          }
          dispatch(getUserDetails({ firebaseToken: firebaseToken }));
          dispatch(getNotifications({firebaseToken,payload}))
        }
      })
      .catch((error) => {
        console.log('Error = ', error);
        dispatch(updateLoading({ loading: false }));
        dispatch(
          updateNotification({
            status: 'error',
            message: 'Update Operation Failed!',
            title: 'Error',
          })
        );
      });
  };

  return (
    <div className={classes.FormContent}>
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
            error={touched && errors.companyName !== undefined}
            helperText={
              touched && errors.companyName !== undefined
                ? errors.companyName
                : ''
            }
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
            onChange={(e) =>
              formChangeHandler(e.target.value, 'companyAddress')
            }
          />
        </div>

        <div className={classes.LoginRowGrid}>
          <MailIcon />
          <TextField
            required
            className={classes.FormInputField}
            label='Full Name'
            size='small'
            value={formFields.displayName}
            error={touched && errors.displayName !== undefined}
            helperText={
              touched && errors.displayName !== undefined
                ? errors.displayName
                : ''
            }
            onChange={(e) => formChangeHandler(e.target.value, 'displayName')}
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
            disabled={true}
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
            value={formFields.phone}
            disabled={true}
            onChange={(e) => formChangeHandler(e.toString(), 'phone')}
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

        <div className={classes.LoginRowGrid}>
          <PersonIcon />
          <TextField
            required
            className={classes.FormInputField}
            label='Certifications'
            size='small'
            type='text'
            value={formFields.certifications ?? ''}
            onChange={(e) =>
              formChangeHandler(e.target.value, 'certifications')
            }
            error={errors.displayName !== undefined}
            helperText={errors.displayName}
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
            onChange={(e) =>
              formChangeHandler(e.target.value, 'socialMediaLink')
            }
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
            onChange={(e) =>
              formChangeHandler(e.target.value, 'specificRequests')
            }
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
            onChange={(e) =>
              formChangeHandler(e.target.value, 'aboutTheCompany')
            }
          />
        </div>
      </div>
      <Button
        onClick={onClickHandler}
        className={['ThemeButtonBlack', classes.SaveButton].join(' ')}>
        Save
      </Button>
      <br />
    </div>
  );
}
