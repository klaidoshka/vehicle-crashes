export default interface IApiGetCollectionProperties<T> {
  filter?: (vehicle: T) => boolean;
  onError?: (error: Error) => void;
  onFinally?: () => void;
  onSuccess?: (vehicles: T[]) => void;
}