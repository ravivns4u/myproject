import React, { ReactElement } from 'react';
import TextField from '@mui/material/TextField';
import classes from '../Forms.module.scss';
const maxMultilineRows = 3;

export interface FormState {
  fullName: string;
  email: string;
  phone: string;
  socialMediaLink: string;
  serviceTypes: string;
  achievements: string;
  specificRequests: string;
  professionType: string;
  state: string;
  city: string;
  workExperience: number;
  profession: string;
  categories: any;
}

export default function LoginForm(props: { form: FormState }): ReactElement {
  const { form } = props;
  const [formFields, setFormFields] = React.useState(form);
  React.useEffect(() => {
    setFormFields(form);
  }, [
    form,
    form.fullName,
    form.email,
    form.phone,
    form.socialMediaLink,
    form.serviceTypes,
    form.achievements,
    form.specificRequests,
    form.professionType,
    form.state,
    form.city,
    form.workExperience,
    form.profession,
  ]);
  return (
    <React.Fragment>
      <div className={classes.LoginColumnGrid}>
        <div className={[classes.LoginColumn].join(' ')}>
          <TextField
            disabled
            className={classes.FormInputField}
            label='Full Name'
            size='small'
            type='text'
            value={formFields.fullName ?? ''}
          />

          <TextField
            disabled
            className={classes.FormInputField}
            label='Email Address'
            size='small'
            type='email'
            value={formFields.email ?? ''}
          />

          <TextField
            disabled
            className={classes.FormInputField}
            label='Social Media Links'
            size='small'
            type='text'
            multiline
            value={formFields.phone ?? ''}
            maxRows={maxMultilineRows}
          />

          <TextField
            disabled
            className={classes.FormInputField}
            label='Social Media Links'
            size='small'
            type='text'
            multiline
            value={formFields.socialMediaLink ?? ''}
            maxRows={maxMultilineRows}
          />
          <TextField
            disabled
            label='Services you are looking for'
            className={classes.FormInputField}
            size='small'
            value={formFields.serviceTypes ?? ''}
          />

          <TextField
            disabled
            className={classes.FormInputField}
            label='Any Other Specific Requests?'
            size='small'
            type='text'
            multiline
            maxRows={maxMultilineRows}
            value={formFields.specificRequests ?? ''}
          />
        </div>

        <div className={[classes.LoginColumn].join(' ')}>
          <TextField
            disabled
            className={classes.FormInputField}
            label='Profession'
            size='small'
            type='text'
            value={formFields.profession ?? ''}
          />
          <TextField
            disabled
            label='Level of Profession'
            className={classes.FormInputField}
            size='small'
            value={formFields.professionType ?? ''}
          />

          <TextField
            disabled
            label='State'
            className={classes.FormInputField}
            size='small'
            value={formFields.state ?? ''}
          />

          <TextField
            disabled
            label='City'
            className={classes.FormInputField}
            size='small'
            value={formFields.city ?? ''}
          />

          <TextField
            disabled
            className={classes.FormInputField}
            label='Work Experience'
            size='small'
            type={'number'}
            value={formFields.workExperience ?? ''}
            InputProps={{
              endAdornment: <label>Years</label>,
            }}
          />

          <TextField
            disabled
            className={classes.FormInputField}
            label='Your Achievements'
            size='small'
            type='text'
            value={formFields.achievements ?? ''}
            multiline
            maxRows={maxMultilineRows}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
