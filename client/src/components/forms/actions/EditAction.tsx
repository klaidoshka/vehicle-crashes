import { useState } from 'react';

import { EditOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

import IFormEditModuleProperties from '../abstract/IFormEditModuleProperties.ts';
import DialogAkaModule from '../dialogs/DialogAkaModule.tsx';

const EditAction = <T,>({ content, handleEdit }: IFormEditModuleProperties<T>) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton
        aria-label='edit'
        size='small'
        title='Edit entry'
        color='warning'
        onClick={() => setOpen(true)}
      >
        <EditOutlined fontSize='inherit' />
      </IconButton>

      <DialogAkaModule
        children={content(() => {
          handleEdit();

          setOpen(false);
        })}
        isOpen={() => isOpen}
        closeCallback={() => setOpen(false)}
      />
    </>
  );
};

export default EditAction;
