import { Fragment, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';

import { zodResolver } from '@hookform/resolvers/zod';

import IManageFormProperties from '../../../api/IManageFormProperties.ts';
import ValuedOptions from '../../../api/options/ValuedOptions.ts';
import { Gender } from '../../../constants/Gender.ts';
import { VehicleType } from '../../../constants/VehicleType.ts';
import PersonViewModifiable, {
    personViewModifiableSchema, PersonViewModifiableSchema
} from '../../../dto/PersonViewModifiable.ts';
import VehicleViewModifiable from '../../../dto/VehicleViewModifiable.ts';
import { createPerson, mapSchemaToEntity, updatePerson } from '../../../services/PersonService.ts';
import { getVehiclesModifiable } from '../../../services/VehicleService.ts';

const PersonManageForm = ({
  callback,
  element,
  isEdit = false
}: IManageFormProperties<PersonViewModifiable>) => {
  const {
    control,
    formState: { errors, isSubmitting, isDirty },
    getValues,
    handleSubmit,
    register,
    reset
  } = useForm<PersonViewModifiableSchema>({
    defaultValues: {
      crashes: [],
      vehiclesOwned: []
    },
    resolver: zodResolver(personViewModifiableSchema)
  });

  const {
    fields: vehiclesOwnedFields,
    append: vehiclesOwnedAppend,
    remove: vehiclesOwnedRemove
  } = useFieldArray({
    control,
    name: "vehiclesOwned"
  });

  useEffect(() => {
    if (!element) {
      return;
    }

    reset(element);
  }, []);

  const onSubmit = async (data: PersonViewModifiableSchema) => {
    if (!isDirty) {
      return;
    }

    const entity = mapSchemaToEntity(data);

    if (isEdit) {
      await updatePerson({
        id: element!.id!,
        element: entity,
        onSuccess: () => {
          alert("Person edited successfully!");

          callback?.(entity);

          reset(data);
        },
        onError: () => {
          alert("An error occurred while editing the person!");
        }
      });
    } else {
      await createPerson({
        element: entity,
        onSuccess: () => {
          alert("Person created successfully!");

          callback?.(entity);

          reset();
        },
        onError: () => {
          alert("An error occurred while creating the person!");
        }
      });
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Person Management</h2>

      <form
        className='overflow-scroll p-3'
        onSubmit={(e) => {
          const { name, dateBirth, gender } = getValues();

          getValues("vehiclesOwned").forEach((vo) => {
            vo.person = {
              ...vo.person,
              name: name,
              dateBirth: dateBirth,
              gender: gender
            };
          });

          handleSubmit(onSubmit)(e);
        }}
        style={{ minWidth: 400, maxHeight: 600 }}
      >
        <div className='form-group mb-3'>
          <label htmlFor={"name"}>Name</label>

          <input {...register("name")} className='form-control' placeholder='Name' type='text' />

          <p className='text-danger small'>{errors.name?.message}</p>
        </div>

        <div className='form-group mb-3'>
          <label htmlFor={"dateBirth"}>Birth Date</label>

          <input
            {...register("dateBirth")}
            className='form-control'
            placeholder='Birth Date'
            type='date'
          />

          <p className='text-danger small'>{errors.dateBirth?.message}</p>
        </div>

        <div className='form-group mb-3'>
          <label htmlFor={"gender"}>Gender</label>

          <Controller
            control={control}
            name={"gender"}
            defaultValue={Gender.MALE}
            render={({ field }) => (
              <ReactSelect
                options={genderOptions}
                value={genderOptions.find((option) => option.value === field.value)}
                onChange={(option) => {
                  if (option) {
                    field.onChange(option.value);
                  }
                }}
              />
            )}
          />

          <p className='text-danger small'>{errors.gender?.message}</p>
        </div>

        <div className={"form-group mb-3"}>
          <label htmlFor={"vehiclesOwned"}>Owned Vehicles</label>

          {(vehiclesOwnedFields.length > 0 && (
            <div className='table-responsive'>
              <table className='table table-sm table-hover table-striped'>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Plate</th>
                    <th>Year</th>
                    <th>Acquisition Date</th>
                    <th>Disposal Date</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {vehiclesOwnedFields.map((vo, index) => (
                    <Fragment key={vo.id}>
                      <tr>
                        <td>
                          {!isNaN(vo.vehicle.type) ? VehicleType[vo.vehicle.type] : vo.vehicle.type}
                        </td>
                        <td>{vo.vehicle.plate}</td>
                        <td>{new Date(vo.vehicle.dateManufacture).getFullYear()}</td>

                        <td>
                          <input
                            {...register(`vehiclesOwned.${index}.dateAcquisition`)}
                            className='form-control'
                            defaultChecked
                            defaultValue={new Date(vo.dateAcquisition)
                              .toISOString()
                              .substring(0, 10)}
                            type='date'
                          />
                        </td>

                        <td>
                          <input
                            {...register(`vehiclesOwned.${index}.dateDisposal`)}
                            className='form-control'
                            defaultChecked
                            defaultValue={
                              vo.dateDisposal
                                ? new Date(vo.dateDisposal).toISOString().substring(0, 10)
                                : undefined
                            }
                            type='date'
                          />
                        </td>

                        <td>
                          <button
                            className='btn btn-sm btn-outline-danger'
                            onClick={() => vehiclesOwnedRemove(index)}
                            type='button'
                          >
                            ❌
                          </button>
                        </td>
                      </tr>

                      {errors.vehiclesOwned?.[index] && (
                        <tr>
                          <td colSpan={3}></td>
                          <td className='text-center'>
                            <p className='text-danger small'>
                              {errors.vehiclesOwned?.[index]?.dateAcquisition?.message}
                            </p>
                          </td>
                          <td className='text-center'>
                            <p className='text-danger small'>
                              {errors.vehiclesOwned?.[index]?.dateDisposal?.message}
                            </p>
                          </td>
                          <td></td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )) || <p className='text-black-50'>This person has no vehicles registered</p>}

          <AsyncSelect
            className='mt-3'
            closeMenuOnSelect={true}
            defaultOptions
            hideSelectedOptions={true}
            isClearable
            isOptionSelected={(option: any) => {
              return vehiclesOwnedFields.some((vo) => vo.vehicle.plate === option.value.plate);
            }}
            loadingMessage={() => "Loading vehicles data..."}
            loadOptions={fetchVehicleOptions}
            noOptionsMessage={() => "No vehicles found"}
            onChange={(v) => {
              if (v) {
                const vehicle: VehicleViewModifiable = v.value;

                vehiclesOwnedAppend({
                  vehicle: {
                    ...vehicle,
                    owners: vehicle.owners.map((o) => o.id!),
                    insurances: vehicle.insurances.map((i) => i.id!)
                  },
                  dateAcquisition: new Date(),
                  dateDisposal: undefined,
                  person: {
                    ...getValues(),
                    vehiclesOwned: []
                  }
                });
              }
            }}
            placeholder={"Add an owned vehicle..."}
            value={null}
            filterOption={(option, rawInput) =>
              option.label.toLowerCase().includes(rawInput.toLowerCase())
            }
          />

          <p className={"text-danger small"}>{errors.vehiclesOwned?.message}</p>
        </div>

        <button disabled={isSubmitting} className='mt-3 btn btn-sm btn-success w-100' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

const genderOptions: ValuedOptions<Gender>[] = Object.values(Gender)
  .filter((v: any) => isNaN(v))
  .map((v) => ({
    value: Gender[v as keyof typeof Gender],
    label: v as string
  }));

const fetchVehicleOptions = async (
  inputValue: string
): Promise<ValuedOptions<VehicleViewModifiable>[]> => {
  return getVehiclesModifiable({
    params: {
      plate: inputValue
    }
  })
    .then((vehicles) =>
      vehicles.map((v) => ({
        value: v,
        label: `${VehicleType[v.type]} - ${v.plate}`
      }))
    )
    .catch(() => []);
};

export default PersonManageForm;
