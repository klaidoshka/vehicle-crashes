export default interface IApiGetCollectionProperties<T> {
  filter?: (element: T) => boolean;
  onError?: (error: Error) => void;
  onFinally?: () => void;
  onSuccess?: (elements: T[]) => void;
  onSuccessMap?: (elements: T[]) => T[];
  params?: { [key: string]: string | number };
}
