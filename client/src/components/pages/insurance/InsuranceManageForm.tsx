import {useForm} from "react-hook-form";
import AsyncSelect from 'react-select/async';
import {dummyVehicles} from "../../../entities/IVehicle.ts";

const resolveOptions = (input: string) => {
  // return fetch(`http://localhost:8080/api/vehicles?input=${input}`).then(response => response.json())
  return new Promise<any>(() => dummyVehicles
      .filter(vehicle => vehicle.plate.toLowerCase().includes(input.toLowerCase()))
      .map(vehicle => ({value: vehicle.id, label: vehicle.plate}))
  );
}

const onSubmit = (data: any) => console.log(data);

export default () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  errors.root?.message !== null && console.log(errors);

  return (
      <div className="container">
        <h4>Insurance Management</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label>Begin Date</label>

            <input className="form-control"
                   type="datetime-local"
                   placeholder="Begin Date"
                   {...register("Begin Date", {required: true})} />
          </div>

          <div className="form-group mb-3">
            <label>End Date</label>

            <input className="form-control"
                   type="datetime-local"
                   placeholder="End Date"
                   {...register("End Date", {required: true})} />
          </div>

          <div className="form-group mb-5">
            <label>Vehicle</label>

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