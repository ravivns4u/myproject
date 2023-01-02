import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  open: boolean;
  handlePopup: (open: boolean) => void;
  executeDeletion: () => void;
}
export default function AlertDialog(props: Props) {
  const { open, handlePopup, executeDeletion } = props;
  const handleClose = () => handlePopup(false);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='delete-icon'
      aria-describedby='delete-feed'>
      <DialogTitle id='alert-dialog-title'>
        {'Delete the Feed Content?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to Delete the feed content? This process
          can&rsquo;t be undone!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={executeDeletion} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
