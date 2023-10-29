import CasualtyPerson from "./CasualtyPerson.ts";
import CasualtyVehicle from "./CasualtyVehicle.ts";

interface Crash {
  id: number;
  casualtiesPeople: CasualtyPerson[];
  casualtiesVehicle: CasualtyVehicle[];
  damageCost: number;
  date: string;
}

export default Crash;