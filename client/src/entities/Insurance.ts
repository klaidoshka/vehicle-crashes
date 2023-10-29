import Vehicle from "./Vehicle.ts";

interface Insurance {
  id?: number;
  dateInitialization: string;
  dateExpiration: string;
  vehicle: Vehicle;
}

export default Insurance;