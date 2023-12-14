import IApiCreateProperties from '../api/rest/IApiCreateProperties.ts';
import IApiDeleteProperties from '../api/rest/IApiDeleteProperties.ts';
import IApiGetCollectionProperties from '../api/rest/IApiGetCollectionProperties.ts';
import IApiGetProperties from '../api/rest/IApiGetProperties.ts';
import IApiUpdateProperties from '../api/rest/IApiUpdateProperties.ts';
import Response from '../api/rest/Result.ts';
import { CrashEndpoints } from '../constants/Endpoints.ts';
import CrashView, { CrashViewSchema } from '../dto/CrashView.ts';
import {
    createEntity, deleteEntity, getEntities, getEntity, updateEntity
} from './BackendService.ts';
import { mapApiViewData as mapApiPersonViewData } from './PersonService.ts';
import { mapApiViewData as mapApiVehicleViewData } from './VehicleService.ts';

const createCrash = async ({
  element,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess
}: IApiCreateProperties<CrashView>): Promise<Response<any>> => {
  return createEntity(CrashEndpoints.create, {
    element: element,
    onError: onError,
    onFinally: onFinally,
    onSuccess: onSuccess
  });
};

const deleteCrash = async ({
  id,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess
}: IApiDeleteProperties<CrashView>): Promise<Response<any>> => {
  return deleteEntity(CrashEndpoints.delete, {
    id: id,
    onError: onError,
    onFinally: onFinally,
    onSuccess: onSuccess
  });
};

const updateCrash = async ({
  id,
  element,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess
}: IApiUpdateProperties<CrashView>): Promise<Response<any>> => {
  return updateEntity(CrashEndpoints.update, {
    id: id,
    element: element,
    onError: onError,
    onFinally: onFinally,
    onSuccess: onSuccess
  });
};

const getCrashes = async ({
  filter,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess,
  params
}: IApiGetCollectionProperties<CrashView>): Promise<CrashView[]> => {
  return (
    (
      await getEntities<CrashView>(CrashEndpoints.get, {
        filter: filter,
        onError: onError,
        onFinally: onFinally,
        onSuccess: onSuccess,
        onSuccessMap: (crashes: CrashView[]) => crashes.map((crash) => mapSchemaToEntity(crash)),
        params: params
      })
    ).data ?? []
  );
};

const getCrash = async ({
  id,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess,
  params
}: IApiGetProperties<CrashView>): Promise<CrashView | undefined> => {
  return (
    await getEntity<CrashView>(CrashEndpoints.getById, {
      id: id,
      onError: onError,
      onFinally: onFinally,
      onSuccess: onSuccess,
      onSuccessMap: mapApiViewData,
      params: params
    })
  ).data;
};

const mapApiViewData = (crash: CrashView): CrashView => {
  return {
    ...crash,
    casualtiesPeople: crash.casualtiesPeople.map(mapApiPersonViewData),
    casualtiesVehicle: crash.casualtiesVehicle.map(mapApiVehicleViewData)
  };
};

const mapSchemaToEntity = (crashSchema: CrashViewSchema): CrashView => {
  return {
    ...crashSchema
  };
};

export {
  createCrash,
  deleteCrash,
  updateCrash,
  getCrash,
  getCrashes,
  mapApiViewData,
  mapSchemaToEntity
};
