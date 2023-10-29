import Person from "./Person.ts";
import Vehicle from "./Vehicle.ts";

interface VehicleOwner {
  id: number;
  dateAcquisition: string;
  dateDisposal: string;
  person: Person;
  vehicle: Vehicle;
}

export default VehicleOwner;