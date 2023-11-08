import VehicleOwnerView, {VehicleOwnerViewSchema} from "../dto/VehicleOwnerView.ts";
import IApiGetProperties from "../api/rest/IApiGetProperties.ts";
import {callApi} from "./RestApi.ts";
import Response from "../api/rest/Response.ts";
import Configurations from "../api/Configurations.ts";

const API_ENDPOINT = Configurations.SERVER_ADDRESS + "/api/vehicleOwners";

const getVehicleOwner = ({
                           id,
                           onError = (error: Error) => console.error(error),
                           onFinally,
                           onSuccess,
                           params
                         }: IApiGetProperties<VehicleOwnerView>): Promise<VehicleOwnerView | undefined> => {
  const queryParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  const apiUrl = `${API_ENDPOINT}/${id}` + (queryParams.size > 0 ? `?${queryParams.toString()}` : '');

  return callApi<VehicleOwnerView>(apiUrl)
  .then((response: Response<VehicleOwnerView>) => {
    if (!response.success) {
      throw new Error(response.message);
    }

    const element = response.data

    onSuccess?.(element!);

    return element;
  })
  .catch(error => {
    onError(error);

    return undefined;
  })
  .finally(() => {
    onFinally?.();
  });
}

const mapSchemaToEntity = (vehicleOwnerSchema: VehicleOwnerViewSchema): VehicleOwnerView => {
  return {
    ...vehicleOwnerSchema,
    dateAcquisition: vehicleOwnerSchema.dateAcquisition.toISOString().substring(0, 10),
    dateDisposal: vehicleOwnerSchema.dateDisposal === ""
        ? undefined
        : vehicleOwnerSchema.dateDisposal
            ? new Date(vehicleOwnerSchema.dateDisposal).toISOString().substring(0, 10)
            : undefined
  };
};

export {getVehicleOwner, mapSchemaToEntity};