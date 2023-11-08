export default interface IApiGetCollectionProperties<T> {
  filter?: (element: T) => boolean;
  onError?: (error: Error) => void;
  onFinally?: () => void;
  onSuccess?: (elements: T[]) => void;
  params?: { [key: string]: string | number };
}