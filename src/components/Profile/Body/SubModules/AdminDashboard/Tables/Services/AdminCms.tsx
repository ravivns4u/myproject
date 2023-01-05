import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux/app/hooks';
import { ICommonAdminTableProps } from '../../AdminDashboard';
import DataTable from '../../../Common/DataTable/DataTable';
import { adminSchemas } from '../../TableSchema/tableSchema';
import { getServicesAdminData } from '../../../../../../../redux/slices/profile';
import Spinner from '../../../../../../Common/Spinner/Spinner';

export default function AdminServices(props: ICommonAdminTableProps) {
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
      admin: { adminServices },
      fetched,
    },
    user: { isLoggedIn, firebaseToken },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const rowValues = adminServices.map((element) => ({
    ...element,
    id: element.imageStorageLoadPath,
    openAdminView: openAdminView,
    markVerified: openApprovePrompt,
    viewProfile: handleProfileView,
    showViewProfile: true,
  }));

  React.useEffect(() => {
    const lastEntry = (pageNumber + 1) * 5;
    if (isLoggedIn) {
      if (lastEntry >= rowValues.length + 5)
        dispatch(
          getServicesAdminData({
            eventType: 'pending',
            firebaseToken,
            startWith: 0,
            endAt: lastEntry,
          })
        );
    }
  }, [isLoggedIn, dispatch, firebaseToken, pageNumber, rowValues.length]);
  return !fetched && !loading ? (
    <DataTable
      {...externalDataTable}
      columnSchema={adminSchemas.service}
      rowValues={rowValues}
    />
  ) : (
    <Spinner />
  );
}
