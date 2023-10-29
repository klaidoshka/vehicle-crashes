import {Gender} from "../constants/Gender.ts";
import Vehicle from "./Vehicle.ts";
import Crash from "./Crash.ts";

interface Person {
  id: number;
  crashes: Crash[];
  dateBirth: string;
  gender: Gender;
  name: string;
  vehiclesOwned: Vehicle[];
}

export default Person;