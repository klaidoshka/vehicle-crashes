import IApiCreateProperties from '../api/rest/IApiCreateProperties.ts';
import IApiDeleteProperties from '../api/rest/IApiDeleteProperties.ts';
import IApiGetCollectionProperties from '../api/rest/IApiGetCollectionProperties.ts';
import IApiGetProperties from '../api/rest/IApiGetProperties.ts';
import IApiUpdateProperties from '../api/rest/IApiUpdateProperties.ts';
import Response from '../api/rest/Response.ts';
import { CrashEndpoints } from '../constants/Endpoints.ts';
import CrashView, { CrashViewSchema } from '../dto/CrashView.ts';
import { createEntity, deleteEntity, getEntities, getEntity, updateEntity } from './RestApi.ts';

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
      params: params
    })
  ).data;
};

const mapSchemaToEntity = (crashSchema: CrashViewSchema): CrashView => {
  return {
    ...crashSchema,
    date: new Date(crashSchema.date).toISOString().substring(0, 10)
  };
};

export { createCrash, deleteCrash, updateCrash, getCrash, getCrashes, mapSchemaToEntity };
