import classes from '../../common.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
// import {
//   GridColumns,
//   GridRenderCellParams,
// } from '@mui/x-data-grid/x-data-grid';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RowDataTypes } from '../../../Admin/Schema';
import { IMetaData } from '../../../../../../redux/interfaces/backend/apis';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { ProductExpectedPayload } from '../../../../../../redux/interfaces/backend/apis/productPortfolio';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
const currencyMap = {
  USD: '$',
  EUR: '€',
  INR: '₹',
};
type RowType = RowDataTypes & {
  openAdminView: (data: RowDataTypes) => void;
  markVerified: (value: boolean) => void;
  viewProfile: (open: boolean, uid: string) => void;
  showViewProfile: boolean;
  metadata: IMetaData;
  uid: string;
};
const ActionRenderer = (params: GridRenderCellParams) => {
  const row = params.row as RowType;
  return (
    <div className={classes.ActionButtons}>
      {row.showViewProfile && (
        <PersonIcon
          className={classes.ActionIconColor}
          onClick={() => {
            row.viewProfile(true, row?.uid ?? '');
          }}
        />
      )}
      <VisibilityIcon
        className={classes.ActionIconColor}
        onClick={() => {
          row.openAdminView(row);
        }}
      />
      <CheckIcon
        className={[classes.ActionIconColor, classes.SuccessGreen].join(' ')}
        onClick={() => row.markVerified(true)}
      />
      <CloseIcon
        className={[classes.ActionIconColor, classes.ErrorRed].join(' ')}
        onClick={() => row.markVerified(false)}
      />
    </div>
  );
};
const UserApprovalTableSchema: GridColumns = [
  {
    field: 'displayName',
    headerName: 'Name',
    headerClassName: classes.DataGrid_header,
    flex: 0.75,
  },
  {
    field: 'email',
    headerName: 'Email',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'profession',
    headerName: 'Profession',
    headerClassName: classes.DataGrid_header,
    flex: 0.75,
  },
  {
    field: 'action',
    headerName: 'Action',
    headerClassName: classes.DataGrid_header,
    flex: 1.5,
    renderCell: ActionRenderer,
  },
];
const CompanyApprovalTableSchema: GridColumns = [
  {
    field: 'companyName',
    headerName: 'Company Name',
    headerClassName: classes.DataGrid_header,
    flex: 0.75,
  },
  {
    field: 'email',
    headerName: 'Email',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'website',
    headerName: 'Website',
    headerClassName: classes.DataGrid_header,
    flex: 0.75,
  },
  {
    field: 'action',
    headerName: 'Action',
    headerClassName: classes.DataGrid_header,
    flex: 1.5,
    renderCell: ActionRenderer,
  },
];
const UserEventsTableSchema: GridColumns = [
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
          src={data.row.publicUri}
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
    headerName: 'Venu',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'duration',
    headerName: 'Time Duration',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    valueFormatter: (params:any) => `${params.value} minutes`,
  },
  {
    field: 'price',
    headerName: 'Price',
    headerClassName: classes.DataGrid_header,
    flex: 0.5,
    valueFormatter: (params:any) => `INR ${params.value}`,
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
    flex: 1.5,
    renderCell: ActionRenderer,
  },
];
const UserServicesTableSchema: GridColumns = [
  {
    field: 'publicUri',
    headerName: 'Image',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    renderCell: (data: GridRenderCellParams) => {
      return (
        <Avatar
          className={classes.SquareAvatar_Services}
          variant={'square'}
          alt={data.row.portfolio}
          src={data.row.publicUri}
        />
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
    field: 'profession',
    headerName: 'Profession',
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: 'servicePricing',
    headerName: 'Price',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    valueFormatter: (params:any) => {
      console.log(params, 'Params')
      const price = params.api.getRow(params.id ?? '')?.currency ?? 'INR';
      return `${currencyMap[price as keyof typeof currencyMap]} ${
        params.value
      }`;
    },
  },
  {
    field: 'action',
    headerName: 'Action',
    headerClassName: classes.DataGrid_header,
    flex: 1.5,
    renderCell: ActionRenderer,
  },
];
const UserProductsTableSchema: GridColumns = [
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
    field: 'productPrice',
    headerName: 'Price',
    headerClassName: classes.DataGrid_header,
    flex: 1,
    valueFormatter: (params:any) => {
      const currency = params.api.getRow(params.id ?? '')?.currency ?? 'INR';
      return `${currencyMap[currency as keyof typeof currencyMap]} ${
        params.value
      }`;
    },
  },
  {
    field: 'action',
    headerName: 'Action',
    headerClassName: classes.DataGrid_header,
    flex: 1.5,
    renderCell: ActionRenderer,
  },
];
const UrgentRequestSchema: GridColumns = [
  {
    field: 'name',
    headerName: 'User Name',
    headerClassName: classes.DataGrid_header,
    flex: 0.5,
  },
  {
    field: 'contact',
    headerName: 'Contact Number',
    headerClassName: classes.DataGrid_header,
    flex: 0.5,
  },
  {
    field: 'email',
    headerName: 'Email Address',
    headerClassName: classes.DataGrid_header,
    flex: 0.5,
  },
  {
    field: 'description',
    headerName: 'Details',
    headerClassName: classes.DataGrid_header,
    flex: 2,
  },
  {
    field: 'action',
    headerName: 'Action',
    headerClassName: classes.DataGrid_header,
    flex: 1.5,
    renderCell: (params:any) => {
      const { row } = params;
      return (
        <div className={classes.ActionButtons}>
          <CheckIcon
            className={[classes.ActionIconColor, classes.SuccessGreen].join(
              ' '
            )}
          />
          {row.hideReject ? null : (
            <CloseIcon
              className={[classes.ActionIconColor, classes.ErrorRed].join(' ')}
            />
          )}
        </div>
      );
    },
  },
];
export const adminSchemas = {
  user: UserApprovalTableSchema,
  company: CompanyApprovalTableSchema,
  event: UserEventsTableSchema,
  service: UserServicesTableSchema,
  product: UserProductsTableSchema,
  urgentRequests: UrgentRequestSchema,
};