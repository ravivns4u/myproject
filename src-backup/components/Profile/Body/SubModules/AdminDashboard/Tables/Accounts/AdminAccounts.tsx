import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux/app/hooks';
import { NewUserProfessionalMetaData } from '../../../../../../../redux/interfaces/backend/firestore';
import { RowDataTypes } from '../../../../Admin/Schema';
import { ICommonAdminTableProps } from '../../AdminDashboard';
import DataTable from '../../../Common/DataTable/DataTable';
import { adminSchemas } from '../../TableSchema/tableSchema';
import { getAccountsAdminData } from '../../../../../../../redux/slices/profile';
import Spinner from '../../../../../../Common/Spinner/Spinner';
import { Box } from "@mui/material";

export default function AdminAccounts(props: ICommonAdminTableProps) {
  const {
    openAdminView,
    openApprovePrompt,
    handleProfileView,
    externalDataTable,
  } = props;
  const { pageNumber } = externalDataTable;
  const {
    signup: { loading },
    profile: {
      admin: { accounts },
      fetched,
    },
    user: { isLoggedIn, firebaseToken },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const rowValues = accountsToMUIRow(
    accounts,
    openAdminView,
    openApprovePrompt,
    handleProfileView
  );

  React.useEffect(() => {
    const lastEntry = (pageNumber + 1) * 5;
    if (isLoggedIn) {
      if (lastEntry >= rowValues.length + 5)
        dispatch(
          getAccountsAdminData({
            isIndividual: true,
            inVerified: true,
            firebaseToken,
            startWith: 0,
            endAt: lastEntry,
          })
        );
    }
  }, [isLoggedIn, firebaseToken, dispatch, rowValues.length, pageNumber]);

  return !fetched && !loading ? (
      // <Box sx={{ height: 'auto', width: '100%' }}>
        <DataTable
          {...externalDataTable}
          columnSchema={adminSchemas.user}
          rowValues={rowValues}
        />
      // </Box>
  ) : (
    <Spinner />
  );
}

const accountsToMUIRow = (
  accounts: NewUserProfessionalMetaData[],
  openAdminView: (data: RowDataTypes) => void,
  openApprovePrompt: (approve: boolean) => void,
  handleProfileView: (open: boolean, uid: string) => void
) =>
  accounts.map((element) => ({
    ...element,
    id: element.uid,
    email:element.email,
    openAdminView: openAdminView,
    markVerified: openApprovePrompt,
    viewProfile: handleProfileView,
  }));
