export default interface IApiDeleteProperties<T> {
  id: number;
  onError?: (error: Error) => void;
  onFinally?: () => void;
  onSuccess?: (element: T) => void;
  onSuccessMap?: (data: T) => T;
  params?: { [key: string]: string | number };
}
