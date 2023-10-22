import IFormProperties from "./IFormProperties.ts";
import {FormType} from "../../constants/FormType.ts";

export default function FormResolver({formType, formManage, formList}: IFormProperties) {
  switch (formType) {
    case FormType.CREATE:
      return formManage;

    case FormType.LIST:
      return formList;

    default:
      return (
          <div className="text-center">
            Please select a form type by clicking on one of the buttons within this page
          </div>
      );
  }
}