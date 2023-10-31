import DataTable, {Direction, TableColumn} from 'react-data-table-component';
import IconButton from "@mui/material/IconButton";
import {DeleteForeverOutlined, EditOutlined} from "@mui/icons-material";
import {ReactNode} from "react";

interface IFormListProperties<T> {
  title?: string
  columns: TableColumn<T>[];
  rows: T[];
  isExpandable?: (row: T) => boolean;
  onDelete: (row: T) => void;
  onEdit: (row: T) => void;
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
      cell: (row: T) => {
        return <>
          <IconButton
              aria-label="edit"
              size="small"
              title="Edit entry"
              color="warning"
              onClick={() => onEdit(row)}
          >
            <EditOutlined fontSize="inherit"/>
          </IconButton>

          <IconButton
              aria-label="delete"
              size="small"
              title="Delete entry"
              color="error"
              onClick={() => onDelete(row)}
          >
            <DeleteForeverOutlined fontSize="inherit"/>
          </IconButton>
        </>
      },
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