import React, { ReactElement } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import { indigo } from '@mui/material/colors';
import classes from './Login.module.scss';

import { useRouter } from 'next/router';
import { frontendRoutes } from '../../../constants/frontend-routes';

interface Props {}

export default function LoginForm({}: Props): ReactElement {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const visibilityHandler = () =>
    setShowPassword((showPassword) => !showPassword);
  return (
    <div className={classes.LoginColumn}>
      <Avatar
        variant={'rounded'}
        src={'/logo-dark.png'}
        alt='break-free logo'
        style={{
          width: 80,
          height: 80,
        }}
      />
      <br />
      <div className={classes.LoginRow}>
        <MailIcon />
        <TextField
          required
          className={classes.FormInputField}
          label='Email Address'
          size='small'
          // defaultValue='Hello World'
        />
      </div>

      <div className={classes.LoginRow}>
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
          // defaultValue='Hello World'
        />
      </div>

      <FormControlLabel
        className={'fw'}
        control={<Checkbox />}
        label='Remember Me'
      />
      <div className={classes.ActionContainer}>
        <Button className={'fw'} variant='contained'>
          Login
        </Button>
        <br />
        <Button
          onClick={() => router.push(frontendRoutes.FORGOT_PASSWORD)}
          style={{
            textTransform: 'initial',
            color: indigo[500],
          }}>
          Forgot Password?
        </Button>
        <Button
          onClick={() => router.push(frontendRoutes.SIGNUP_FOR_NEW_USER)}
          style={{
            textTransform: 'initial',
            color: indigo[500],
            marginTop: '0',
          }}>
          Don&apos;t have an account?
        </Button>
      </div>
    </div>
  );
}
