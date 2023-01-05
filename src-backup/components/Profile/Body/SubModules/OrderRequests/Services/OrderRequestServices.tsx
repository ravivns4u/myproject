import { GridColumns, GridRowModel } from '@mui/x-data-grid';
import classes from '../../common.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DataTable, { IDataTableStatic } from '../../Common/DataTable/DataTable';
export const OrderRequestServiceTableSchema: GridColumns = [
  {
    field: 'eventType',
    headerName: 'Event Type',
    headerClassName: classes.DataGrid_header,
    flex: 0.15,
  },
  {
    field: 'eventDate',
    headerName: 'Event Date',
    headerClassName: classes.DataGrid_header,
    flex: 0.15,
  },
  {
    field: 'eventLocation',
    headerName: 'Venue',
    headerClassName: classes.DataGrid_header,
    flex: 0.15,
  },
  {
    field: 'gathering',
    headerName: 'Gathering',
    headerClassName: classes.DataGrid_header,
    flex: 0.15,
  },
  {
    field: 'budget',
    headerName: 'Budget',
    headerClassName: classes.DataGrid_header,
    flex: 0.15,
  },
  {
    field: 'requirements',
    headerName: 'Requirements',
    headerClassName: classes.DataGrid_header,
    flex: 0.5,
  },
  {
    field: 'action',
    headerName: 'Action',
    headerClassName: classes.DataGrid_header,
    flex: 0.15,
    renderCell: (params) => {
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
export const rows: GridRowModel[] = [
  {
    id: 0,
    eventType: 'New Year Eve',
    eventDate: '20th Dec 2021',
    eventLocation: 'Chattarpur Enclave, Delhi',
    gathering: 1000,
    budget: 'INR 2000',
    requirements: 'Join this amazing journey with us!',
  },
];

export default function OrderRequestEventComponent(props: IDataTableStatic) {
  return (
    <DataTable
      {...props}
      columnSchema={OrderRequestServiceTableSchema}
      rowValues={rows}
    />
  );
}
