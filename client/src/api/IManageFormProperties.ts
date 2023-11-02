export default interface IManageFormProperties<T> {
  callback?: (element: T) => void;
  element?: T;
  isEdit?: boolean;
}