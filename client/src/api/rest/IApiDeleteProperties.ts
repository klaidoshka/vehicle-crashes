import Response from "./Response.ts";

export default interface IApiDeleteProperties {
  id: number;
  onError?: (error: Error) => void;
  onFinally?: () => void;
  onSuccess?: (response: Response<any>) => void;
}