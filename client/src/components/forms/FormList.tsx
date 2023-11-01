import DataTable, {Direction, TableColumn} from 'react-data-table-component';
import {ReactNode} from "react";
import FormEntryActions from "./FormEntryActions.tsx";

interface IFormListProperties<T> {
  title?: string
  columns: TableColumn<T>[];
  rows: T[];
  isExpandable?: (row: T) => boolean;
  onDelete: (row: T) => void;
  onEdit: (row: T) => ReactNode;
  onExpand?: (row: T) => ReactNode;
}

export default function FormList<T>({
                                      title = "List",
                                      columns,
                                      rows,
                                      onDelete,
                                      onEdit,
                                      onExpand
                                    }: IFormListProperties<T>) {

  columns = [
    ...columns,
    {
      cell: (row: T) => (
          <FormEntryActions
              onDelete={() => onDelete(row)}
              editComponent={() => onEdit(row)}
          />
      ),
      id: 'actions',
      name: 'Actions',
      width: '100px'
    }
  ];

  return (
      <DataTable
          columns={columns}
          data={rows}
          dense
          direction={Direction.LTR}
          expandOnRowClicked
          expandableRows={!!onExpand}
          expandableRowsComponent={(row: any) => onExpand == null ? <></> : onExpand(row.data as T)}
          expandableRowsHideExpander
          fixedHeader
          fixedHeaderScrollHeight="600px"
          highlightOnHover
          pagination
          pointerOnHover
          responsive
          striped
          title={<h4 className="text-center">{title}</h4>}
      />
  );
}