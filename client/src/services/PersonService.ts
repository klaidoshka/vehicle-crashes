import {callApi} from "./RestApi.ts";
import IApiEditProperties from "../api/rest/IApiEditProperties.ts";
import IApiGetCollectionProperties from "../api/rest/IApiGetCollectionProperties.ts";
import Response from "../api/rest/Response.ts";
import IApiDeleteProperties from "../api/rest/IApiDeleteProperties.ts";
import IApiCreateProperties from "../api/rest/IApiCreateProperties.ts";
import PersonView from "../dto/PersonView.ts";
import {Gender} from "../constants/Gender.ts";
import Configurations from "../api/Configurations.ts";
import PersonViewModifiable, {PersonViewModifiableSchema} from "../dto/PersonViewModifiable.ts";
import {mapSchemaToEntity as mapVehicleOwnerSchemaToEntity} from "./VehicleOwnerService.ts";
import IApiGetProperties from "../api/rest/IApiGetProperties.ts";

const API_ENDPOINT = Configurations.SERVER_ADDRESS + "/api/people";

const createPerson = async ({
                              element,
                              onError = (error: Error) => console.error(error),
                              onFinally,
                              onSuccess
                            }: IApiCreateProperties<PersonViewModifiable>): Promise<Response<any>> => {
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

const deletePerson = async ({
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

const editPerson = async ({
                            element,
                            onError = (error: Error) => console.error(error),
                            onFinally,
                            onSuccess
                          }: IApiEditProperties<PersonViewModifiable>): Promise<Response<any>> => {
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

const getPeople = async ({
                           filter,
                           onError = (error: Error) => console.error(error),
                           onFinally,
                           onSuccess,
                           params
                         }: IApiGetCollectionProperties<PersonViewModifiable>): Promise<PersonViewModifiable[]> => {
  const queryParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  const apiUrl = API_ENDPOINT + "/modifiable" + (queryParams.size > 0 ? `?${queryParams.toString()}` : '');

  return callApi<PersonViewModifiable[]>(apiUrl)
  .then((response: Response<PersonViewModifiable[]>) => {
    if (!response.success) {
      throw new Error(response.message);
    }

    let entries: PersonViewModifiable[] = response.data?.map((entry) => ({
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

const getPerson = async ({
                           id,
                           onError = (error: Error) => console.error(error),
                           onFinally,
                           onSuccess,
                           params
                         }: IApiGetProperties<PersonView>): Promise<PersonView | undefined> => {
  const queryParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  const apiUrl = API_ENDPOINT + "/" + id + (queryParams.size > 0 ? `?${queryParams.toString()}` : '');

  return callApi<PersonView>(apiUrl)
  .then((response: Response<PersonView>) => {
    if (!response.success) {
      throw new Error(response.message);
    }

    const person = response.data!;

    if (person) {
      person.gender = (isNaN(person.gender!) ? Gender[person.gender as number] : person.gender) as Gender;
    }

    onSuccess?.(person);

    return person;
  })
  .catch(error => {
    onError(error);

    return undefined;
  })
  .finally(() => {
    onFinally?.();
  });
};

const getPersonModifiable = async ({
                                     id,
                                     onError = (error: Error) => console.error(error),
                                     onFinally,
                                     onSuccess,
                                     params
                                   }: IApiGetProperties<PersonViewModifiable>): Promise<PersonViewModifiable | undefined> => {
  const queryParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  const apiUrl = API_ENDPOINT + "/modifiable/" + id + (queryParams.size > 0 ? `?${queryParams.toString()}` : '');

  return callApi<PersonViewModifiable>(apiUrl)
  .then((response: Response<PersonViewModifiable>) => {
    if (!response.success) {
      throw new Error(response.message);
    }

    const person = response.data!;

    if (person) {
      person.gender = (isNaN(person.gender!) ? Gender[person.gender as number] : person.gender) as Gender;
    }

    onSuccess?.(person);

    return person;
  })
  .catch(error => {
    onError(error);

    return undefined;
  })
  .finally(() => {
    onFinally?.();
  });
};

const mapSchemaToEntity = (personSchema: PersonViewModifiableSchema): PersonViewModifiable => {
  return {
    ...personSchema,
    crashes: [],
    dateBirth: personSchema.dateBirth.toISOString().substring(0, 10),
    vehiclesOwned: personSchema.vehiclesOwned.map(mapVehicleOwnerSchemaToEntity)
  }
}

export {
  createPerson,
  deletePerson,
  editPerson,
  getPerson,
  getPersonModifiable,
  getPeople,
  mapSchemaToEntity
};
