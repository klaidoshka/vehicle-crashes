import IFormDeleteModuleProperties from "../IFormDeleteModuleProperties.ts";
import {useState} from "react";
import DialogAkaModule from "../dialogs/DialogAkaModule.tsx";
import DialogDelete from "../dialogs/DialogDelete.tsx";
import IconButton from "@mui/material/IconButton";
import {DeleteForeverOutlined} from "@mui/icons-material";

const DeleteAction = ({
                         description,
                         handleDelete,
                         title
                       }: IFormDeleteModuleProperties) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
      <>
        <IconButton
            aria-label="delete"
            size="small"
            title="Delete entry"
            color="error"
            onClick={() => setOpen(true)}
        >
          <DeleteForeverOutlined fontSize="inherit"/>
        </IconButton>

        <DialogAkaModule
            content={(
                <DialogDelete
                    title={title}
                    description={description}
                    handleClose={() => setOpen(false)}
                    handleDelete={handleDelete}
                />
            )}
            isOpen={() => isOpen}
            closeCallback={() => setOpen(false)}
        />
      </>
  );
};

export default DeleteAction;