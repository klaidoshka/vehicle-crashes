import { Fragment, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';

import { zodResolver } from '@hookform/resolvers/zod';

import IManageFormProperties from '../../../api/IManageFormProperties.ts';
import ValuedOptions from '../../../api/options/ValuedOptions.ts';
import { VehicleType } from '../../../constants/VehicleType.ts';
import VehicleViewModifiable, {
    vehicleViewModifiableSchema, VehicleViewModifiableSchema
} from '../../../dto/VehicleViewModifiable.ts';
import { resolveDateString } from '../../../services/Dates.ts';
import {
    createVehicle, mapSchemaToEntity, updateVehicle
} from '../../../services/VehicleService.ts';

const VehicleManageForm = ({
  callback,
  element,
  isEdit = false
}: IManageFormProperties<VehicleViewModifiable>) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<VehicleViewModifiableSchema>({
    defaultValues: {
      crashes: [],
      insurances: [],
      owners: []
    },
    resolver: zodResolver(vehicleViewModifiableSchema)
  });

  const {
    fields: insuranceFields,
    remove: insuranceRemove,
    append: insuranceAppend
  } = useFieldArray({
    name: "insurances",
    control: control
  });

  useEffect(() => {
    if (!element) {
      return;
    }

    reset({
      ...element,
      owners: element.owners.map((o) => ({
        ...o,
        dateDisposal: (o.dateDisposal ?? "") === "" ? undefined : o.dateDisposal
      }))
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
      <h2 className='text-center'>Vehicle Management</h2>

      <form
        className='overflow-scroll p-3'
        onSubmit={(e) => {
          const { color, dateManufacture, owners, plate, type } = getValues();

          owners.forEach((o) => {
            o.vehicle = {
              ...o.vehicle,
              color: color,
              dateManufacture: dateManufacture,
              plate: plate,
              type: type
            };
          });

          handleSubmit(onSubmit)(e);
        }}
        style={{ minWidth: 400, maxHeight: 600 }}
      >
        <div className='form-group mb-3'>
          <label htmlFor={"dateManufacture"}>Manufacture Date</label>

          <input
            {...register("dateManufacture")}
            className='form-control'
            placeholder='Manufacture Date'
            type='date'
          />

          <p className='text-danger small'>{errors.dateManufacture?.message}</p>
        </div>

        <div className='form-group mb-3'>
          <label htmlFor={"plate"}>Plate</label>

          <input {...register("plate")} className='form-control' placeholder='Plate' type='text' />

          <p className='text-danger small'>{errors.plate?.message}</p>
        </div>

        <div className='form-group mb-3'>
          <label htmlFor={"color"}>Color</label>

          <input {...register("color")} className='form-control' placeholder='Color' type='text' />

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

          {(insuranceFields.length > 0 && (
            <div className='table-responsive'>
              <table className='table table-sm table-hover table-striped'>
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>Expire Date</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {insuranceFields.map((insurance, index) => (
                    <Fragment key={crypto.randomUUID()}>
                      <tr>
                        <td>
                          <input
                            {...register(`insurances.${index}.dateInitialization`)}
                            className='form-control w-100'
                            defaultChecked
                            defaultValue={resolveDateString(insurance.dateInitialization)}
                            type='date'
                          />
                        </td>

                        <td>
                          <input
                            {...register(`insurances.${index}.dateExpiration`)}
                            className='form-control w-100'
                            defaultChecked
                            defaultValue={resolveDateString(insurance.dateExpiration)}
                            type='date'
                          />
                        </td>

                        <td>
                          <button
                            type='button'
                            className='btn btn-sm btn-outline-danger w-100 mt-1'
                            onClick={() => insuranceRemove(index)}
                          >
                            ❌
                          </button>
                        </td>
                      </tr>

                      {errors.insurances?.[index] && (
                        <tr>
                          <td>
                            <p className='text-danger small'>
                              {errors.insurances?.[index]?.dateInitialization?.message}
                            </p>
                          </td>
                          <td className='text-center'>
                            <p className='text-danger small'>
                              {errors.insurances?.[index]?.dateExpiration?.message ||
                                errors.insurances?.[index]?.root?.message}
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
          )) || <p className='text-black-50'>This vehicle has no insurances</p>}

          <div className='d-flex justify-content-center align-items-center mt-3'>
            <button
              className='btn btn-sm btn-outline-success 50'
              onClick={() => {
                const dateStart = new Date();
                const dateExpire = new Date();

                dateExpire.setFullYear(dateStart.getFullYear() + 1);

                insuranceAppend({
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

        <button disabled={isSubmitting} className='mt-3 btn btn-sm btn-success w-100' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

const vehicleTypeOptions: ValuedOptions<VehicleType>[] = Object.values(VehicleType)
  .filter((v: any) => isNaN(v))
  .map((v) => ({
    value: v as VehicleType,
    label: v as string
  }));

export default VehicleManageForm;
