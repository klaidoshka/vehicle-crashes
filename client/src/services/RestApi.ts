import IApiCreateProperties from '../api/rest/IApiCreateProperties.ts';
import IApiDeleteProperties from '../api/rest/IApiDeleteProperties.ts';
import IApiGetCollectionProperties from '../api/rest/IApiGetCollectionProperties.ts';
import IApiGetProperties from '../api/rest/IApiGetProperties.ts';
import IApiUpdateProperties from '../api/rest/IApiUpdateProperties.ts';
import Response from '../api/rest/Response.ts';

const resolveEndpointWithParams = (
  endpoint: string,
  variables?: {
    [key: string]: string | number;
  },
  params?: {
    [key: string]: string | number;
  }
): string => {
  if (variables) {
    for (const key in variables) {
      endpoint = endpoint.replace(`:${key}`, variables[key].toString());
    }
  }

  const queryParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  return endpoint + (queryParams.size > 0 ? `?${queryParams.toString()}` : "");
};

const callApi = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<Response<T>> => {
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
            message: data?.message ?? "Error has occurred while calling api"
          };
    } catch (error) {
      return {
        success: response.ok
      };
    }
  });
};

const createEntity = async <T>(
  endpoint: string,
  {
    element,
    onError,
    onFinally,
    onSuccess,
    onSuccessMap = (data: T) => data,
    params
  }: IApiCreateProperties<T>
): Promise<Response<T>> => {
  return callApi<T>(resolveEndpointWithParams(endpoint, params), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(element)
  })
    .then((response: Response<T>) => {
      if (!response.success) {
        throw new Error(response.message);
      }

      const entity = onSuccessMap(response.data!);

      onSuccess?.(entity);

      return {
        ...response,
        data: entity
      };
    })
    .catch((error) => {
      onError?.(error);

      return {
        success: false,
        data: undefined,
        message: error.message
      };
    })
    .finally(() => {
      onFinally?.();
    });
};

const deleteEntity = async <T>(
  endpoint: string,
  {
    id,
    onError,
    onFinally,
    onSuccess,
    onSuccessMap = (data: T) => data,
    params
  }: IApiDeleteProperties<T>
): Promise<Response<T>> => {
  return callApi<T>(resolveEndpointWithParams(endpoint, { id: id }, params), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response: Response<T>) => {
      if (!response.success) {
        throw new Error(response.message);
      }

      const entity = onSuccessMap(response.data!);

      onSuccess?.(entity);

      return {
        ...response,
        data: entity
      };
    })
    .catch((error) => {
      onError?.(error);

      return {
        success: false,
        data: undefined,
        message: error.message
      };
    })
    .finally(() => {
      onFinally?.();
    });
};

const getEntities = async <T>(
  endpoint: string,
  {
    onError,
    onFinally,
    onSuccess,
    onSuccessMap = (data: T[]) => data,
    params
  }: IApiGetCollectionProperties<T>
): Promise<Response<T[]>> => {
  return callApi<T[]>(resolveEndpointWithParams(endpoint, params))
    .then((response: Response<T[]>) => {
      if (!response.success) {
        throw new Error(response.message);
      }

      const entities = onSuccessMap(response.data!);

      onSuccess?.(entities);

      return {
        ...response,
        data: entities
      };
    })
    .catch((error) => {
      onError?.(error);

      return {
        success: false,
        data: [],
        message: error.message
      };
    })
    .finally(() => {
      onFinally?.();
    });
};

const getEntity = async <T>(
  endpoint: string,
  {
    id,
    onError,
    onFinally,
    onSuccess,
    onSuccessMap = (data: T) => data,
    params
  }: IApiGetProperties<T>
): Promise<Response<T>> => {
  return callApi<T>(resolveEndpointWithParams(endpoint, { id: id }, params))
    .then((response: Response<T>) => {
      if (!response.success) {
        throw new Error(response.message);
      }

      const entity = onSuccessMap(response.data!);

      onSuccess?.(entity);

      return {
        ...response,
        data: entity
      };
    })
    .catch((error) => {
      onError?.(error);

      return {
        success: false,
        data: undefined,
        message: error.message
      };
    })
    .finally(() => {
      onFinally?.();
    });
};

const updateEntity = async <T>(
  endpoint: string,
  {
    id,
    element,
    onError,
    onFinally,
    onSuccess,
    onSuccessMap = (data: T) => data,
    params
  }: IApiUpdateProperties<T>
): Promise<Response<T>> => {
  return callApi<T>(resolveEndpointWithParams(endpoint, { id: id }, params), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(element)
  })
    .then((response: Response<T>) => {
      if (!response.success) {
        throw new Error(response.message);
      }

      const entity = onSuccessMap(response.data!);

      onSuccess?.(entity);

      return {
        ...response,
        data: entity
      };
    })
    .catch((error) => {
      onError?.(error);

      return {
        success: false,
        data: undefined,
        message: error.message
      };
    })
    .finally(() => {
      onFinally?.();
    });
};

export { callApi, createEntity, deleteEntity, getEntities, getEntity, updateEntity };
