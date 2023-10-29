import AsyncSelect from "react-select/async";
import Select from "react-select";
import {values as VehicleTypeValues, VehicleType} from "../../../constants/VehicleType.ts";
import Person from "../../../entities/Person.ts";
import Insurance from "../../../entities/Insurance.ts";
import {FormEvent, useState} from "react";
import Vehicle from "../../../entities/Vehicle.ts";
import VehicleOwner from "../../../entities/VehicleOwner.ts";
import Response from "../../../api/Response.ts";

const resolveVehicleTypes = (): SelectValueOptions[] => VehicleTypeValues.map(type => ({
  value: VehicleType[type],
  label: type.toString()
}));

const resolveOwners = async (input: string): Promise<SelectValueOptions[]> => {
  return fetch('http://localhost:8080/api/people')
  .then(response => response.json())
  .then<SelectValueOptions[]>((data: Person[]) => data
    // TODO: should be filtered on the server side in the future by passing input as a query parameter
    .filter(person => person.name.toLowerCase().includes(input.toLowerCase()))
    .map(person => ({
      value: person?.id?.toString() ?? "N/A",
      label: person.name
    })));
}

const resolveInsurances = async (): Promise<SelectValueOptions[]> => {
  return fetch('http://localhost:8080/api/vehicles')
  .then(response => response.json())
  .then<SelectValueOptions[]>((data: Insurance[]) => data
    .map(insurance => ({
      value: insurance.dateExpiration,
      label: insurance.id?.toString() ?? "N/A"
    })));
}

const resolveSubmit = (isCreate: boolean, vehicle: Vehicle) => {
  fetch('http://localhost:8080/api/vehicles', {
    method: isCreate ? 'POST' : 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vehicle)
  })
  .then<Response<undefined>>(response => response.ok ? { success: true } : response.json())
  .then(data => {
    if (!data?.success ?? false) {
      console.error("Error: " + data.message);

      return;
    }
  });
}

const VehicleManageForm = () => {
  const [vehicle, setVehicle] = useState<Vehicle>({
    color: "",
    crashes: [],
    dateManufacture: "",
    id: undefined,
    insurances: [],
    owners: [],
    plate: "",
    type: undefined
  });

  const onChangeText = (event: FormEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget;

    setVehicle({
      ...vehicle,
      [name]: value
    });
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    resolveSubmit(true, vehicle);
  }

  return (
      <div className="container">
        <h4>Vehicle Management</h4>

        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label>Manufacture Date</label>

            <input name="dateManufacture" className="form-control" type="datetime-local"
                   placeholder="Manufacture Date" value={vehicle.dateManufacture}
                   onChange={onChangeText}/>
          </div>

          <div className="form-group mb-3">
            <label>Plate</label>

            <input name="plate" className="form-control" type="text"
                   placeholder="Plate" value={vehicle.plate} onChange={onChangeText}/>
          </div>

          <div className="form-group mb-3">
            <label>Color</label>

            <input name="color" className="form-control" type="text"
                   placeholder="Color" value={vehicle.color} onChange={onChangeText}/>
          </div>

          <div className="form-group mb-3">
            <label>Type</label>

            <Select isSearchable isClearable options={resolveVehicleTypes()}
                    noOptionsMessage={() => "Empty"}
                    onChange={(e) => setVehicle({
                      ...vehicle,
                      type: e !== null
                          ? VehicleType[e!.value as keyof typeof VehicleType]
                          : undefined
                    })}/>
          </div>

          <div className="form-group mb-3">
            <label>Owners</label>

            <div>
              {vehicle.owners.map((owner: VehicleOwner) => <li>Name: {owner.person.name} |
                From: {owner.dateAcquisition} | To: {owner.dateDisposal}</li>)}
            </div>

            <AsyncSelect cacheOptions defaultOptions loadingMessage={() => "Loading..."}
                         loadOptions={resolveOwners} noOptionsMessage={() => "Empty"}/>
          </div>

          <div className="form-group mb-3">
            <label>Insurances</label>

            <div>
              {vehicle.insurances.map((insurance: Insurance) => <li
                  key={"insurance-" + insurance.id}>From: {insurance.dateInitialization} |
                To: {insurance.dateExpiration}
                <button className="btn btn-sm btn-outline-danger">X</button>
              </li>)}
            </div>

            <AsyncSelect cacheOptions defaultOptions loadingMessage={() => "Loading..."}
                         loadOptions={resolveInsurances} noOptionsMessage={() => "Empty"}/>
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

export default VehicleManageForm;