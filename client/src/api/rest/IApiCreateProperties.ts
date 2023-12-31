export default interface IApiCreateProperties<T> {
  element: T;
  onError?: (error: Error) => void;
  onFinally?: () => void;
  onSuccess?: (element: T) => void;
  onSuccessMap?: (data: T) => T;
  params?: { [key: string]: string | number };
}
