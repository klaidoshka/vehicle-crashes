import {VehicleType} from "../../../constants/VehicleType.ts";
import Vehicle, {
  convertToSchemaObject,
  convertToVehicleObject,
  VehicleFormSchema,
  VehicleFormSchemaType
} from "../../../entities/Vehicle.ts";
import IManageFormProperties from "../../../api/IManageFormProperties.ts";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import AsyncSelect from "react-select/async";
import {Fragment} from "react";
import {createVehicle, editVehicle} from "../../../services/VehicleService.ts";

const VehicleManageForm = ({
                             callback,
                             element,
                             isEdit = false
                           }: IManageFormProperties<Vehicle>) => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
    watch
  } = useForm<VehicleFormSchemaType>({
    defaultValues: element && convertToSchemaObject(element),
    resolver: zodResolver(VehicleFormSchema)
  });

  const {remove, append} = useFieldArray({
    name: "insurances",
    control: control
  });

  const resolveSubmit = async (data: VehicleFormSchemaType) => {
    const vehicle = convertToVehicleObject(data);
    if (isEdit) {
      await editVehicle({
        element: vehicle,
        onSuccess: () => {
          alert("Vehicle edited successfully!");

          callback?.(vehicle);

          reset(data);
        }
      })
    } else {
      await createVehicle({
        element: vehicle,
        onSuccess: () => {
          alert("Vehicle created successfully!");

          callback?.(vehicle);

          reset();
        }
      })
    }
  }

  return (
      <div className="container">
        <h4 className="text-center">Vehicle Management</h4>

        <form
            className="overflow-scroll p-3"
            onSubmit={handleSubmit(resolveSubmit)}
            style={{minWidth: 400, maxHeight: 600}}
        >
          <div className="form-group mb-3">
            <label htmlFor={"dateManufacture"}>Manufacture Date</label>

            <input
                {...register("dateManufacture")}
                className="form-control"
                defaultChecked
                defaultValue={control._defaultValues.dateManufacture?.toISOString().substring(0, 10)}
                placeholder="Manufacture Date"
                type="date"
            />

            <p className="text-danger small">
              {errors.dateManufacture?.message}
            </p>
          </div>

          <div className="form-group mb-3">
            <label htmlFor={"plate"}>Plate</label>

            <input
                {...register("plate")}
                className="form-control"
                placeholder="Plate"
                type="text"
            />

            <p className="text-danger small">
              {errors.plate?.message}
            </p>
          </div>

          <div className="form-group mb-3">
            <label htmlFor={"color"}>Color</label>

            <input
                {...register("color")}
                className="form-control"
                placeholder="Color"
                type="text"
            />

            <p className="text-danger small">
              {errors.color?.message}
            </p>
          </div>

          <div className="form-group mb-3">
            <label htmlFor={"type"}>Type</label>

            <Controller
                name="type"
                control={control}
                render={({field}) => (
                    <div style={{position: 'relative'}}>
                      <span style={{
                        position: 'absolute', right: '10px', top: '50%',
                        transform: 'translateY(-50%)', fontSize: '14px',
                        color: '#555', pointerEvents: 'none'
                      }}
                      >
                        ▼
                      </span>

                      <select
                          className="form-control"
                          onChange={e => field.onChange(Number(e.currentTarget.value))}
                          value={isNaN(field.value) ? VehicleType[field.value] : field.value}
                      >
                        {Object.values(VehicleType)
                        .filter((v: any) => isNaN(v))
                        .map(v => ({
                          value: VehicleType[v as keyof typeof VehicleType],
                          label: v
                        }))
                        .map(o => (
                            <option
                                key={o.label + "-" + o.value}
                                value={o.value}
                                label={`${o.label}`}
                            >
                            </option>
                        ))}
                      </select>
                    </div>
                )}
            />

            <p className="text-danger small">
              {errors.type?.message}
            </p>
          </div>

          <div className="form-group mb-3">
            <label htmlFor={"owners"}>Owners</label>

            <Controller
                name={"owners"}
                control={control}
                render={({field}) =>
                    <AsyncSelect
                        {...field}
                        cacheOptions
                        defaultOptions
                        loadingMessage={() => "Loading..."}
                        // loadOptions={resolvePeople}
                        noOptionsMessage={() => "Empty"}
                        closeMenuOnSelect
                    />
                }
            />

            <p className="text-danger small">
              {errors.owners?.message}
            </p>
          </div>

          <div className="form-group mb-3">
            <label>Insurances</label>

            {(watch("insurances")?.length ?? 0) > 0 &&
                <table>
                  <thead>
                  <tr>
                    <th className="text-center" style={{width: "15%"}}>Active</th>
                    <th className="text-center" style={{width: "35%"}}>Start Date</th>
                    <th className="text-center" style={{width: "35%"}}>Expire Date</th>
                    <th className="text-center" style={{width: "15%"}}></th>
                  </tr>
                  </thead>

                  <tbody>
                  {watch("insurances")?.map((insurance, index) => (
                      <Fragment key={crypto.randomUUID()}>
                        <tr>
                          <td className="text-center" style={{width: "15%"}}>
                            {isTodayOrGreater(new Date(insurance.dateExpiration)) ? '✅' : '➖'}
                          </td>

                          <td className="text-center" style={{width: "35%"}}>
                            <input
                                {...register(`insurances.${index}.dateInitialization`)}
                                className="form-control w-100"
                                type="date"
                            />
                          </td>

                          <td className="text-center" style={{width: "35%"}}>
                            <input
                                {...register(`insurances.${index}.dateExpiration`)}
                                className="form-control w-100"
                                type="date"
                            />
                          </td>

                          <td className="text-center" style={{width: "35%"}}>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger w-100 text-center"
                                onClick={() => remove(index)}
                            >
                              ❌
                            </button>
                          </td>
                        </tr>

                        {errors.insurances?.[index] &&
                            <tr>
                              <td className="text-center" style={{width: "15%"}}></td>
                              <td className="text-center" style={{width: "35%"}}>
                                <p className="text-danger small">
                                  {errors.insurances?.[index]?.dateInitialization?.message}
                                </p>
                              </td>
                              <td className="text-center" style={{width: "35%"}}>
                                <p className="text-danger small">
                                  {errors.insurances?.[index]?.dateExpiration?.message ||
                                      errors.insurances?.[index]?.root?.message}
                                </p>
                              </td>
                              <td className="text-center" style={{width: "15%"}}></td>
                            </tr>
                        }
                      </Fragment>
                  ))}
                  </tbody>
                </table>
            }

            <div className="d-flex justify-content-center align-items-center mt-3">
              <button
                  disabled={(watch("insurances")?.findIndex((insurance) =>
                      isTodayOrGreater(new Date(insurance.dateExpiration))) ?? -1) !== -1}
                  className="btn btn-sm btn-outline-success 50"
                  type="button"
                  onClick={() => {
                    const dateStart = new Date();
                    const dateExpire = new Date();

                    dateExpire.setFullYear(dateStart.getFullYear() + 1);

                    append({
                      // requires 'as any' because of the type mismatch
                      dateInitialization: dateStart.toISOString().substring(0, 10) as any,
                      dateExpiration: dateExpire.toISOString().substring(0, 10) as any
                    });
                  }}
              >
                ➕
              </button>
            </div>
          </div>

          <button
              disabled={isSubmitting}
              className="mt-3 btn btn-sm btn-success w-100"
              type="submit"
          >
            Submit
          </button>
        </form>
      </div>
  );
}

const isTodayOrGreater = (date: Date): boolean => {
  const today = new Date();

  return date.toDateString() === today.toDateString() || date > today;
}

export default VehicleManageForm;