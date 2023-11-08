import {callApi} from "./RestApi.ts";
import Vehicle from "../dto/Vehicle.ts";
import {VehicleType} from "../constants/VehicleType.ts";
import IApiEditProperties from "../api/IApiEditProperties.ts";
import IApiGetCollectionProperties from "../api/IApiGetCollectionProperties.ts";
import Response from "../api/Response.ts";
import IApiDeleteProperties from "../api/IApiDeleteProperties.ts";
import IApiCreateProperties from "../api/IApiCreateProperties.ts";

const API_ENDPOINT = "http://localhost:8080/api/vehicles";

const createVehicle = ({
                         element,
                         onError = (error: Error) => console.error(error),
                         onFinally,
                         onSuccess
                       }: IApiCreateProperties<Vehicle>): Promise<Response<any>> => {
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

const deleteVehicle = ({
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

const editVehicle = ({
                       element,
                       onError = (error: Error) => console.error(error),
                       onFinally,
                       onSuccess
                     }: IApiEditProperties<Vehicle>): Promise<Response<any>> => {
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

const getVehicles = ({
                       filter,
                       onError = (error: Error) => console.error(error),
                       onFinally,
                       onSuccess,
                       params
                     }: IApiGetCollectionProperties<Vehicle>): Promise<Vehicle[]> => {
  const queryParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  const apiUrl = API_ENDPOINT + (queryParams.size > 0 ? `?${queryParams.toString()}` : '');

  return callApi<Vehicle[]>(apiUrl)
  .then(response => {
    if (!response.success) {
      throw new Error(response.message);
    }

    let entries: Vehicle[] = response.data?.map(vehicle => {
      const type = (vehicle.type! as any).type as VehicleType;

      return {
        ...vehicle,
        crashes: vehicle.crashes ?? [],
        insurances: vehicle.insurances ?? [],
        owners: vehicle.owners ?? [],
        type: (isNaN(type) ? VehicleType[type] : type) as VehicleType
      }
    }) ?? [];

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
  createVehicle,
  deleteVehicle,
  editVehicle,
  getVehicles
};
