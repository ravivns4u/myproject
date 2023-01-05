import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux/app/hooks';
import { ICommonAdminTableProps } from '../../AdminDashboard';
import DataTable from '../../../Common/DataTable/DataTable';
import { adminSchemas } from '../../TableSchema/tableSchema';
import {
  getAccountsAdminData,
  getAdminEventsData,
} from '../../../../../../../redux/slices/profile';
import Spinner from '../../../../../../Common/Spinner/Spinner';
import { IAddEventFrontend } from '../../../../../../../redux/interfaces/backend/apis/v2/events';

export default function AdminEvents(props: ICommonAdminTableProps) {
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
      admin: { adminevents },
      fetched,
    },
    user: { isLoggedIn, firebaseToken },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const rowValues = adminevents.map((element) =>
    convertEventToAdminRowType(
      element,
      () => openAdminView(element),
      openApprovePrompt,
      handleProfileView
    )
  );

  React.useEffect(() => {
    const lastEntry = (pageNumber + 1) * 5;
    if (isLoggedIn) {
      if (lastEntry >= rowValues.length + 5)
        dispatch(
          getAdminEventsData({
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
      columnSchema={adminSchemas.event}
      rowValues={rowValues}
    />
  ) : (
    <Spinner />
  );
}
const dayDivisor = 24 * 60 * 60 * 1000;

export const durationDifference = (dateOld: string, dateNew: string) => {
  const old = new Date(dateOld);
  const newD = new Date(dateNew);
  const diff = Math.abs(newD.valueOf() - old.valueOf());

  //compute days, hours and Minutes
  const days = Math.floor(diff / dayDivisor);
  const hours = Math.floor((days % 1) * 24);
  const minutes = Math.floor((hours % 1) * 60);
  // const secs = (minutes % 1) * 60;
  return ` ${days} Days, ${hours} Hours, ${minutes} Minutes `;
};
const currencyMap = {
  USD: '$',
  EUR: '€',
  INR: '₹',
};

export const convertEventToAdminRowType = (
  data: IAddEventFrontend,
  openAdminView: (data: IAddEventFrontend) => void,
  openApprovePrompt: (open: boolean, uid: string) => void,
  handleProfileView: (open: boolean, uid: string) => void
) => {
  return {
    id: data.id,
    image: data.imageUri,
    name: data.name,
    venue: data.venue,
    duration: durationDifference(data.startDate, data.endDate),
    price: `${currencyMap[data.currency] ?? '$'} ${data.price}`,
    about: data.about,
    category: data.category,
    profession:data.profession,
    maxCapacity: +data.audienceCapacity,
    serviceImageLoc: data.imageLocation,
    publicUri: data.imageUri ?? '',
    fileType: data.fileType,
    uid: data.uid,
    openAdminView: openAdminView,
    markVerified: openApprovePrompt,
    viewProfile: handleProfileView,
    showViewProfile: true,
    metadata: { uid: data.uid ?? '' },
  };
};
