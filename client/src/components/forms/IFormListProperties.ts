import {TableColumn} from "react-data-table-component";
import {ReactNode} from "react";
import IFormDeleteModuleProperties from "./IFormDeleteModuleProperties.ts";
import IFormEditModuleProperties from "./IFormEditModuleProperties.ts";

export default interface IFormListProperties<T> {
  columns: TableColumn<T>[];
  onExpand?: (row: T) => ReactNode;
  resolveDeleteModule?: (row: T) => IFormDeleteModuleProperties;
  resolveEditModule?: (row: T) => IFormEditModuleProperties<T>;
  rows: T[];
  title?: string
}