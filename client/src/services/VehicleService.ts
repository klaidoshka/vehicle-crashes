import {callApi} from "./RestApi.ts";
import VehicleView from "../dto/VehicleView.ts";
import {VehicleType} from "../constants/VehicleType.ts";
import IApiCreateProperties from "../api/rest/IApiCreateProperties.ts";
import IApiDeleteProperties from "../api/rest/IApiDeleteProperties.ts";
import IApiEditProperties from "../api/rest/IApiEditProperties.ts";
import IApiGetCollectionProperties from "../api/rest/IApiGetCollectionProperties.ts";
import Response from "../api/rest/Response.ts";
import VehicleViewModifiable, {VehicleViewModifiableSchema} from "../dto/VehicleViewModifiable.ts";
import {mapSchemaToEntity as mapVehicleOwnerSchemaToEntity} from "./VehicleOwnerService.ts";
import {mapSchemaToEntity as mapInsuranceSchemaToEntity} from "./InsuranceService.ts";
import Configurations from "../api/Configurations.ts";
import IApiGetProperties from "../api/rest/IApiGetProperties.ts";

const API_ENDPOINT = Configurations.SERVER_ADDRESS + "/api/vehicles";

const createVehicle = async ({
                               element,
                               onError = (error: Error) => console.error(error),
                               onFinally,
                               onSuccess
                             }: IApiCreateProperties<VehicleViewModifiable>): Promise<Response<any>> => {
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

const deleteVehicle = async ({
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

const editVehicle = async ({
                             element,
                             onError = (error: Error) => console.error(error),
                             onFinally,
                             onSuccess
                           }: IApiEditProperties<VehicleViewModifiable>): Promise<Response<any>> => {
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

const getVehicle = async ({
                            id,
                            onError = (error: Error) => console.error(error),
                            onFinally,
                            onSuccess,
                            params
                          }: IApiGetProperties<VehicleView>): Promise<VehicleView | undefined> => {
  const queryParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  const apiUrl = API_ENDPOINT + "/" + id + (queryParams.size > 0 ? `?${queryParams.toString()}` : '');

  return callApi<VehicleView>(apiUrl)
  .then((response: Response<VehicleView>) => {
    if (!response.success) {
      throw new Error(response.message);
    }

    const vehicle = response.data!;

    if (vehicle) {
      vehicle.type = (isNaN(vehicle.type) ? VehicleType[vehicle.type] : vehicle.type) as VehicleType;
    }

    onSuccess?.(vehicle);

    return vehicle;
  })
  .catch(error => {
    onError(error);

    return undefined;
  })
  .finally(() => {
    onFinally?.();
  });
};
const getVehicleModifiable = async ({
                                      id,
                                      onError = (error: Error) => console.error(error),
                                      onFinally,
                                      onSuccess,
                                      params
                                    }: IApiGetProperties<VehicleViewModifiable>): Promise<VehicleViewModifiable | undefined> => {
  const queryParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  const apiUrl = API_ENDPOINT + "/modifiable/" + id + (queryParams.size > 0 ? `?${queryParams.toString()}` : '');

  return callApi<VehicleViewModifiable>(apiUrl)
  .then((response: Response<VehicleViewModifiable>) => {
    if (!response.success) {
      throw new Error(response.message);
    }

    const vehicle = response.data!;

    if (vehicle) {
      vehicle.type = (isNaN(vehicle.type) ? VehicleType[vehicle.type] : vehicle.type) as VehicleType;
    }

    onSuccess?.(vehicle);

    return vehicle;
  })
  .catch(error => {
    onError(error);

    return undefined;
  })
  .finally(() => {
    onFinally?.();
  });
};

const getVehicles = async ({
                             filter,
                             onError = (error: Error) => console.error(error),
                             onFinally,
                             onSuccess,
                             params
                           }: IApiGetCollectionProperties<VehicleViewModifiable>): Promise<VehicleViewModifiable[]> => {
  const queryParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  const apiUrl = API_ENDPOINT + "/modifiable" + (queryParams.size > 0 ? `?${queryParams.toString()}` : '');

  return callApi<VehicleViewModifiable[]>(apiUrl)
  .then((response: Response<VehicleViewModifiable[]>) => {
    if (!response.success) {
      throw new Error(response.message);
    }

    let entries: VehicleViewModifiable[] = response.data?.map(vehicle => {
      return {
        ...vehicle,
        crashes: vehicle.crashes ?? [],
        insurances: vehicle.insurances ?? [],
        owners: vehicle.owners ?? [],
        type: (isNaN(vehicle.type) ? VehicleType[vehicle.type] : vehicle.type) as VehicleType
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
};

const mapSchemaToEntity = (vehicleSchema: VehicleViewModifiableSchema): VehicleViewModifiable => {
  return {
    ...vehicleSchema,
    dateManufacture: vehicleSchema.dateManufacture.toISOString().substring(0, 10),
    insurances: vehicleSchema.insurances.map(mapInsuranceSchemaToEntity),
    owners: vehicleSchema.owners.map(mapVehicleOwnerSchemaToEntity),
    type: (isNaN(vehicleSchema.type) ? VehicleType[vehicleSchema.type] : vehicleSchema.type) as VehicleType
  };
};

export {
  createVehicle,
  deleteVehicle,
  editVehicle,
  getVehicle,
  getVehicleModifiable,
  getVehicles,
  mapSchemaToEntity
};
