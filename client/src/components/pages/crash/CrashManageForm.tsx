import {useForm} from "react-hook-form";
import AsyncSelect from "react-select/async";

const resolveOptions = () => {
  // return fetch(`http://localhost:8080/api/person?input=${input}`).then(response => response.json())
  return new Promise<any>(() => []);
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
        <h4>Crash Management</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label>Date</label>

            <input className="form-control"
                   type="datetime-local"
                   placeholder="Date"
                   {...register("Begin Date", {required: true})} />
          </div>

          <div className="form-group mb-3">
            <label>Damage Cost (Eur / €)</label>

            <input className="form-control"
                   type="number"
                   placeholder="Damage Cost"
                   {...register("End Date", {required: true, pattern: RegExp("\d+")})} />
          </div>

          <div className="form-group mb-5">
            <label>Casualties</label>

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