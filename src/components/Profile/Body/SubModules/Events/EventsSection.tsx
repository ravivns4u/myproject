import React from 'react';
import NavHead, { INavHeaderProps } from '../Common/NavHead/NavHead';
import DataTable, { IDataTableStatic } from '../Common/DataTable/DataTable';
import Spinner from '../../../../Common/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks';
import { getEventsUserData } from '../../../../../redux/slices/profile';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import classes from '../common.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import { DeleteDataTypes } from '../../Body';
import { EditDataForm } from '../../../../../redux/interfaces/backend/apis';
import { useRouter } from 'next/router';
import { comparitors } from '../constants/comparitors';
import { InsertionType } from '../../../../../redux/interfaces/backend/apis/v2/common';
import { IAddEventFrontend } from '../../../../../redux/interfaces/backend/apis/v2/events';
import { durationDifference } from '../AdminDashboard/Tables/Events/AdminEvents';

const currencyMap = {
  USD: '$',
  EUR: '€',
  INR: '₹',
};

const eventsColumns: GridColumns = [
  {
    field: 'image',
    headerName: 'Image',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    renderCell: (data: GridRenderCellParams) => {
      return (
        <Avatar
          className={classes.SquareAvatar_Services}
          variant={'square'}
          alt={data.row.portfolio}
          src={data.row.image}
        />
      );
    },
  },
  {
    field: 'name',
    headerName: 'Event Name',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'venue',
    headerName: 'Venue',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    // valueFormatter: (params) => `${params.value} minutes`,
  },
  {
    field: 'price',
    headerName: 'Price',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'category',
    headerName: 'Category',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'profession',
    headerName: 'Profession',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'action',
    headerName: 'Action',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    renderCell: (params) => {
      const eventRow = params.row as EventUserRowInterface;
      return (
        <div className={classes.ActionButtons}>
          <DeleteIcon
            className={classes.ActionIconColor}
            onClick={() => eventRow.deleteData(eventRow.id)}
          />
          <EditIcon
            className={classes.ActionIconColor}
            onClick={() => eventRow.openEditPrompt({} as IAddEventFrontend)}
          />
        </div>
      );
    },
  },
];

export interface ImagePortfolioRow {
  id: string | number;
  image: string;
  portfolio: string;
  description: string;
  action: string;
  fp: string;
  fullPath: string;
  fileName: string;
  openEditPrompt: (data: EditDataForm) => void;
  deleteData: (data: DeleteDataTypes, product?: boolean) => void;
  generation: string;
  uid: string;
}

export interface ServiceProps {
  navbarProps: INavHeaderProps;
  externalDataTable: IDataTableStatic;
  openEditPrompt: (data: EditDataForm) => void;
  deleteData: (
    data: DeleteDataTypes,
    product?: boolean,
    event?: boolean,
    service?: boolean
  ) => void;
}

export default function EventsSection(props: ServiceProps) {
  const { navbarProps, externalDataTable, openEditPrompt, deleteData } = props;
  const router = useRouter();
  const pageSection = router.query.merchantSlug?.[2] ?? comparitors.PENDING;

  const {
    signup: { loading },
    user: { firebaseToken, isLoggedIn },
    profile: {
      fetched,
      events: { eventsPending, eventsApproved, eventsRejected },
    },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const events =
    pageSection === comparitors.PENDING
      ? eventsPending
      : pageSection === comparitors.VERIFIED
      ? eventsApproved
      : eventsRejected;

  const rows = events.map((element, index) => {
    const editPromptCallback = () => openEditPrompt(element);
    return convertEventToRowType(
      element,
      index,
      deleteData,
      editPromptCallback
    );
  });

  React.useEffect(() => {
    if (isLoggedIn) {
      const lastEntry = (externalDataTable.pageNumber + 1) * 5;
      if (lastEntry >= rows.length + 5) {
        dispatch(
          getEventsUserData({
            firebaseToken,
            startAt: 0,
            endAt: (externalDataTable.pageNumber + 1) * 5,
            location: pageSection as InsertionType,
          })
        );
      }
    }
  }, [
    dispatch,
    firebaseToken,
    pageSection,
    rows.length,
    isLoggedIn,
    externalDataTable.pageNumber,
  ]);

  return (
    <React.Fragment>
      <NavHead {...navbarProps} />
      {!loading && !fetched ? (
        <DataTable
          columnSchema={eventsColumns}
          rowValues={rows}
          {...externalDataTable}
        />
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
}

export interface EventUserRowInterface {
  id: string | number;
  image?: string;
  name: string;
  venue: string;
  duration: string;
  price: string;
  about: string;
  serviceImageLoc: string;
  maxCapacity: number;
  fileType: string;
  publicUri: string;
  category: string[] | null;
  profession:string[] | null;
  deleteData: (loc: string | number | any) => void;
  openEditPrompt: (data: EditDataForm) => void;
}

export const convertEventToRowType = (
  element: IAddEventFrontend,
  index: number,
  deleteData: (loc: string | number) => void,
  openEditPrompt: (data: EditDataForm) => void
): EventUserRowInterface => {
  return {
    id: element.id ?? index,
    image: element.imageUri,
    name: element.name,
    venue: element.venue,
    duration: durationDifference(element.startDate, element.endDate),
    price: `${currencyMap[element.currency] ?? '$'} ${element.price}`,
    about: element.about,
    maxCapacity: +element.audienceCapacity,
    serviceImageLoc: element.imageLocation,
    publicUri: element.imageUri ?? '',
    fileType: element.fileType,
    openEditPrompt: openEditPrompt,
    deleteData:deleteData,
    category: element.category,
    profession:element.profession,
    // deleteData: () => deleteData(element.id ?? ''),
  };
};
