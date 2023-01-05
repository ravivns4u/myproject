import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux/app/hooks';
import { NewUserMerchantMetaData } from '../../../../../../../redux/interfaces/backend/firestore';
import { RowDataTypes } from '../../../../Admin/Schema';
import { ICommonAdminTableProps } from '../../AdminDashboard';
import DataTable from '../../../Common/DataTable/DataTable';
import { adminSchemas } from '../../TableSchema/tableSchema';
import { getAccountsAdminData } from '../../../../../../../redux/slices/profile';
import Spinner from '../../../../../../Common/Spinner/Spinner';

export default function AdminCompanies(props: ICommonAdminTableProps) {
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
      admin: { companies },
      fetched,
    },
    user: { isLoggedIn, firebaseToken },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
    const rowValues = companiesToMUIRow(
    companies,
    openAdminView,
    openApprovePrompt,
    handleProfileView,
  );

  React.useEffect(() => {
    const lastEntry = (pageNumber + 1) * 5;
    if (isLoggedIn) {
      if (lastEntry >= rowValues.length + 5)
        dispatch(
          getAccountsAdminData({
            isIndividual: false,
            inVerified: true,
            firebaseToken,
            startWith: 0,
            endAt: lastEntry,
          })
        );
    }
  }, [isLoggedIn, firebaseToken, dispatch, rowValues.length, pageNumber]);
  return !fetched && !loading ? (
    <DataTable
      {...externalDataTable}
      columnSchema={adminSchemas.company}
      rowValues={rowValues}
    />
  ) : (
    <Spinner />
  );
}

const companiesToMUIRow = (
  companies: NewUserMerchantMetaData[],
  openAdminView: (data: RowDataTypes) => void,
  openApprovePrompt: (approve: boolean,email:string) => void,
  handleProfileView: (open: boolean, uid: string) => void
) =>
  companies.map((element) => ({
    ...element,
    id: element.uid,
    openAdminView: openAdminView,
    markVerified: openApprovePrompt,
    viewProfile: handleProfileView,
    email:element.email,
  }));
