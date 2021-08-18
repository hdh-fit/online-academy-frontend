import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { showCategoryAction } from '../../core/utils';

const columns = [
  {
    field: 'label',
    headerName: 'Category',
    description: 'Category',
    flex: 1,

  },
  {
    field: 'category',
    description: 'Main category',
    headerName: 'Main category',
    flex: 1,
  },
];

export default function DataTabbleCategory({ categories, onEdit, onDelete }) {
  const [categoryList, setCategoryList] = React.useState([]);

  React.useEffect(() => {
    const categoryTemp = [...categories];

    categoryTemp.forEach(item => {
      item['id'] = item['_id'];
    });
    setCategoryList(categoryTemp);
  }, [categories]);

  return (
    <div style={{ height: 400, width: '100%', marginTop: 20 }}>
      <h3>{'Categories'}</h3>
      <DataGrid
        rows={categoryList}
        columns={columns}
        pageSize={5}
        onRowDoubleClick={(e) => {
          showCategoryAction(() => onEdit(e.row), () => onDelete(e.row.name));
        }}
      />
    </div>
  );
}
