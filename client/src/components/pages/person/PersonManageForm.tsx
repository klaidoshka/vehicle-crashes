import {useForm} from "react-hook-form";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import {Gender} from "../../../constants/Gender.ts";
import {dummyPeople} from "../../../entities/IPerson.ts";

const resolveOptions = (ownerId: string) => {
  // return fetch(`http://localhost:8080/api/vehicle?owner=${input}`).then(response => response.json())
  return new Promise<any>(() => dummyPeople
      .filter(person => person.name.toLowerCase().includes(ownerId.toLowerCase()))
      .map(person => person.vehicles?.map(vehicle => ({value: vehicle.id, label: vehicle.plate})) ?? [])
  );
}

const onSubmit = (data: any) => console.log(data);

const genders = [
  // @ts-ignore
  {value: Gender.MALE, label: Gender[Gender.MALE]},
  // @ts-ignore
  {value: Gender.FEMALE, label: Gender[Gender.FEMALE]},
  // @ts-ignore
  {value: Gender.OTHER, label: Gender[Gender.OTHER]}
];

export default () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  errors.root?.message !== null && console.log(errors);

  // @ts-ignore
  return (
      <div className="container">
        <h4>Person Management</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label>Name</label>

            <input
                className="form-control"
                type="text"
                placeholder="Name"
                {...register("Name", {required: true})} />
          </div>

          <div className="form-group mb-3">
            <label>Date of Birth</label>

            <input
                className="form-control"
                type="datetime-local"
                placeholder="Birth Date"
                {...register("Birth Date", {required: true})} />
          </div>

          <div className="form-group mb-3">
            <label>Gender</label>

            <Select isSearchable isClearable options={genders}/>
          </div>

          <div className="form-group mb-5">
            <label>Owned Vehicles</label>

            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={resolveOptions}/>
          </div>

          <button
              className="btn btn-sm btn-success w-100"
              type="submit">
            Submit
          </button>
        </form>
      </div>
  );
}