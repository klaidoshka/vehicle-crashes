import {VehicleType} from "../constants/VehicleType.ts";
import Insurance from "./Insurance.ts";
import Crash from "./Crash.ts";
import VehicleOwner from "./VehicleOwner.ts";

interface Vehicle {
  id?: number;
  color: string;
  crashes: Crash[];
  dateManufacture: string;
  insurances: Insurance[];
  owners: VehicleOwner[];
  plate: string;
  type?: VehicleType;
}

export default Vehicle;