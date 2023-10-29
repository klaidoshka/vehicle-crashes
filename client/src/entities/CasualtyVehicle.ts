import Crash from "./Crash.ts";
import Vehicle from "./Vehicle.ts";

interface ICasualtyVehicle {
  id: number;
  crash: Crash;
  vehicle: Vehicle;
}

class CasualtyVehicle implements ICasualtyVehicle {
  public id: number;
  public crash: Crash;
  public vehicle: Vehicle;

  public constructor(properties: ICasualtyVehicle) {
    this.id = properties.id;
    this.crash = properties.crash;
    this.vehicle = properties.vehicle;
  }
}

export default CasualtyVehicle;