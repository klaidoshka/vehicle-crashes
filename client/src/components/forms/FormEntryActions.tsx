import IconButton from "@mui/material/IconButton";
import {DeleteForeverOutlined, EditOutlined} from "@mui/icons-material";
import {ReactNode, useState} from "react";
import DialogEdit from "./dialogs/DialogEdit.tsx";
import DialogDelete from "./dialogs/DialogDelete.tsx";

interface IFormEntryActionsProperties {
  onDelete: () => void;
  editComponent: () => ReactNode;
}

const FormEntryActions = ({onDelete, editComponent}: IFormEntryActionsProperties) => {
  const [isDialogEditOpen, setDialogEditOpen] = useState(false);
  const [isDialogDeleteOpen, setDialogDeleteOpen] = useState(false);

  return <>
    <IconButton
        aria-label="edit"
        size="small"
        title="Edit entry"
        color="warning"
        onClick={() => setDialogEditOpen(true)}
    >
      <EditOutlined fontSize="inherit"/>
    </IconButton>

    <IconButton
        aria-label="delete"
        size="small"
        title="Delete entry"
        color="error"
        onClick={() => setDialogDeleteOpen(true)}
    >
      <DeleteForeverOutlined fontSize="inherit"/>
    </IconButton>

    <DialogEdit
        editComponent={editComponent()}
        isOpen={isDialogEditOpen}
    />

    <DialogDelete
        handleClose={() => setDialogDeleteOpen(false)}
        handleDelete={onDelete}
        isOpen={isDialogDeleteOpen}
    />
  </>
};

export default FormEntryActions;