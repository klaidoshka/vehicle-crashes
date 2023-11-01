import {ReactNode} from "react";
import {Dialog} from "@mui/material";

interface IFormDialogEditProperties {
  handleClose: () => void;
  editComponent: ReactNode;
  isOpen: boolean;
}

const DialogEdit = ({editComponent, isOpen}: IFormDialogEditProperties) => {
  return (
      <Dialog open={isOpen}>
        <div
            className="p-3 rounded-3"
        >
          {editComponent}
        </div>
      </Dialog>
  );
};

export default DialogEdit;