import { Fragment, useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';

import { zodResolver } from '@hookform/resolvers/zod';

import IManageFormProperties from '../../../api/IManageFormProperties.ts';
import ValuedOptions from '../../../api/options/ValuedOptions.ts';
import { VehicleType } from '../../../constants/VehicleType.ts';
import VehicleViewModifiable, {
    vehicleViewModifiableSchema, VehicleViewModifiableSchema
} from '../../../dto/VehicleViewModifiable.ts';
import { isTodayOrGreater, resolveDateString } from '../../../services/Dates.ts';
import {
    createVehicle, mapSchemaToEntity, updateVehicle
} from '../../../services/VehicleService.ts';

const VehicleManageForm = ({
  callback,
  element,
  isEdit = false
}: IManageFormProperties<VehicleViewModifiable>) => {
  const [isLoadingElement, setLoadingElement] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<VehicleViewModifiableSchema>({
    defaultValues: {
      crashes: [],
      insurances: [],
      owners: []
    },
    resolver: zodResolver(vehicleViewModifiableSchema)
  });

  const { remove: insurancesRemove, append: insurancesAppend } = useFieldArray({
    name: "insurances",
    control: control
  });

  useEffect(() => {
    if (!element) {
      return;
    }

    setLoadingElement(true);

    const onFormLoad = async (): Promise<VehicleViewModifiableSchema> => {
      return {
        ...element,
        dateManufacture: new Date(element.dateManufacture),
        insurances: element.insurances.map((i) => ({
          ...i,
          dateExpiration: new Date(i.dateExpiration),
          dateInitialization: new Date(i.dateInitialization)
        })),
        owners: element.owners.map((o) => ({
          ...o,
          dateAcquisition: new Date(o.dateAcquisition),
          dateDisposal: o.dateDisposal ? new Date(o.dateDisposal) : undefined,
          person: {
            ...o.person,
            dateBirth: new Date(o.person.dateBirth)
          },
          vehicle: {
            ...o.vehicle,
            dateManufacture: new Date(o.vehicle.dateManufacture)
          }
        }))
      };
    };

    onFormLoad().then((personSchema) => {
      reset(personSchema);

      setLoadingElement(false);
    });
  }, []);

  const onSubmit = async (data: VehicleViewModifiableSchema) => {
    if (!isDirty) {
      return;
    }

    const entity: VehicleViewModifiable = mapSchemaToEntity(data);

    if (isEdit) {
      await updateVehicle({
        id: element?.id!,
        element: entity,
        onSuccess: () => {
          alert("Vehicle edited successfully!");

          callback?.(entity);

          reset(data);
        },
        onError: () => {
          alert("An error occurred while editing the vehicle!");
        }
      });
    } else {
      await createVehicle({
        element: entity,
        onSuccess: () => {
          alert("Vehicle created successfully!");

          callback?.(entity);

          reset();
        },
        onError: () => {
          alert("An error occurred while creating the vehicle!");
        }
      });
    }
  };

  return (
    <div className='container'>
      <h4 className='text-center'>Vehicle Management</h4>

      {(isLoadingElement && <p>Loading data...</p>) || (
        <form
          className='overflow-scroll p-3'
          onSubmit={handleSubmit(onSubmit)}
          style={{ minWidth: 400, maxHeight: 600 }}
        >
          <div className='form-group mb-3'>
            <label htmlFor={"dateManufacture"}>Manufacture Date</label>

            <input
              {...register("dateManufacture")}
              className='form-control'
              defaultChecked
              defaultValue={control._defaultValues.dateManufacture?.toISOString().substring(0, 10)}
              placeholder='Manufacture Date'
              type='date'
            />

            <p className='text-danger small'>{errors.dateManufacture?.message}</p>
          </div>

          <div className='form-group mb-3'>
            <label htmlFor={"plate"}>Plate</label>

            <input
              {...register("plate")}
              className='form-control'
              placeholder='Plate'
              type='text'
            />

            <p className='text-danger small'>{errors.plate?.message}</p>
          </div>

          <div className='form-group mb-3'>
            <label htmlFor={"color"}>Color</label>

            <input
              {...register("color")}
              className='form-control'
              placeholder='Color'
              type='text'
            />

            <p className='text-danger small'>{errors.color?.message}</p>
          </div>

          <div className='form-group mb-3'>
            <label htmlFor={"type"}>Type</label>

            <Controller
              control={control}
              name={"type"}
              defaultValue={VehicleType.CAR}
              render={({ field }) => (
                <ReactSelect
                  options={vehicleTypeOptions}
                  value={vehicleTypeOptions.find((option) => option.value === field.value)}
                  onChange={(option) => {
                    if (option) {
                      field.onChange(option.value);
                    }
                  }}
                />
              )}
            />

            <p className='text-danger small'>{errors.type?.message}</p>
          </div>

          <div className='form-group mb-3'>
            <label>Insurances</label>

            {((watch("insurances")?.length ?? 0) > 0 && (
              <div className='table-responsive'>
                <table className='table table-sm table-hover table-striped'>
                  <thead>
                    <tr>
                      <th style={{ width: "15%" }}>Active</th>

                      <th style={{ width: "35%" }}>Start Date</th>

                      <th style={{ width: "35%" }}>Expire Date</th>

                      <th style={{ width: "15%" }}></th>
                    </tr>
                  </thead>

                  <tbody>
                    {watch("insurances")?.map((insurance, index) => (
                      <Fragment key={crypto.randomUUID()}>
                        <tr>
                          <td className='text-center' style={{ width: "15%" }}>
                            {isTodayOrGreater(new Date(insurance.dateExpiration)) ? "✅" : "➖"}
                          </td>

                          <td style={{ width: "35%" }}>
                            <input
                              {...register(`insurances.${index}.dateInitialization`)}
                              className='form-control w-100'
                              defaultChecked
                              defaultValue={resolveDateString(insurance.dateInitialization)}
                              type='date'
                            />
                          </td>

                          <td style={{ width: "35%" }}>
                            <input
                              {...register(`insurances.${index}.dateExpiration`)}
                              className='form-control w-100'
                              defaultChecked
                              defaultValue={resolveDateString(insurance.dateExpiration)}
                              type='date'
                            />
                          </td>

                          <td style={{ width: "35%" }}>
                            <button
                              type='button'
                              className='btn btn-sm btn-outline-danger w-100 mt-1'
                              onClick={() => insurancesRemove(index)}
                            >
                              ❌
                            </button>
                          </td>
                        </tr>

                        {errors.insurances?.[index] && (
                          <tr>
                            <td style={{ width: "15%" }}></td>
                            <td style={{ width: "35%" }}>
                              <p className='text-danger small'>
                                {errors.insurances?.[index]?.dateInitialization?.message}
                              </p>
                            </td>
                            <td className='text-center' style={{ width: "35%" }}>
                              <p className='text-danger small'>
                                {errors.insurances?.[index]?.dateExpiration?.message ||
                                  errors.insurances?.[index]?.root?.message}
                              </p>
                            </td>
                            <td style={{ width: "15%" }}></td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )) || <p className='text-black-50'>This vehicle has no insurances</p>}

            <div className='d-flex justify-content-center align-items-center mt-3'>
              <button
                className='btn btn-sm btn-outline-success 50'
                disabled={
                  (watch("insurances")?.findIndex((insurance) =>
                    isTodayOrGreater(new Date(insurance.dateExpiration))
                  ) ?? -1) !== -1
                }
                onClick={() => {
                  const dateStart = new Date();
                  const dateExpire = new Date();

                  dateExpire.setFullYear(dateStart.getFullYear() + 1);

                  insurancesAppend({
                    dateInitialization: dateStart,
                    dateExpiration: dateExpire,
                    vehicleId: element?.id
                  });
                }}
                type='button'
              >
                ➕
              </button>
            </div>
          </div>

          <button
            disabled={isSubmitting}
            className='mt-3 btn btn-sm btn-success w-100'
            type='submit'
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

const vehicleTypeOptions: ValuedOptions<VehicleType>[] = Object.values(VehicleType)
  .filter((v: any) => isNaN(v))
  .map((v) => ({
    value: VehicleType[v as keyof typeof VehicleType],
    label: v as string
  }));

export default VehicleManageForm;
