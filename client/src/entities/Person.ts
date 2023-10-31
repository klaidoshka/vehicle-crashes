import {Gender} from "../constants/Gender.ts";
import Vehicle, {VehicleFormSchema} from "./Vehicle.ts";
import Crash from "./Crash.ts";
import {z} from "zod";

interface Person {
  id?: number;
  crashes?: Crash[];
  dateBirth: string;
  gender?: Gender;
  name: string;
  vehiclesOwned?: Vehicle[];
}

const PersonFormSchema = z.object({
  id: z.number().int().positive().optional(),
  dateBirth: z.coerce
  .date({required_error: "Please select a date"})
  .min(new Date(1900, 0), "Too old, please select a date after 1900")
  .max(new Date(), "Too far, please select a date before today"),
  gender: z.nativeEnum(Gender, {required_error: "Please select a gander"}).optional(),
  name: z.string().trim()
  .regex(/^[a-zA-Z]+$/, "Only letters are allowed")
  .min(2, "Too short, please use at least 2 letters")
  .max(255, "Too long, please use no more than 255 letters"),
  vehiclesOwned: z.array(VehicleFormSchema).optional()
});

export {PersonFormSchema};
export default Person;