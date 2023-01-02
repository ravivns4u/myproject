import React from 'react';
import { ICommonAdminTableProps } from '../../AdminDashboard';
import DataTable from '../../../Common/DataTable/DataTable';
import { adminSchemas } from '../../TableSchema/tableSchema';

export default function AdminUrgentRequest(props: ICommonAdminTableProps) {
  const { externalDataTable } = props;

  return (
    <DataTable
      {...externalDataTable}
      columnSchema={adminSchemas.urgentRequests}
      rowValues={DummyUrgentRequestRow}
    />
  );
}

const DummyUrgentRequestRow = [
  {
    id: 0,
    name: 'John Doe',
    contact: '+91 XX XXXX XX78',
    email: 'john-doe@jo.co.in',
    description:
      'Need a Drummer for my upcoming music event. Needed at max by tomorrow',
  },
  {
    id: 1,
    name: 'John Doe',
    contact: '+91 XX XXXX XX78',
    email: 'john-doe@jo.co.in',
    description:
      'Need a Drummer for my upcoming music event. Needed at max by tomorrow',
  },
  {
    id: 2,
    name: 'John Doe',
    contact: '+91 XX XXXX XX78',
    email: 'john-doe@jo.co.in',
    description:
      'Need a Drummer for my upcoming music event. Needed at max by tomorrow',
  },
  {
    id: 3,
    name: 'John Doe',
    contact: '+91 XX XXXX XX78',
    email: 'john-doe@jo.co.in',
    description:
      'Need a Drummer for my upcoming music event. Needed at max by tomorrow',
  },
];
