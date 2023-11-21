import { ReactNode } from 'react';

import { Close } from '@mui/icons-material';
import { Dialog } from '@mui/material';

interface IModuleDialogProperties {
  closeCallback: () => void;
  content: ReactNode;
  isOpen: () => boolean;
}

const DialogAkaModule = ({ closeCallback, content, isOpen }: IModuleDialogProperties) => {
  return (
    <Dialog open={isOpen()} onClose={closeCallback}>
      <div className='p-3 rounded-3'>
        <button
          className='btn btn-sm btn-outline-danger justify-content-center align-items-center float-end'
          onClick={closeCallback}
          type='button'
        >
          <Close />
        </button>

        {content}
      </div>
    </Dialog>
  );
};

export default DialogAkaModule;
