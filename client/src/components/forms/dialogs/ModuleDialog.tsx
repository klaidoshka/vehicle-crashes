import {ReactNode} from "react";
import {Dialog} from "@mui/material";
import {Close} from "@mui/icons-material";

interface IModuleDialogProperties {
  content: ReactNode;
  handleClose: () => void;
  shouldOpen: () => boolean;
}

const ModuleDialog = ({content, handleClose, shouldOpen}: IModuleDialogProperties) => {
  return (
      <Dialog
          open={shouldOpen()}
          onClose={handleClose}
      >
        <div className="p-3 rounded-3">
          <button
              className="btn btn-sm btn-outline-danger justify-content-center align-items-center float-end"
              onClick={handleClose}
              type="button"
          >
            <Close/>
          </button>

          {content}
        </div>
      </Dialog>
  );
};

export default ModuleDialog;