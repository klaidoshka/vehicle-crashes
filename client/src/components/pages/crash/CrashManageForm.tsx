import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

import IManageFormProperties from '../../../api/IManageFormProperties.ts';
import ValuedOptions from '../../../api/options/ValuedOptions.ts';
import { Gender } from '../../../constants/Gender.ts';
import { VehicleType } from '../../../constants/VehicleType.ts';
import CrashView, { CrashViewSchema } from '../../../dto/CrashView.ts';
import PersonView from '../../../dto/PersonView.ts';
import VehicleView from '../../../dto/VehicleView.ts';
import { createCrash, mapSchemaToEntity, updateCrash } from '../../../services/CrashService.ts';
import { getPeople } from '../../../services/PersonService.ts';
import { getVehicles } from '../../../services/VehicleService.ts';

const CrashManageForm = ({ callback, element, isEdit }: IManageFormProperties<CrashView>) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<CrashViewSchema>({
    defaultValues: {
      casualtiesPeople: [],
      casualtiesVehicle: []
    }
  });

  const {
    fields: casualtiesPeopleFields,
    append: casualtiesPeopleAppend,
    remove: casualtiesPeopleRemove
  } = useFieldArray({
    control: control,
    name: "casualtiesPeople"
  });

  const {
    fields: casualtiesVehicleFields,
    append: casualtiesVehicleAppend,
    remove: casualtiesVehicleRemove
  } = useFieldArray({
    control: control,
    name: "casualtiesVehicle"
  });

  useEffect(() => {
    if (!element) {
      return;
    }

    reset(element);
  }, []);

  const onSubmit = async (data: CrashViewSchema) => {
    if (!isDirty) {
      return;
    }

    const entity: CrashView = mapSchemaToEntity(data);

    if (isEdit) {
      await updateCrash({
        id: element!.id!,
        element: entity,
        onSuccess: () => {
          alert("Crash edited successfully!");

          callback?.(entity);

          reset(data);
        },
        onError: () => {
          alert("An error occurred while editing the person!");
        }
      });
    } else {
      await createCrash({
        element: entity,
        onSuccess: () => {
          alert("Crash created successfully!");

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
      <h2 className='text-center'>Crash Management</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group mb-3'>
          <label htmlFor='date'>Date</label>

          <input
            className='form-control'
            type='datetime-local'
            placeholder='Date'
            {...register("dateCrash")}
          />
        </div>

        <div className='form-group mb-3'>
          <label htmlFor='damageCost'>Damage Cost / €</label>

          <input
            className='form-control'
            type='number'
            placeholder='Damage Cost'
            {...register("damageCost")}
          />
        </div>

        <div className={"form-group mb-3"}>
          <label htmlFor={"casualtiesPeople"}>People Casualties</label>

          {(casualtiesPeopleFields.length > 0 && (
            <div className='table-responsive'>
              <table className='table table-sm table-hover table-striped'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Birth Date</th>
                    <th>Gender</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {casualtiesPeopleFields.map((p, index) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{new Date(p.dateBirth).toISOString().substring(0, 10)}</td>
                      <td>{!isNaN(p.gender) ? Gender[p.gender] : p.gender}</td>

                      <td className='d-flex justify-content-end'>
                        <button
                          className='btn btn-sm btn-outline-danger'
                          onClick={() => casualtiesPeopleRemove(index)}
                          type='button'
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )) || <p className='text-black-50'>This crash has no people casualties</p>}

          <AsyncSelect
            className='mt-3'
            closeMenuOnSelect={true}
            defaultOptions
            hideSelectedOptions={true}
            isClearable
            isOptionSelected={(option: any) => {
              return casualtiesPeopleFields.some((v) => v.name === option.value.name);
            }}
            loadingMessage={() => "Loading people data..."}
            loadOptions={fetchPersonOptions}
            noOptionsMessage={() => "No people found"}
            onChange={(p) => {
              if (p) {
                casualtiesPeopleAppend(p.value);
              }
            }}
            placeholder={"Add a people casualty..."}
            value={null}
            filterOption={(option, rawInput) =>
              option.label.toLowerCase().includes(rawInput.toLowerCase())
            }
          />

          <p className={"text-danger small"}>{errors.casualtiesPeople?.message}</p>
        </div>

        <div className={"form-group mb-3"}>
          <label htmlFor={"casualtiesVehicle"}>Vehicle Casualties</label>

          {(casualtiesVehicleFields.length > 0 && (
            <div className='table-responsive'>
              <table className='table table-sm table-hover table-striped'>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Plate</th>
                    <th>Year</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {casualtiesVehicleFields.map((v, index) => (
                    <tr key={v.id}>
                      <td>{!isNaN(v.type) ? VehicleType[v.type] : v.type}</td>
                      <td>{v.plate}</td>
                      <td>{new Date(v.dateManufacture).getFullYear()}</td>

                      <td className='d-flex justify-content-end'>
                        <button
                          className='btn btn-sm btn-outline-danger'
                          onClick={() => casualtiesVehicleRemove(index)}
                          type='button'
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )) || <p className='text-black-50'>This crash has no vehicle casualties</p>}

          <AsyncSelect
            className='mt-3'
            closeMenuOnSelect={true}
            defaultOptions
            hideSelectedOptions={true}
            isClearable
            isOptionSelected={(option: any) => {
              return casualtiesVehicleFields.some((v) => v.plate === option.value.plate);
            }}
            loadingMessage={() => "Loading vehicles data..."}
            loadOptions={fetchVehicleOptions}
            noOptionsMessage={() => "No vehicles found"}
            onChange={(v) => {
              if (v) {
                casualtiesVehicleAppend(v.value);
              }
            }}
            placeholder={"Add a vehicle casualty..."}
            value={null}
            filterOption={(option, rawInput) =>
              option.label.toLowerCase().includes(rawInput.toLowerCase())
            }
          />

          <p className={"text-danger small"}>{errors.casualtiesVehicle?.message}</p>
        </div>

        <button className='btn btn-sm btn-success w-100 mt-3' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

const fetchVehicleOptions = async (inputValue: string): Promise<ValuedOptions<VehicleView>[]> => {
  return getVehicles({
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

const fetchPersonOptions = async (inputValue: string): Promise<ValuedOptions<PersonView>[]> => {
  return getPeople({
    params: {
      name: inputValue
    }
  })
    .then((people) =>
      people.map((p) => ({
        value: p,
        label: `${p.name} - ${Gender[p.gender]}`
      }))
    )
    .catch(() => []);
};

export default CrashManageForm;
