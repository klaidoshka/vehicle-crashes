import PersonViewModifiable, {
  personViewModifiableSchema,
  PersonViewModifiableSchema
} from "../../../dto/PersonViewModifiable.ts";
import IManageFormProperties from "../../../api/IManageFormProperties.ts";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  createPerson,
  editPerson,
  getPerson,
  mapSchemaToEntity
} from "../../../services/PersonService.ts";
import {Gender} from "../../../constants/Gender.ts";
import AsyncSelect from "react-select/async";
import {getVehicle, getVehicles} from "../../../services/VehicleService.ts";
import ValuedOptions from "../../../api/options/ValuedOptions.ts";
import {Fragment, useEffect, useState} from "react";
import {VehicleType} from "../../../constants/VehicleType.ts";
import VehicleViewModifiable from "../../../dto/VehicleViewModifiable.ts";

const PersonManageForm = ({
                            callback,
                            element,
                            isEdit = false
                          }: IManageFormProperties<PersonViewModifiable>) => {
  const [isLoadingElement, setLoadingElement] = useState(false);

  const {
    control,
    formState: {errors, isSubmitting, isDirty},
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

  useEffect(() => {
    if (!element) {
      return;
    }

    setLoadingElement(true);

    const initiate = async (): Promise<PersonViewModifiableSchema> => {
      const vehiclesOwnedPromises = element.vehiclesOwned
      .filter((vo) => vo.personId !== undefined && vo.vehicleId !== undefined)
      .map(async (vo) => ({
        ...vo,
        dateAcquisition: new Date(vo.dateAcquisition),
        dateDisposal: vo.dateDisposal ? new Date(vo.dateDisposal) : undefined,
        person: (await getPerson({id: vo.personId!}))!,
        vehicle: (await getVehicle({id: vo.vehicleId!}))!,
      }));

      const vehiclesOwned = await Promise.all(vehiclesOwnedPromises);

      return {
        ...element,
        dateBirth: new Date(element.dateBirth),
        vehiclesOwned: vehiclesOwned.map((vo) => ({
          ...vo,
          person: {
            ...vo.person,
            dateBirth: new Date(vo.person.dateBirth)
          },
          vehicle: {
            ...vo.vehicle,
            dateManufacture: new Date(vo.vehicle.dateManufacture)
          }
        }))
      };
    };

    initiate().then((personSchema) => {
      reset(personSchema);

      setLoadingElement(false);
    });
  }, []);

  const resolveSubmit = async (data: PersonViewModifiableSchema) => {
    if (!isDirty) {
      return;
    }

    const entity = mapSchemaToEntity(data);

    if (isEdit) {
      await editPerson({
        element: entity,
        onSuccess: () => {
          alert("Person edited successfully!");

          callback?.(entity);

          reset(data);
        }
      })
    } else {
      await createPerson({
        element: entity,
        onSuccess: () => {
          alert("Person created successfully!");

          callback?.(entity);

          reset();
        }
      })
    }
  }

  return (
      <div className="container">
        <h4 className="text-center">Person Management</h4>

        {isLoadingElement && <p>Loading data...</p> ||
            <form
                className="overflow-scroll p-3"
                onSubmit={handleSubmit(resolveSubmit)}
                style={{minWidth: 400, maxHeight: 600}}
            >

              <div className="form-group mb-3">
                <label htmlFor={"name"}>Name</label>

                <input
                    {...register("name")}
                    className="form-control"
                    placeholder="Name"
                    type="text"
                />

                <p className="text-danger small">
                  {errors.name?.message}
                </p>
              </div>

              <div className="form-group mb-3">
                <label htmlFor={"dateBirth"}>Birth Date</label>

                <input
                    {...register("dateBirth")}
                    className="form-control"
                    defaultChecked
                    defaultValue={control._defaultValues.dateBirth?.toISOString().substring(0, 10)}
                    placeholder="Birth Date"
                    type="date"
                />

                <p className="text-danger small">
                  {errors.dateBirth?.message}
                </p>
              </div>

              <div className="form-group mb-3">
                <label htmlFor={"gender"}>Gender</label>

                <Controller
                    control={control}
                    name={"gender"}
                    defaultValue={Gender.MALE}
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
                              defaultChecked
                              defaultValue={isNaN(field.value) ? Gender[field.value] : field.value}
                              onChange={e => field.onChange(Number(e.currentTarget.value))}
                          >
                            {Object.values(Gender)
                            .filter((v: any) => isNaN(v))
                            .map(v => ({
                              value: Gender[v as keyof typeof Gender],
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
                  {errors.gender?.message}
                </p>
              </div>

              <div className={"form-group mb-3"}>
                <label htmlFor={"vehiclesOwned"}>Owned Vehicles</label>

                <Controller
                    control={control}
                    name={"vehiclesOwned"}
                    render={({field}) => (
                        <>
                          {field.value.length > 0 && (
                              <div className="table-responsive">
                                <table className="table table-sm table-hover table-striped">
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
                                  {field.value.map((v, index) => (
                                      <Fragment key={crypto.randomUUID()}>
                                        <tr key={v.vehicle.plate}>
                                          <td>{v.vehicle.plate}</td>

                                          <td>{v.vehicle.type}</td>

                                          <td>{new Date(v.vehicle.dateManufacture).getFullYear()}</td>

                                          <td>
                                            <input
                                                {...register(`vehiclesOwned.${index}.dateAcquisition`)}
                                                className="form-control"
                                                defaultChecked
                                                defaultValue={new Date(v.dateAcquisition).toISOString().substring(0, 10)}
                                                onChange={e => v.dateAcquisition = e.currentTarget.value ? new Date(e.currentTarget.value) : v.dateAcquisition}
                                                type="date"
                                            />
                                          </td>

                                          <td>
                                            <input
                                                {...register(`vehiclesOwned.${index}.dateDisposal`)}
                                                className="form-control"
                                                defaultChecked
                                                defaultValue={v.dateDisposal ? new Date(v.dateDisposal).toISOString().substring(0, 10) : undefined}
                                                onChange={e => v.dateDisposal = e.currentTarget.value ? new Date(e.currentTarget.value) : v.dateDisposal}
                                                type="date"
                                            />
                                          </td>

                                          <td>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
                                                type="button"
                                            >
                                              ❌
                                            </button>
                                          </td>
                                        </tr>

                                        {errors.vehiclesOwned?.[index] &&
                                            <tr>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td className="text-center">
                                                <p className="text-danger small">
                                                  {errors.vehiclesOwned?.[index]?.dateAcquisition?.message}
                                                </p>
                                              </td>
                                              <td className="text-center">
                                                <p className="text-danger small">
                                                  {errors.vehiclesOwned?.[index]?.dateDisposal?.message}
                                                </p>
                                              </td>
                                              <td></td>
                                            </tr>
                                        }
                                      </Fragment>
                                  ))}
                                  </tbody>
                                </table>
                              </div>
                          ) || <p className="text-black-50">
                            This person has no vehicles registered
                          </p>
                          }

                          <AsyncSelect
                              closeMenuOnSelect={true}
                              defaultOptions
                              hideSelectedOptions={true}
                              isClearable
                              isOptionSelected={(option: any) => {
                                return field.value.some((vo) => vo.vehicle.plate === option.value.plate);
                              }}
                              loadingMessage={() => "Loading vehicles data..."}
                              loadOptions={fetchVehicles}
                              noOptionsMessage={() => "No vehicles found"}
                              onChange={(v) => {
                                if (v) {
                                  const vehicle: VehicleViewModifiable = v.value;

                                  field.onChange([
                                    ...field.value,
                                    {
                                      vehicle: {
                                        ...vehicle,
                                        owners: vehicle.owners.map((o) => o.id),
                                        insurances: vehicle.insurances.map((i) => i.id)
                                      },
                                      dateAcquisition: new Date(),
                                      dateDisposal: undefined,
                                      person: getValues(),
                                    }
                                  ]);
                                }
                              }}
                              placeholder={"Add an owned vehicle..."}
                              value={null}
                              filterOption={(option, rawInput) =>
                                  option.label.toLowerCase().includes(rawInput.toLowerCase())}
                          />
                        </>
                    )}
                />

                <p className={"text-danger small"}>
                  {errors.vehiclesOwned?.message}
                </p>
              </div>

              <button
                  disabled={isSubmitting}
                  className="mt-3 btn btn-sm btn-success w-100"
                  type="submit"
              >
                Submit
              </button>
            </form>
        }
      </div>
  );
}

const fetchVehicles = async (inputValue: string): Promise<ValuedOptions<VehicleViewModifiable>[]> => {
  return getVehicles({
    params: {
      plate: inputValue
    }
  })
  .then((vehicles) => vehicles
  .map(v => ({
    value: v,
    label: `${VehicleType[v.type]} - ${v.plate}`
  })))
  .catch(() => []);
}

export default PersonManageForm;