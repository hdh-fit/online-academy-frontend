import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { showConfirmAlert } from '../../core/utils';

const columns = [

  {
    field: 'fullname',
    description: 'Full name',
    headerName: 'Full name',
    flex: 3,
  },
  {
    field: 'email',
    headerName: 'Email',
    description: 'Email',
    flex: 4,

  },
  {
    field: 'dob',
    headerName: 'DoB',
    description: 'Birthday',
    flex: 2,

  },
  {
    field: 'gender',
    headerName: 'Gender',
    description: 'Gender',
    flex: 2,
  },
  {
    field: 'status',
    headerName: 'Status',
    description: 'Status',
    flex: 2,
  }
];

//const rows = [
//  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//];

export default function DataTable({ rows, onBlockUser, enableUser }) {
  return (
    <div style={{ height: 400, width: '100%', marginTop: 20 }}>
      <h3>{'Students'}</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        onRowDoubleClick={(e) => {
          const isInactive = e.row.disable;
          if (!isInactive) {
            showConfirmAlert('Do you want to block this user?', () => {
              onBlockUser(e.row);
            },
              null,
              null,
              'Confirm'
            );
          } else {
            showConfirmAlert('Do you want to enable this user?', () => {
              enableUser(e.row);
            },
              null,
              null,
              'Confirm'
            );
          }
        }}
      />
    </div>
  );
}
