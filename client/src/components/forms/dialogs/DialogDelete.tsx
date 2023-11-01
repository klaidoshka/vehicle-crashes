import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {CancelOutlined, DeleteOutline} from "@mui/icons-material";

interface IFormDialogDeleteProperties {
  handleClose: () => void;
  handleDelete: () => void;
  isOpen: boolean;
}

const DialogDelete = ({handleClose, handleDelete, isOpen}: IFormDialogDeleteProperties) => {
  const [isLoading, setLoading] = useState(false);

  return <Dialog open={isOpen}>
    <DialogTitle>
      Are you sure about deleting this entry?
    </DialogTitle>

    <DialogActions>
      <IconButton
          className="text-danger"
          size={"small"}
          disabled={isLoading}
          onClick={async () => {
            setLoading(true);

            await new Promise(() => handleDelete());

            setLoading(false);
          }}>
        <DeleteOutline/>
        Delete
      </IconButton>

      <IconButton
          className="text-warning"
          size={"small"}
          disabled={isLoading}
          autoFocus
          onClick={handleClose}>
        <CancelOutlined/>
        Cancel
      </IconButton>
    </DialogActions>
  </Dialog>
};

export default DialogDelete;