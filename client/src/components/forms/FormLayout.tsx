import { useState } from 'react';

import { Divider, Stack } from '@mui/material';

import { FormType } from '../../constants/FormType.ts';
import FormButtons from './FormButtons.tsx';
import FormExplanation from './FormExplanation.tsx';
import FormResolver from './FormResolver.tsx';
import IFormProperties from './IFormProperties.ts';

export default function FormLayout(properties: IFormProperties) {
  const [formType, setFormType] = useState<FormType>(FormType.NONE);

  const handleFormTypeChange = (formTypeNew: FormType) => {
    setFormType(formTypeNew === formType ? FormType.NONE : formTypeNew);
  };

  return (
    <div className='col-12 d-flex justify-content-center align-items-center w-100'>
      <Stack direction='column' divider={<Divider orientation='vertical' flexItem />}>
        <FormExplanation {...properties} />

        <FormButtons
          onCreateClick={() => handleFormTypeChange(FormType.CREATE)}
          onListClick={() => handleFormTypeChange(FormType.LIST)}
        />

        <FormResolver {...properties} formType={formType} />
      </Stack>
    </div>
  );
}
