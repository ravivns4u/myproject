import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import classes from './ViewPrompt.module.scss';
interface AlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  approveUser: () => void;
  approve: boolean;
}
export default function AlertDialog(props: AlertDialogProps) {
  const { open, setOpen, approveUser, approve } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <div className={classes.DialogExterior}>
        <label id='alert-dialog-title'>
          Are you sure you want to {approve ? 'approve' : 'reject'} all these
          account(s)? This action can&apos;t be undone.
        </label>
        <DialogActions>
          <Button onClick={approveUser}>
            Yes {approve ? 'Approve' : 'Reject'}
          </Button>
          <Button onClick={handleClose} autoFocus>
            GoBack
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
