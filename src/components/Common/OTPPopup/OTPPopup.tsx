import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PasswordInput from '../PasswordInputBox/PasswordInput';
interface Props {
  open: boolean;
  handleClose: () => void;
  password: string;
  otp: number[];
  handleChangePassword: (password: string, passwordErrorCheck: boolean) => void;
  handleChangeOTP: (otp: number[]) => void;
  handleSubmit: (otp: string) => void;
}

export default function OTPPopup({
  open,
  handleClose,
  password,
  handleChangePassword,
  otp,
  handleChangeOTP,
  handleSubmit,
}: Props): React.ReactElement {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Password and Validate OTP</DialogTitle>
      <DialogContent>
        <PasswordInput
          password={password}
          handleChangePassword={handleChangePassword}
          otp={otp}
          handleChangeOTP={handleChangeOTP}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            const result = otp.join('');
            handleSubmit(result);
          }}
          className='ThemeButtonBlack'
          variant='contained'>
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}
