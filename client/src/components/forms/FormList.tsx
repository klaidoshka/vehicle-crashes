import DataTable, { Direction } from 'react-data-table-component';

import DeleteAction from './actions/DeleteAction.tsx';
import EditAction from './actions/EditAction.tsx';
import IFormListProperties from './IFormListProperties.ts';

export default function FormList<T>({
  title = "List",
  columns,
  rows,
  resolveDeleteModule,
  resolveEditModule,
  onExpand
}: IFormListProperties<T>) {
  if (resolveDeleteModule || resolveEditModule) {
    columns = [
      ...columns,
      {
        cell: (row: T) => (
          <>
            {resolveEditModule && <EditAction {...resolveEditModule(row)} />}

            {resolveDeleteModule && <DeleteAction {...resolveDeleteModule(row)} />}
          </>
        ),
        id: "actions",
        name: "Actions",
        width: "100px"
      }
    ];
  }

  return (
    <DataTable
      columns={columns}
      data={rows}
      dense
      direction={Direction.LTR}
      expandOnRowClicked
      expandableRows={!!onExpand}
      expandableRowsComponent={(row) => (onExpand == null ? <></> : onExpand(row.data as T))}
      expandableRowsHideExpander
      fixedHeader
      fixedHeaderScrollHeight='600px'
      highlightOnHover
      pagination
      pointerOnHover
      responsive
      striped
      title={<h4 className='text-center'>{title}</h4>}
    />
  );
}
