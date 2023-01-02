import { GridColumns, GridRowModel, GridRenderCellParams } from '@mui/x-data-grid';
import classes from '../../common.module.scss';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DataTable, { IDataTableStatic } from '../../Common/DataTable/DataTable';
export const OrderRequestProductTableSchema: GridColumns = [
  {
    field: 'image',
    headerName: 'Image',
    headerClassName: classes.DataGrid_header,
    flex: 0.3,
    renderCell: (data: GridRenderCellParams) => {
      return (
        <Avatar className={classes.SquareAvatar_Services} variant={'square'} alt={'product'} src={data.row.image} />
      );
    },
  },

  {
    field: 'title',
    headerName: 'Name',
    headerClassName: classes.DataGrid_header,
    flex: 0.25,
  },
  {
    field: 'price',
    headerName: 'Price',
    headerClassName: classes.DataGrid_header,
    flex: 0.25,
  },
  {
    field: 'description',
    headerName: 'Description',
    headerClassName: classes.DataGrid_header,
    flex: 0.5,
  },
  {
    field: 'available',
    headerName: 'Available',
    headerClassName: classes.DataGrid_header,
    flex: 0.25,
  },
  {
    field: 'location',
    headerName: 'Location',
    headerClassName: classes.DataGrid_header,
    flex: 0.25,
  },
  {
    field: 'action',
    headerName: 'Action',
    headerClassName: classes.DataGrid_header,
    flex: 0.25,
    renderCell: (params) => {
      const { row } = params;
      return (
        <div className={classes.ActionButtons}>
          <CheckIcon className={[classes.ActionIconColor, classes.SuccessGreen].join(' ')} />
          {row.hideReject ? null : <CloseIcon className={[classes.ActionIconColor, classes.ErrorRed].join(' ')} />}
        </div>
      );
    },
  },
];
export const rows: GridRowModel[] = [
  {
    id: 0,
    title: 'XYZ',
    image: 'https://source.unsplash.com/random',
    price: 'INR 2000',
    description: 'Seven Dimensions at once',
    available: false,
    location: 'All Over India',
  },
];

export default function OrderRequestEventComponent(props: IDataTableStatic) {
  return <DataTable {...props} columnSchema={OrderRequestProductTableSchema} rowValues={rows} />;
}
