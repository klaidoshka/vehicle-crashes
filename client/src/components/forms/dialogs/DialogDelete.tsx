import {useState} from "react";
import {CancelOutlined, DeleteForeverOutlined} from "@mui/icons-material";

interface IFormDialogDeleteProperties {
  description?: string;
  handleClose: () => void;
  handleDelete: () => void;
  header: string;
}

const DialogDelete = ({
                        description,
                        handleClose,
                        handleDelete,
                        header
                      }: IFormDialogDeleteProperties) => {
  const [isLoading, setLoading] = useState(false);

  return (
      <div>
        <h1>{header}</h1>

        {description && <p>{description}</p>}

        <div className="d-flex justify-content-end align-items-center">
          <button
              className="d-flex btn btn-sm btn-danger text-black-50 m-1 justify-content-center align-items-center"
              disabled={isLoading}
              onClick={async () => {
                setLoading(true);

                await new Promise(() => handleDelete());

                setLoading(false);

                handleClose();
              }}
              type="button"
          >
            <DeleteForeverOutlined/>
            Delete
          </button>

          <button
              className="d-flex btn btn-sm btn-warning text-black-50 m-1 justify-content-center align-items-center"
              disabled={isLoading}
              onClick={handleClose}
              type="button"
              autoFocus
          >
            <CancelOutlined/>
            Cancel
          </button>
        </div>
      </div>
  )
};

export default DialogDelete;