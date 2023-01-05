import React, { ReactElement } from 'react';
import TextField from '@mui/material/TextField';
import classes from './CompanyForms.module.scss';
import { SignupFormCompanyFormState } from '../../../../../../redux/interfaces/frontend/Signup';
import { AdminFrontendMerchantViewSchema } from '../../../../../../redux/interfaces/backend/firestore/registerNewUser';
const maxMultilineRows = 3;

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

export default function LoginForm(props: {
  formState: AdminFrontendMerchantViewSchema;
}): ReactElement {
  const { formState } = props;
  const [formFields, setFormFields] = React.useState(formState);

  React.useEffect(() => {
    setFormFields(formState);
  }, [formState.aboutTheCompany, formState]);

  return (
    <React.Fragment>
      <div className={classes.LoginColumnGrid}>
      <TextField
        disabled
        className={classes.FormInputField}
        label='Name of Company'
        size='small'
        type='text'
        value={formFields.companyName ?? 'UA'}
        multiline
      />

      <TextField
        className={classes.FormInputField}
        label='Company Address'
        size='small'
        value={formFields.companyAddress ?? 'UA'}
        multiline
        disabled
      />

      <TextField
        className={classes.FormInputField}
        label='Full Name'
        size='small'
        value={formFields.fullName ?? 'UA'}
        multiline
        disabled
      />

      <TextField
        className={classes.FormInputField}
        label='Email Address'
        size='small'
        type='email'
        value={formFields.email ?? 'UA'}
        multiline
        disabled
      />

      <TextField
        className={classes.FormInputField}
        label='Email Address'
        size='small'
        type='email'
        value={formFields.companyPhone ?? 'UA'}
        multiline
        disabled
      />

      <TextField
        className={classes.FormInputField}
        label='Any Tie Ups?'
        size='small'
        value={formFields.tieupDetails ?? 'UA'}
        multiline
        disabled
      />

      <TextField
        className={classes.FormInputField}
        label='Social Media Links'
        size='small'
        type='text'
        multiline
        disabled
        value={formFields.socialMediaLink ?? 'UA'}
      />

      <TextField
        className={classes.FormInputField}
        label='Website Link'
        size='small'
        type='text'
        value={formFields.website ?? 'UA'}
        multiline
        disabled
      />

      <TextField
        className={classes.FormInputField}
        label="Company's Achievements"
        size='small'
        type='text'
        multiline
        disabled
        value={formFields.achievements ?? 'UA'}
      />

      <TextField
        className={classes.FormInputField}
        label='Any Other Specific Requests?'
        size='small'
        type='text'
        multiline
        disabled
        value={formFields.specificRequests ?? 'UA'}
      />

      <TextField
        className={classes.FormInputField}
        label='About the Company'
        size='small'
        type='text'
        multiline
        disabled
        value={formFields.aboutTheCompany ?? 'UA'}
      />
      </div>
    </React.Fragment>
  );
}
