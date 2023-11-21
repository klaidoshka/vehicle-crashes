export default interface IApiGetProperties<T> {
  id: number;
  onError?: (error: Error) => void;
  onFinally?: () => void;
  onSuccess?: (element: T) => void;
  onSuccessMap?: (element: T) => T;
  params?: { [key: string]: string | number };
}
