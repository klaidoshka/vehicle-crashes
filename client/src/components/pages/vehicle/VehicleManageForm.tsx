import {useForm} from "react-hook-form";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import {VehicleType} from "../../../constants/VehicleType.ts";
import {dummyPeople} from "../../../entities/IPerson.ts";

const resolveOptions = (input: string) => {
  // return fetch(`http://localhost:8080/api/vehicle?input=${input}`).then(response => response.json())
  return new Promise<any>(() => dummyPeople
      .filter(person => person.name.toLowerCase().includes(input.toLowerCase()))
      .map(person => ({value: person.id, label: person.name}))
  );
}

const onSubmit = (data: any) => console.log(data);

const vehicleTypes = Object.keys(VehicleType).map(key => ({value: key, label: VehicleType[key]}));

export default () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  errors.root?.message !== null && console.log(errors);

  return (
      <div className="container">
        <h4>Vehicle Management</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label>Manufacture Date</label>

            <input className="form-control"
                   type="datetime-local"
                   placeholder="Manufacture Date"
                   {...register("Manufacture Date", {required: true})} />
          </div>

          <div className="form-group mb-3">
            <label>Plate</label>

            <input className="form-control"
                   type="text"
                   placeholder="Plate"
                   {...register("Plate", {required: true, pattern: RegExp("^[\w\d-]+$")})} />
          </div>

          <div className="form-group mb-3">
            <label>Color</label>

            <input className="form-control"
                   type="text"
                   placeholder="Color"
                   {...register("Color", {required: true, pattern: RegExp("^\w+$")})} />
          </div>

          <div className="form-group mb-3">
            <label>Type</label>

            <Select isSearchable isClearable options={vehicleTypes}/>
          </div>

          <div className="form-group mb-5">
            <label>Owner (Optional)</label>

            <AsyncSelect
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