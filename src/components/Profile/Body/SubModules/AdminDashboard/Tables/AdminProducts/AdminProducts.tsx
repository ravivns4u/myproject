import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux/app/hooks';
import { ICommonAdminTableProps } from '../../AdminDashboard';
import DataTable from '../../../Common/DataTable/DataTable';
import { adminSchemas } from '../../TableSchema/tableSchema';
import { getProductsAdminData } from '../../../../../../../redux/slices/profile';
import Spinner from '../../../../../../Common/Spinner/Spinner';

export default function AdminProducts(props: ICommonAdminTableProps) {
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
      admin: { adminProducts },
      fetched,
    },
    user: { isLoggedIn, firebaseToken },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const rowValues = adminProducts.map((element) => ({
    ...element,
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
          getProductsAdminData({
            eventType: 'pending',
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
      columnSchema={adminSchemas.product}
      rowValues={rowValues}
    />
  ) : (
    <Spinner />
  );
}
