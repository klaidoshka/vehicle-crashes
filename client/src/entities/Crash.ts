import CasualtyPerson from "./CasualtyPerson.ts";
import CasualtyVehicle from "./CasualtyVehicle.ts";
import {z} from "zod";
import {PersonFormSchema} from "./Person.ts";
import {VehicleFormSchema} from "./Vehicle.ts";

interface Crash {
  id?: number;
  casualtiesPeople?: CasualtyPerson[];
  casualtiesVehicle?: CasualtyVehicle[];
  damageCost: number;
  date: string;
}

const CrashFormSchema = z.object({
  id: z.number().int().positive().optional(),
  casualtiesPeople: z.array(PersonFormSchema).optional(),
  casualtiesVehicle: z.array(VehicleFormSchema).optional(),
  damageCost: z.number().nonnegative(),
  date: z.coerce
    .date({required_error: "Please select a date"})
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(), "Too far, please select a date before today")
});

export {CrashFormSchema};
export default Crash;