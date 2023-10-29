import Response from "./Response.ts";

export const callApi = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<Response<T>> => {
  return fetch(input, init).then<Response<T>>(async (response) => {
    try {
      const data: any = await response.json();

      return response.ok
          ? {
            success: true,
            data: data?.value ?? data
          }
          : {
            success: false,
            data: data?.value ?? data,
            message: data?.message ?? 'Error has occurred while calling api'
          };
    } catch (error) {
      return {
        success: response.ok
      };
    }
  });
}