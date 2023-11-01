import IconButton from "@mui/material/IconButton";
import IconEntriesCreate from '@mui/icons-material/AddCircleOutlineOutlined';
import IconEntriesList from '@mui/icons-material/FormatListBulletedOutlined';
import {Stack} from "@mui/material";

interface IFormButtonsProperties {
  onCreateClick: () => void;
  onListClick: () => void;
}

export default function FormButtons({onListClick, onCreateClick}: IFormButtonsProperties) {
  return (
      <Stack direction={"row"} spacing={1} className="d-flex justify-content-center align-items-center">
        <IconButton aria-label="list" size="large" title="List entries" color="info"
                    onClick={() => onListClick()}>
          <IconEntriesList fontSize="inherit"/>
        </IconButton>

        <IconButton aria-label="create" size="large" title="Create entries" color="success"
                    onClick={() => onCreateClick()}>
          <IconEntriesCreate fontSize="inherit"/>
        </IconButton>
      </Stack>
  );
}