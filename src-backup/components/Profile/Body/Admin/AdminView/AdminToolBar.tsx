import * as React from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';
import classes from './ViewPrompt.module.scss';
import { Button } from '@mui/material';

interface ToolBarProps {
  adminConfig: {
    approveAll: boolean;
    rejectAll: boolean;
    viewRejected: boolean;
  };
  triggerRejected: (value: boolean) => void;
}
export default function CustomToolbar(props: ToolBarProps) {
  const {
    adminConfig: { approveAll, rejectAll, viewRejected },
    triggerRejected,
  } = props;
  return (
    <GridToolbarContainer>
      <div className={classes.AdminToolbar}>
        <Button variant={'text'} disabled={!approveAll}>
          Approve All
        </Button>
        <Button variant={'text'} disabled={!rejectAll}>
          Reject All
        </Button>
        <Button
          variant={'text'}
          onClick={() => {
            triggerRejected(!viewRejected);
          }}>
          View {viewRejected ? 'Rejected' : 'Pending'}
        </Button>
      </div>
    </GridToolbarContainer>
  );
}
