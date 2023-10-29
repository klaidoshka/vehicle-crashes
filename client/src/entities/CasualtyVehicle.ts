import Crash from "./Crash.ts";
import Vehicle from "./Vehicle.ts";

interface CasualtyVehicle {
  id: number;
  crash: Crash;
  vehicle: Vehicle;
}

export default CasualtyVehicle;