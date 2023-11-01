import {ReactNode} from "react";
import {FormType} from "../../constants/FormType.ts";

export default interface IFormProperties {
  title: string;
  description: string;
  formType?: FormType;
  formManage: ReactNode;
  formList: ReactNode;
}