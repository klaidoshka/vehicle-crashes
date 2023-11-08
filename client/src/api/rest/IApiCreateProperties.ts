import Response from "./Response.ts";

export default interface IApiCreateProperties<T> {
  element: T;
  onError?: (error: Error) => void;
  onFinally?: () => void;
  onSuccess?: (element: Response<any>) => void;
}