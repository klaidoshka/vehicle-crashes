import {ReactNode} from "react";

export default interface IFormEditModuleProperties<T> {
  content: (callback: (element: T) => void) => ReactNode;
  handleEdit: () => void | Promise<void>;
}