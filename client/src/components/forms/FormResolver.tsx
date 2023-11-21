import { FormType } from '../../constants/FormType.ts';
import IFormProperties from './IFormProperties.ts';

export default function FormResolver({ formType, formManage, formList }: IFormProperties) {
  switch (formType) {
    case FormType.CREATE:
      return formManage;

    case FormType.LIST:
      return formList;

    default:
      return (
        <div className='d-flex flex-column text-center mt-3'>
          <p>Please select a form by clicking one of the buttons above</p>
        </div>
      );
  }
}
