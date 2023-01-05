import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import EditProfile from '../EditProfile/EditProfile';
import type { PortFolioRoutes } from '../../../../../redux/interfaces/frontend/user';
interface Props {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
  identifier: PortFolioRoutes;
}

export default function AlertDialogSlide(props: Props) {
  const { open, handleClose } = props;
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  let Component = null;
  if (open) {
    Component = (
      <EditProfile
        displayName={'Shivam Sahil'}
        photoURL={'public/portfolio/profile-image.jpeg'}
        handleClose={handleClose}
        open={open}
        scroll={scroll}
      />
    );
  }

  return (
    <Dialog
      scroll={scroll}
      open={open}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth='lg'>
      {Component}
    </Dialog>
  );
}
