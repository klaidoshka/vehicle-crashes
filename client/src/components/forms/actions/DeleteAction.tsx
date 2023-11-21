import { useState } from 'react';

import { DeleteForeverOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

import DialogAkaModule from '../dialogs/DialogAkaModule.tsx';
import DialogDelete from '../dialogs/DialogDelete.tsx';
import IFormDeleteModuleProperties from '../IFormDeleteModuleProperties.ts';

const DeleteAction = ({ description, handleDelete, title }: IFormDeleteModuleProperties) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton
        aria-label='delete'
        size='small'
        title='Delete entry'
        color='error'
        onClick={() => setOpen(true)}
      >
        <DeleteForeverOutlined fontSize='inherit' />
      </IconButton>

      <DialogAkaModule
        content={
          <DialogDelete
            title={title}
            description={description}
            handleClose={() => setOpen(false)}
            handleDelete={handleDelete}
          />
        }
        isOpen={() => isOpen}
        closeCallback={() => setOpen(false)}
      />
    </>
  );
};

export default DeleteAction;
