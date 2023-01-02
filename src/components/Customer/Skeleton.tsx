import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import classes from './Skeleton.module.scss';
import Login from './Login/LoginPopup';
import Signup from './Signup/SignupPopup';
interface Props {
  open: boolean;
  handleOpening: (open: boolean) => void;
}

export default function AlertDialogSlide(props: Props) {
  const { open, handleOpening } = props;
  const [signupForm, setSignupForm] = React.useState(false);
  const handleClose = () => {
    handleOpening(false);
    setSignupForm(false);
  };
  const toggleToSignup = () => {
    console.log("test signup")
    setSignupForm(true)};
  const toggleToLogin = () => setSignupForm(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: 600,
        },
      }}>
      <div className={classes.LoginPromptBox}>
        {signupForm ? (
          <Signup
            classes={classes}
            handleClose={handleClose}
            toggleToLogin={toggleToLogin}
          />
        ) : (
          <Login
            classes={classes}
            handleClose={handleClose}
            toggleToSignup={toggleToSignup}
          />
        )}
      </div>
    </Dialog>
  );
}


