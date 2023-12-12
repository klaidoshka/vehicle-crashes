import { useState } from 'react';

import { DeleteForeverOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

import IFormDeleteModuleProperties from '../abstract/IFormDeleteModuleProperties.ts';
import DialogAkaModule from '../dialogs/DialogAkaModule.tsx';
import DialogDelete from '../dialogs/DialogDelete.tsx';

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
        children={
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
