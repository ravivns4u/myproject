import React, { ReactElement } from 'react';
import TextField from '@mui/material/TextField';
import MuiPhoneNumber from 'material-ui-phone-number';
import Autocomplete from '@mui/material/Autocomplete';

import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

import classes from './StagesComponents.module.scss';

interface Props {
  states: string[];
  cities: string[];
}

export default function LoginForm({ states, cities }: Props): ReactElement {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);

  const visibilityHandler = () =>
    setShowPassword((showPassword) => !showPassword);

  const visibilityReHandler = () =>
    setShowRePassword((showRePassword) => !showRePassword);

  return (
    <div className={classes.LoginColumnGrid}>
      <div className={classes.LoginRowGrid}>
        <PersonIcon />
        <TextField
          required
          className={classes.FormInputField}
          label='Full Name'
          size='small'
          type='text'
          // defaultValue='Hello World'
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
          // defaultValue='Hello World'
        />
      </div>

      <div className={classes.LoginRowGrid}>
        <LockIcon />
        <TextField
          required
          className={classes.FormInputField}
          label='Password'
          size='small'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: showPassword ? (
              <VisibilityOffIcon onClick={visibilityHandler} />
            ) : (
              <VisibilityIcon onClick={visibilityHandler} />
            ),
          }}
        />
      </div>

      <div className={classes.LoginRowGrid}>
        <LockIcon />
        <TextField
          required
          className={classes.FormInputField}
          label='Re-Enter Password'
          size='small'
          type={showRePassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: showRePassword ? (
              <VisibilityOffIcon onClick={visibilityReHandler} />
            ) : (
              <VisibilityIcon onClick={visibilityReHandler} />
            ),
          }}
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
          onChange={(e) => console.log(e)}
          sx={{
            svg: {
              height: '20px',
            },
          }}
        />
      </div>

      <div className={classes.LoginRowGrid}>
        <LocationOnIcon />
        <Autocomplete
          disablePortal
          options={states}
          renderInput={(params) => (
            <TextField
              {...params}
              label='State'
              required
              className={classes.FormInputField}
              size='small'
            />
          )}
        />
      </div>

      <div className={classes.LoginRowGrid}>
        <LocationCityIcon />
        <Autocomplete
          disablePortal
          options={cities}
          renderInput={(params) => (
            <TextField
              {...params}
              label='City'
              required
              className={classes.FormInputField}
              size='small'       
            />
          )}
        />
      </div>

      <div className={classes.LoginRowGrid}>
        <CorporateFareIcon />
        <Autocomplete
          disablePortal
          options={['Beginer', 'Intermediate', 'Expert']}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Profession Level'
              required
              className={classes.FormInputField}
              size='small'
            />
          )}
        />
      </div>

      <div className={classes.LoginRowGrid}>
        <BusinessCenterIcon />
        <TextField
          required
          className={classes.FormInputField}
          label='Work Experience'
          size='small'
          type={'number'}
          InputProps={{
            endAdornment: <label>Years</label>,
          }}
        />
      </div>

      <div className={classes.LoginRowGrid}>
        <CorporateFareIcon />
        <TextField
          required
          className={classes.FormInputField}
          label='Social Media Links'
          size='small'
          type='text'
          multiline
        />
      </div>

      <div className={classes.LoginRowGrid}>
        <CorporateFareIcon />
        <Autocomplete
          disablePortal
          options={[
            'Workshop/Training',
            'Social Media Promotion',
            'Our Tie Ups',
            'Networking',
          ]}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Services you are looking for'
              required
              className={classes.FormInputField}
              size='small'
            />
          )}
        />
      </div>

      <div className={classes.LoginRowGrid}>
        <CorporateFareIcon />
        <TextField
          required
          className={classes.FormInputField}
          label='Any Other Specific Requests'
          size='small'
          type='text'
          multiline
        />
      </div>
    </div>
  );
}
