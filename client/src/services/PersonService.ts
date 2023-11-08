import {callApi} from "./RestApi.ts";
import IApiEditProperties from "../api/IApiEditProperties.ts";
import IApiGetCollectionProperties from "../api/IApiGetCollectionProperties.ts";
import Response from "../api/Response.ts";
import IApiDeleteProperties from "../api/IApiDeleteProperties.ts";
import IApiCreateProperties from "../api/IApiCreateProperties.ts";
import Person from "../dto/Person.ts";
import {Gender} from "../constants/Gender.ts";

const API_ENDPOINT = "http://localhost:8080/api/people";

const createPerson = ({
                        element,
                        onError = (error: Error) => console.error(error),
                        onFinally,
                        onSuccess
                      }: IApiCreateProperties<Person>): Promise<Response<any>> => {
  return callApi(
      API_ENDPOINT,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(element)
      })
  .then(response => {
    if (!response.success) {
      throw new Error(response?.message);
    }

    onSuccess?.(response);

    return response;
  })
  .catch(error => {
    onError(error);

    return {
      success: false,
      message: error?.message
    };
  })
  .finally(() => {
    onFinally?.();
  });
};

const deletePerson = ({
                        id,
                        onError = (error: Error) => console.error(error),
                        onFinally,
                        onSuccess
                      }: IApiDeleteProperties): Promise<Response<any>> => {
  return callApi(
      API_ENDPOINT + "/" + id,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
  .then(response => {
    if (!response.success) {
      throw new Error(response.message);
    }

    onSuccess?.(response);

    return response;
  })
  .catch(error => {
    onError(error);

    return {
      success: false,
      message: error?.message
    };
  })
  .finally(() => {
    onFinally?.();
  });
}

const editPerson = ({
                      element,
                      onError = (error: Error) => console.error(error),
                      onFinally,
                      onSuccess
                    }: IApiEditProperties<Person>): Promise<Response<any>> => {
  return callApi<any>(
      API_ENDPOINT + "/" + element?.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(element)
      })
  .then(response => {
    if (!response.success) {
      throw new Error(response.message);
    }

    onSuccess?.(response);

    return response;
  })
  .catch(error => {
    onError(error);

    return {
      success: false,
      message: error?.message
    };
  })
  .finally(() => {
    onFinally?.();
  });
}

const getPeople = ({
                     filter,
                     onError = (error: Error) => console.error(error),
                     onFinally,
                     onSuccess,
                     params
                   }: IApiGetCollectionProperties<Person>): Promise<Person[]> => {
  const queryParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  const apiUrl = API_ENDPOINT + (queryParams.size > 0 ? `?${queryParams.toString()}` : '');

  return callApi<Person[]>(apiUrl)
  .then(response => {
    if (!response.success) {
      throw new Error(response.message);
    }

    let entries: Person[] = response.data?.map((entry) => ({
      ...entry,
      crashes: entry.crashes ?? [],
      gender: (isNaN(entry.gender!) ? Gender[entry.gender as number] : entry.gender) as Gender,
      vehiclesOwned: entry.vehiclesOwned ?? []
    })) ?? [];

    if (filter) {
      entries = entries.filter(filter);
    }

    onSuccess?.(entries);

    return entries;
  })
  .catch(error => {
    onError(error);

    return [];
  })
  .finally(() => {
    onFinally?.();
  });
}

export {
  createPerson,
  deletePerson,
  editPerson,
  getPeople
};
