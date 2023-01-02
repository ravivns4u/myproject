import { GridColumns, GridRowModel } from '@mui/x-data-grid';
import classes from '../../common.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DataTable, { IDataTableStatic } from '../../Common/DataTable/DataTable';
export async function getStaticProps() {
  return { props: { isDark: true } };
}
const OrderRequestEventsTableSchema: GridColumns = [
  {
    field: 'title',
    headerName: 'Event Name',
    headerClassName: classes.DataGrid_header,
    flex: 0.5,
  },
  {
    field: 'userName',
    headerName: 'Customer Name',
    headerClassName: classes.DataGrid_header,
    flex: 0.5,
  },
  {
    field: 'location',
    headerName: 'Venue',
    headerClassName: classes.DataGrid_header,
    flex: 0.5,
  },
  {
    field: 'date',
    headerName: 'Date',
    headerClassName: classes.DataGrid_header,
    flex: 0.5,
  },
  {
    field: 'time',
    headerName: 'Time',
    headerClassName: classes.DataGrid_header,
    flex: 0.5,
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
const rows: GridRowModel[] = [
  {
    id: 0,
    title: "New Year's Eve",
    userName: 'Evans Smith',
    location: 'Chattarpur Enclave, Delhi',
    date: 'Saturday, 20th Dec 2021',
    time: '10:00 PM - 11:00 PM',
  },
  {
    id: 1,
    title: "New Year's Eve",
    userName: 'Evans Smith',
    location: 'Chattarpur Enclave, Delhi',
    date: 'Saturday, 20th Dec 2021',
    time: '10:00 PM - 11:00 PM',
  },
  {
    id: 2,
    title: "New Year's Eve",
    userName: 'Evans Smith',
    location: 'Chattarpur Enclave, Delhi',
    date: 'Saturday, 20th Dec 2021',
    time: '10:00 PM - 11:00 PM',
  },
  {
    id: 3,
    title: "New Year's Eve",
    userName: 'Evans Smith',
    location: 'Chattarpur Enclave, Delhi',
    date: 'Saturday, 20th Dec 2021',
    time: '10:00 PM - 11:00 PM',
  },
];

export default function OrderRequestEventComponent(props: IDataTableStatic) {
  return (
    <DataTable
      {...props}
      columnSchema={OrderRequestEventsTableSchema}
      rowValues={rows}
      // fromOrder={true}
    />
  );
}
