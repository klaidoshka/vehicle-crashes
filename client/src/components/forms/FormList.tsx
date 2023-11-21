import DataTable, { Direction } from 'react-data-table-component';

import DeleteAction from './actions/DeleteAction.tsx';
import EditAction from './actions/EditAction.tsx';
import IFormListProperties from './IFormListProperties.ts';

export default function FormList<T>({
  title,
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
      expandableRowsComponent={(row) =>
        onExpand ? (
          <div className='d-flex justify-content-center align-items-center mw-75 mh-75 m-3'>
            {onExpand(row.data as T)}
          </div>
        ) : (
          <></>
        )
      }
      expandableRowsHideExpander
      fixedHeader
      fixedHeaderScrollHeight='600px'
      highlightOnHover
      pagination
      pointerOnHover
      responsive
      striped
      paginationPerPage={10}
      paginationRowsPerPageOptions={[10, 20, 50, 100]}
      title={title ? <h2 className='text-center'>{title}</h2> : undefined}
    />
  );
}
