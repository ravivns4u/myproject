import React, { ReactElement } from 'react';
import classes from '../MUIComponents/SignupForm/Vibe/VibeForms.module.scss';
import styles from './PasswordInput.module.scss';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OTPInput from '../MUIComponents/SignupForm/StageComponents/OtpInput';

interface Props {
  password: string;
  handleChangePassword: (password: string, passwordErrorCheck: boolean) => void;
  otp: number[];
  handleChangeOTP: (otp: number[]) => void;
}
export default function PasswordInput(props: Props): ReactElement {
  const { password, handleChangePassword, otp, handleChangeOTP } = props;
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState(false);
  const visibilityHandler = () => setShowPassword((prev) => !prev);

  const arePasswordsMatching = password === confirmPassword;

  return (
    <div className={styles.Column}>
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
            error={password.length < 8 && password.length > 0}
            helperText={
              password.length < 8 && password.length > 0 ? 'Weak Password' : ''
            }
            onChange={(e) =>
              handleChangePassword(e.target.value, arePasswordsMatching)
            }
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
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              handleChangePassword(
                password,
                e.target.value === password && password.length > 8
              );
            }}
            error={!arePasswordsMatching}
            helperText={!arePasswordsMatching ? 'Passwords do not match' : ''}
            size='small'
          />
        </div>
      </div>
      <div className={[styles.ColumnGeneric, styles.AlignCenter].join(' ')}>
        <OTPInput otp={otp} onChange={handleChangeOTP} />
      </div>
    </div>
  );
}
