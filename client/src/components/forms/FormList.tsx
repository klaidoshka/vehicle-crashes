import DataTable, {Direction, TableColumn} from 'react-data-table-component';
import {ReactNode} from "react";
import IconButton from "@mui/material/IconButton";
import {DeleteForeverOutlined, EditOutlined} from "@mui/icons-material";
import {IFormListRow} from "../../api/IFormListRow.ts";

interface IFormListProperties<T> {
  title?: string
  columns: TableColumn<IFormListRow<T>>[];
  rows: IFormListRow<T>[];
  onDeleteModule?: (row: IFormListRow<T>) => ReactNode;
  onEditModule?: (row: IFormListRow<T>) => ReactNode;
  onExpand?: (row: IFormListRow<T>) => ReactNode;
  openDeleteDialog?: (row: IFormListRow<T>) => void;
  openEditDialog?: (row: IFormListRow<T>) => void;
}

export default function FormList<T>({
                                      title = "List",
                                      columns,
                                      rows,
                                      onDeleteModule,
                                      onEditModule,
                                      onExpand,
                                      openDeleteDialog,
                                      openEditDialog
                                    }: IFormListProperties<T>) {
  if (onDeleteModule || onEditModule) {
    columns = [
      ...columns,
      {
        cell: (row: IFormListRow<T>) => (

            <>
              {onEditModule &&
                  <>
                    <IconButton
                        aria-label="edit"
                        size="small"
                        title="Edit entry"
                        color="warning"
                        onClick={() => openEditDialog?.(row)}
                    >
                      <EditOutlined fontSize="inherit"/>
                    </IconButton>

                    {onEditModule(row)}
                  </>
              }

              {onDeleteModule &&
                  <>
                    <IconButton
                        aria-label="delete"
                        size="small"
                        title="Delete entry"
                        color="error"
                        onClick={() => openDeleteDialog?.(row)}
                    >
                      <DeleteForeverOutlined fontSize="inherit"/>
                    </IconButton>

                    {onDeleteModule(row)}
                  </>
              }
            </>
        ),
        id: 'actions',
        name: 'Actions',
        width: '100px'
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
          expandableRowsComponent={(row) => onExpand == null
              ? <></> : onExpand(row.data as IFormListRow<T>)}
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