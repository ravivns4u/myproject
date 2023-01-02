import React from 'react';
import NavHead, { INavHeaderProps } from '../Common/NavHead/NavHead';
import DataTable, { IDataTableStatic } from '../Common/DataTable/DataTable';
import Spinner from '../../../../Common/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks';
import {
  getUserAndImagePortfolio,
  getUserServices,
} from '../../../../../redux/slices/profile';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import classes from '../common.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeletePointerService } from '../../../../../redux/interfaces/backend/apis/deleteInterfaces';
import Avatar from '@mui/material/Avatar';
import { DeleteDataTypes } from '../../Body';
import { EditDataForm } from '../../../../../redux/interfaces/backend/apis';
import { ServiceRequestForm } from '../../../../../redux/interfaces/backend/apis/servicePortfolio';
import { useRouter } from 'next/router';
import { comparitors } from '../constants/comparitors';
import { IServiceTypes } from '../../../../../redux/interfaces/backend/apis/services';
import { Box } from "@mui/material";

const currencyMap = {
  USD: '$',
  EUR: '€',
  INR: '₹',
};

type ServiceRowInterfaceOpenEditPrompt = (data: EditDataForm) => void;
type ServiceRowInterfaceDeleteData = (data: DeletePointerService) => void;
type ServiceRowInterfaceViewProfilePrompt = (
  open: boolean,
  uid: string
) => void;

interface IServiceRowFunctions {
  // deleteData: ServiceRowInterfaceDeleteData;
  deleteData: any,
  openEditPrompt: ServiceRowInterfaceOpenEditPrompt;
  viewProfile: ServiceRowInterfaceViewProfilePrompt;
}

export type ServiceRowInterface = ServiceRequestForm & IServiceRowFunctions;

const servicesColumns: GridColumns = [
  {
    field: 'publicUri',
    headerName: 'Image',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    renderCell: (data: GridRenderCellParams) => {
      return (
        <React.Suspense fallback={<Spinner />}>
          <Avatar
            className={classes.SquareAvatar_Services}
            variant={'square'}
            alt={data.row.portfolio}
            src={data.row.publicUri}
          />
        </React.Suspense>
      );
    },
  },
  {
    field: 'serviceName',
    headerName: 'Service Name',
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
    field: 'servicePricing',
    headerName: 'Price',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    valueFormatter: (params) => {
      const price = params.api.getRow(params.id ?? '')?.currency ?? 'INR';

      return `${currencyMap[price as keyof typeof currencyMap]} ${
        params.value
      }`;
    },
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
    flex: 0.5,
    renderCell: (params) => {

      const serviceRow = params.row as ServiceRowInterface;
      // const deletePayload: DeletePointerService = {
      //   uid: serviceRow.creator_uid ?? '',
      //   deleteOperationType: 'services',
      //   id: serviceRow.id,
      //   imagePath: serviceRow.absImagePath,
      //   serviceImageLoc: serviceRow.serviceImageLoc,
      // };

      const deletePayload = serviceRow.id;
      const editPayload: ServiceRequestForm = {
        id: serviceRow.id,
        serviceName: serviceRow.serviceName,
        serviceState: serviceRow.serviceState,
        category: serviceRow.category,
        servicePricing: serviceRow.servicePricing,
        currency: serviceRow.currency,
        serviceLanguage: serviceRow.serviceLanguage,
        serviceGender: serviceRow.serviceGender,
        serviceCity: serviceRow.serviceCity,
        serviceDescription: serviceRow.serviceDescription,
        serviceImageLoc: serviceRow.serviceImageLoc,
        profession:serviceRow.profession,
        publicUri: serviceRow.publicUri,
        serviceFileType: serviceRow.serviceFileType,
        panIndia: serviceRow.panIndia,
        absImagePath: serviceRow.absImagePath,
      };
      return (
        <div className={classes.ActionButtons}>
          <DeleteIcon
            className={classes.ActionIconColor}
            onClick={() => serviceRow.deleteData(deletePayload)}
          />
          <EditIcon
            className={classes.ActionIconColor}
            onClick={() => serviceRow.openEditPrompt(editPayload)}
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
  handleProfileView: (open: boolean, uid: string) => void;
}
export default function ServicesPortfolio(props: ServiceProps) {
  const {
    navbarProps,
    externalDataTable,
    openEditPrompt,
    deleteData,
    handleProfileView,
  } = props;
  const router = useRouter();
  const pageSection = router.query.merchantSlug?.[2] ?? comparitors.PENDING;

  const {
    signup: { loading },
    user: { firebaseToken, isLoggedIn, uid },
    profile: {
      fetched,
      services: { servicesPending, servicesApproved, servicesRejected },
    },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const services =
    pageSection === comparitors.PENDING
      ? servicesPending
      : pageSection === comparitors.VERIFIED
      ? servicesApproved
      : servicesRejected;

  const rows = services.map((element) => {
    return converToUserServiceRow(
      element,
      deleteData,
      openEditPrompt,
      handleProfileView
    );
  });
  React.useEffect(() => {
    if (isLoggedIn) {
      const lastEntry = (externalDataTable.pageNumber + 1) * 5;
      if (lastEntry >= rows.length + 5) {
        dispatch(
          getUserServices({
            firebaseToken,
            serviceStatus: pageSection as IServiceTypes,
            isEvent: false,
            uid: uid,
            startWith: 0,
            endAt: (externalDataTable.pageNumber + 1) * 5,
          })
        );
      }
    }
  }, [
    dispatch,
    firebaseToken,
    rows.length,
    isLoggedIn,
    externalDataTable.pageNumber,
    pageSection,
    uid,
  ]);

  // const deleteService = React.useCallback(
  //   (deleteLocation: DeletePointerService) => {
  //     deleteData(deleteLocation, false, false, true);
  //   },
  //   [deleteData]
  // );
  return (
    <React.Fragment>
      <NavHead {...navbarProps} />
      {!loading && !fetched ? (
        <DataTable
          columnSchema={servicesColumns}
          rowValues={rows}
          {...externalDataTable}
        />
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
}
export const converToUserServiceRow = (
  element: ServiceRequestForm,
  deleteData: ServiceRowInterfaceDeleteData,
  openEditPrompt: ServiceRowInterfaceOpenEditPrompt,
  handleProfileView: ServiceRowInterfaceViewProfilePrompt
): ServiceRowInterface => {
  return {
    id: element.id,
    publicUri: element.publicUri ?? '/loading.png',
    creator_uid: element.creator_uid,
    creator_name: element.creator_name,
    creator_dp_loc: element.creator_dp_loc,
    serviceName: element.serviceName,
    serviceState: element.serviceState,
    serviceCity: element.serviceCity,
    category: element.category,
    servicePricing: element.servicePricing,
    serviceDescription: element.serviceDescription,
    profession:element.profession,
    serviceImageLoc: element.serviceImageLoc,
    serviceGender: element.serviceGender,
    currency: element.currency,
    serviceLanguage: element.serviceLanguage,
    panIndia: element.panIndia,
    absImagePath: element.absImagePath,
    openEditPrompt: openEditPrompt,
    serviceFileType: element.serviceFileType,
    deleteData: deleteData,
    viewProfile: handleProfileView,
  };
};
