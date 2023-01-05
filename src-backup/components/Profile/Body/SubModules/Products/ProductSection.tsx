import React from 'react';
import NavHead, { INavHeaderProps } from '../Common/NavHead/NavHead';
import DataTable, { IDataTableStatic } from '../Common/DataTable/DataTable';
import Spinner from '../../../../Common/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks';
import { getUserProducts } from '../../../../../redux/slices/profile';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import classes from '../common.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DeletePointer,
  DeleteProductPointer,
} from '../../../../../redux/interfaces/backend/apis/deleteInterfaces';
import Avatar from '@mui/material/Avatar';
import { DeleteDataTypes } from '../../Body';
import { EditDataForm } from '../../../../../redux/interfaces/backend/apis';
import { useRouter } from 'next/router';
import { comparitors } from '../constants/comparitors';
import { ICreateProductUser } from '../../../../../redux/interfaces/backend/apis/v2/products/product.interfaces';
import { ProductExpectedPayload } from '../../../../../redux/interfaces/backend/apis/productPortfolio';
import AvatarGroup from '@mui/material/AvatarGroup';
import { IServiceTypes } from '../../../../../redux/interfaces/backend/apis/services';

const currencyMap = {
  USD: '$',
  EUR: '€',
  INR: '₹',
};

const productsColumns: GridColumns = [
  {
    field: 'image',
    headerName: 'Images',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    renderCell: (data: GridRenderCellParams) => {
      const row = data.row as ProductExpectedPayload;
      return (
        <AvatarGroup max={3} className={classes.ImageAvatarGroup}>
          {row.images.map((element) => (
            <Avatar
              key={element.imageAbsPath}
              className={classes.ImageAvatarGroup_SqAv}
              variant={'square'}
              alt={row.productDetails}
              src={element.imagePreview}
            />
          ))}
        </AvatarGroup>
      );
    },
  },
  {
    field: 'productName',
    headerName: 'Product Name',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'productPrice',
    headerName: 'Price',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    valueFormatter: (params) => {
      const currency = params.api.getRow(params.id ?? '')?.currency ?? 'INR';
      return `${currencyMap[currency as keyof typeof currencyMap]} ${
        params.value
      }`;
    },
  },

  {
    field: 'discountedPrice',
    headerName: 'Discounted Price',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    valueFormatter: (params) => {
      const currency = params.api.getRow(params.id ?? '')?.currency ?? 'INR';
      return `${currencyMap[currency as keyof typeof currencyMap]} ${
        params.value
      }`;
    },
  },
  {
    field: 'productCategory',
    headerName: 'Category',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'productProfession',
    headerName: 'Profession',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'productDetails',
    headerName: 'Product Details',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'action',
    headerName: 'Action',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    renderCell: (params) => {
      const row = params.row as ProductExpectedPayload;
      return (
        <div className={classes.ActionButtons}>
          <DeleteIcon
            className={classes.ActionIconColor}
            onClick={() =>
              row.deleteData(
                {
                  productRef: row.id ?? '',
                  folderName: row.storageFolderRef,
                  dbType: 'pending',
                },
                true
              )
            }
          />
          <EditIcon
            className={classes.ActionIconColor}
            onClick={() => row.openEditPrompt(row)}
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

export default function ProductsSection(props: ServiceProps) {
  const { navbarProps, externalDataTable, openEditPrompt, deleteData } = props;
  const router = useRouter();
  const pageSection = router.query.merchantSlug?.[2] ?? comparitors.PENDING;

  const {
    signup: { loading },
    user: { firebaseToken, isLoggedIn, uid },
    profile: {
      fetched,
      products: { productsPending, productsApproved, productsRejected },
    },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const rows = (
    pageSection === 'pending'
      ? productsPending
      : pageSection === 'verified'
      ? productsApproved
      : pageSection === 'rejected'
      ? productsRejected
      : []
  ).map((element) =>
    convertToUserProductRow(element, openEditPrompt, deleteData)
  );

  React.useEffect(() => {
    if (isLoggedIn) {
      const lastEntry = (externalDataTable.pageNumber + 1) * 5;
      if (lastEntry >= rows.length + 5)
        dispatch(
          getUserProducts({
            uid,
            firebaseToken,
            serviceStatus: pageSection as IServiceTypes,
            startWith: 0,
            endAt: (externalDataTable.pageNumber + 1) * 5,
          })
        );
    }
  }, [
    dispatch,
    isLoggedIn,
    uid,
    firebaseToken,
    pageSection,
    externalDataTable.pageNumber,
    rows.length,
  ]);

  return (
    <React.Fragment>
      <NavHead {...navbarProps} />
      {!loading && !fetched ? (
        <DataTable
          columnSchema={productsColumns}
          rowValues={rows}
          {...externalDataTable}
        />
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
}

const convertToUserProductRow = (
  data: ICreateProductUser,
  openEditPrompt: (data: EditDataForm) => void,
  deleteData: (
    data: DeletePointer | DeleteProductPointer,
    product?: boolean
  ) => void
): ProductExpectedPayload => {
  return {
    id: data.id,
    images: data.images,
    productCategory: data.productCategory,
    productName: data.productName,
    productDetails: data.productDetails,
    productPrice: data.productPrice,
    productCurrencyType: data.productCurrencyType,
    discountedPrice: data.discountedPrice,
    storageFolderRef: data.storageFolderRef,
    productProfession:data.productProfession,
    openEditPrompt,
    deleteData,
  };
};
