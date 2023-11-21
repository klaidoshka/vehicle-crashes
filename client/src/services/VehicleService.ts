import IApiCreateProperties from '../api/rest/IApiCreateProperties.ts';
import IApiDeleteProperties from '../api/rest/IApiDeleteProperties.ts';
import IApiGetCollectionProperties from '../api/rest/IApiGetCollectionProperties.ts';
import IApiGetProperties from '../api/rest/IApiGetProperties.ts';
import IApiUpdateProperties from '../api/rest/IApiUpdateProperties.ts';
import Response from '../api/rest/Response.ts';
import { VehicleEndpoints } from '../constants/Endpoints.ts';
import { VehicleType } from '../constants/VehicleType.ts';
import VehicleView from '../dto/VehicleView.ts';
import VehicleViewModifiable, {
    VehicleViewModifiableSchema
} from '../dto/VehicleViewModifiable.ts';
import { mapSchemaToEntity as mapInsuranceSchemaToEntity } from './InsuranceService.ts';
import { createEntity, deleteEntity, getEntities, getEntity, updateEntity } from './RestApi.ts';
import {
    mapApiViewModifiableData as mapApiVehicleOwnerViewModifiableData,
    mapSchemaToEntity as mapVehicleOwnerSchemaToEntity
} from './VehicleOwnerService.ts';

const createVehicle = async ({
  element,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess,
  params
}: IApiCreateProperties<VehicleViewModifiable>): Promise<Response<any>> => {
  return createEntity(VehicleEndpoints.create, {
    element: element,
    onError: onError,
    onFinally: onFinally,
    onSuccess: onSuccess,
    params: params
  });
};

const deleteVehicle = async ({
  id,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess,
  params
}: IApiDeleteProperties<VehicleViewModifiable>): Promise<Response<any>> => {
  return deleteEntity(VehicleEndpoints.delete, {
    id: id,
    onError: onError,
    onFinally: onFinally,
    onSuccess: onSuccess,
    params: params
  });
};

const updateVehicle = async ({
  id,
  element,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess,
  params
}: IApiUpdateProperties<VehicleViewModifiable>): Promise<Response<any>> => {
  return updateEntity<VehicleViewModifiable>(VehicleEndpoints.update, {
    id: id,
    element: element,
    onError: onError,
    onFinally: onFinally,
    onSuccess: onSuccess,
    params: params
  });
};

const getVehicle = async ({
  id,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess,
  params
}: IApiGetProperties<VehicleView>): Promise<VehicleView | undefined> => {
  return (
    await getEntity<VehicleView>(VehicleEndpoints.getById, {
      id: id,
      onError: onError,
      onFinally: onFinally,
      onSuccess: onSuccess,
      onSuccessMap: mapApiViewData,
      params: params
    })
  ).data;
};
const getVehicleModifiable = async ({
  id,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess,
  params
}: IApiGetProperties<VehicleViewModifiable>): Promise<VehicleViewModifiable | undefined> => {
  return (
    await getEntity<VehicleViewModifiable>(VehicleEndpoints.getModifiableById, {
      id: id,
      onError: onError,
      onFinally: onFinally,
      onSuccess: onSuccess,
      onSuccessMap: mapApiViewModifiableData,
      params: params
    })
  ).data;
};

const getVehiclesModifiable = async ({
  filter,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess,
  params
}: IApiGetCollectionProperties<VehicleViewModifiable>): Promise<VehicleViewModifiable[]> => {
  return (
    (
      await getEntities<VehicleViewModifiable>(VehicleEndpoints.getModifiable, {
        filter: filter,
        onError: onError,
        onFinally: onFinally,
        onSuccess: onSuccess,
        onSuccessMap: (data: VehicleViewModifiable[]) => data.map(mapApiViewModifiableData),
        params: params
      })
    ).data ?? []
  );
};

const mapApiViewData = (vehicle: VehicleView): VehicleView => {
  return {
    ...vehicle,
    type: (isNaN(vehicle.type) ? VehicleType[vehicle.type] : vehicle.type) as VehicleType
  };
};

const mapApiViewModifiableData = (vehicle: VehicleViewModifiable): VehicleViewModifiable => {
  return {
    ...vehicle,
    owners: vehicle.owners.map(mapApiVehicleOwnerViewModifiableData),
    type: (isNaN(vehicle.type) ? VehicleType[vehicle.type] : vehicle.type) as VehicleType
  };
};

const mapSchemaToEntity = (vehicleSchema: VehicleViewModifiableSchema): VehicleViewModifiable => {
  return {
    ...vehicleSchema,
    dateManufacture: vehicleSchema.dateManufacture.toISOString().substring(0, 10),
    insurances: vehicleSchema.insurances.map(mapInsuranceSchemaToEntity),
    owners: vehicleSchema.owners.map(mapVehicleOwnerSchemaToEntity),
    type: (isNaN(vehicleSchema.type)
      ? VehicleType[vehicleSchema.type]
      : vehicleSchema.type) as VehicleType
  };
};

export {
  createVehicle,
  deleteVehicle,
  updateVehicle,
  getVehicle,
  getVehicleModifiable,
  getVehiclesModifiable,
  mapApiViewData,
  mapApiViewModifiableData,
  mapSchemaToEntity
};
