import IApiCreateProperties from '../api/rest/IApiCreateProperties.ts';
import IApiDeleteProperties from '../api/rest/IApiDeleteProperties.ts';
import IApiGetCollectionProperties from '../api/rest/IApiGetCollectionProperties.ts';
import IApiGetProperties from '../api/rest/IApiGetProperties.ts';
import IApiUpdateProperties from '../api/rest/IApiUpdateProperties.ts';
import Response from '../api/rest/Response.ts';
import { PersonEndpoints } from '../constants/Endpoints.ts';
import { Gender } from '../constants/Gender.ts';
import { VehicleType } from '../constants/VehicleType.ts';
import PersonView from '../dto/PersonView.ts';
import PersonViewModifiable, { PersonViewModifiableSchema } from '../dto/PersonViewModifiable.ts';
import { createEntity, deleteEntity, getEntities, getEntity, updateEntity } from './RestApi.ts';
import {
    mapApiViewModifiableData as mapApiVehicleOwnerViewModifiableData,
    mapSchemaToEntity as mapVehicleOwnerSchemaToEntity
} from './VehicleOwnerService.ts';

const createPerson = async ({
  element,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess
}: IApiCreateProperties<PersonViewModifiable>): Promise<Response<any>> => {
  return createEntity(PersonEndpoints.create, {
    element: element,
    onError: onError,
    onFinally: onFinally,
    onSuccess: onSuccess
  });
};

const deletePerson = async ({
  id,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess
}: IApiDeleteProperties<PersonViewModifiable>): Promise<Response<any>> => {
  return deleteEntity(PersonEndpoints.delete, {
    id: id,
    onError: onError,
    onFinally: onFinally,
    onSuccess: onSuccess
  });
};

const updatePerson = async ({
  id,
  element,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess
}: IApiUpdateProperties<PersonViewModifiable>): Promise<Response<any>> => {
  return updateEntity(PersonEndpoints.update, {
    id: id,
    element: element,
    onError: onError,
    onFinally: onFinally,
    onSuccess: onSuccess
  });
};

const getPeople = async ({
  filter,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess,
  params
}: IApiGetCollectionProperties<PersonViewModifiable>): Promise<PersonViewModifiable[]> => {
  return (
    (
      await getEntities<PersonViewModifiable>(PersonEndpoints.getModifiable, {
        filter: filter,
        onError: onError,
        onFinally: onFinally,
        onSuccess: onSuccess,
        onSuccessMap: (data: PersonViewModifiable[]) =>
          data.map((entry) => ({
            ...entry,
            crashes: entry.crashes ?? [],
            gender: (isNaN(entry.gender!)
              ? Gender[entry.gender as number]
              : entry.gender) as Gender,
            vehiclesOwned:
              entry.vehiclesOwned.map((vo) => ({
                ...vo,
                person: {
                  ...vo.person,
                  gender: (isNaN(entry.gender!)
                    ? Gender[entry.gender as number]
                    : entry.gender) as Gender
                },
                vehicle: {
                  ...vo.vehicle,
                  type: (isNaN(vo.vehicle.type)
                    ? VehicleType[vo.vehicle.type]
                    : vo.vehicle.type) as VehicleType
                }
              })) ?? []
          })) ?? [],
        params: params
      })
    ).data ?? []
  );
};

const getPerson = async ({
  id,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess,
  params
}: IApiGetProperties<PersonView>): Promise<PersonView | undefined> => {
  return (
    await getEntity<PersonView>(PersonEndpoints.getById, {
      id: id,
      onError: onError,
      onFinally: onFinally,
      onSuccess: onSuccess,
      onSuccessMap: mapApiViewData,
      params: params
    })
  ).data;
};

const getPersonModifiable = async ({
  id,
  onError = (error: Error) => console.error(error),
  onFinally,
  onSuccess,
  params
}: IApiGetProperties<PersonViewModifiable>): Promise<PersonViewModifiable | undefined> => {
  return (
    await getEntity<PersonViewModifiable>(PersonEndpoints.getModifiableById, {
      id: id,
      onError: onError,
      onFinally: onFinally,
      onSuccess: onSuccess,
      onSuccessMap: mapApiViewModifiableData,
      params: params
    })
  ).data;
};

const mapApiViewData = (person: PersonView): PersonView => {
  return {
    ...person,
    gender: (isNaN(person.gender!) ? Gender[person.gender as number] : person.gender) as Gender
  };
};

const mapApiViewModifiableData = (person: PersonViewModifiable): PersonViewModifiable => {
  return {
    ...person,
    gender: (isNaN(person.gender!) ? Gender[person.gender as number] : person.gender) as Gender,
    vehiclesOwned: person.vehiclesOwned.map(mapApiVehicleOwnerViewModifiableData)
  };
};

const mapSchemaToEntity = (personSchema: PersonViewModifiableSchema): PersonViewModifiable => {
  return {
    ...personSchema,
    crashes: [],
    dateBirth: personSchema.dateBirth.toISOString().substring(0, 10),
    vehiclesOwned: personSchema.vehiclesOwned.map(mapVehicleOwnerSchemaToEntity)
  };
};

export {
  createPerson,
  deletePerson,
  updatePerson,
  getPerson,
  getPersonModifiable,
  getPeople,
  mapApiViewData,
  mapApiViewModifiableData,
  mapSchemaToEntity
};
