import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import EditPortfolio from '../EditProfile/EditFormDynamic';
import type {
  IdentifierType,
  SubIdentifierType,
} from '../EditProfile/EditFormDynamic';
import type {
  EditDataForm,
  IMetaData,
} from '../../../../../redux/interfaces/backend/apis/';

interface Props {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
  triggerChanges: () => void;
  identifier: IdentifierType;
  subIdentifier: SubIdentifierType;
  isAdd: 'add' | 'edit';
  editPromptData: EditDataForm;
  metadata: IMetaData;
}

export default function AlertDialogSlide(props: Props) {
  const {
    open,
    handleClose,
    identifier,
    isAdd,
    editPromptData,
    triggerChanges,
    subIdentifier,
    metadata,
  } = props;

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth='lg'>
      <EditPortfolio
        isAdd={isAdd === 'add'}
        handleClose={handleClose}
        identifier={identifier}
        editPromptData={editPromptData}
        triggerChanges={triggerChanges}
        subIdentifier={subIdentifier}
        metadata={metadata}
        open={open}
      />
    </Dialog>
  );
}
