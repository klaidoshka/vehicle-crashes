import Person from "./Person.ts";
import Vehicle from "./Vehicle.ts";

interface IVehicleOwner {
  id: number;
  dateAcquisition: string;
  dateDisposal: string;
  person: Person;
  vehicle: Vehicle;
}

class VehicleOwner implements IVehicleOwner {

  public dateAcquisition: string;
  public dateDisposal: string;
  public id: number;
  public person: Person;
  public vehicle: Vehicle;

  public constructor(properties: IVehicleOwner) {
    this.dateAcquisition = properties.dateAcquisition;
    this.dateDisposal = properties.dateDisposal;
    this.id = properties.id;
    this.person = properties.person;
    this.vehicle = properties.vehicle;
  }
}

export default VehicleOwner;