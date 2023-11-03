import {Gender} from "../constants/Gender.ts";
import Crash, {crashSchema, CrashWithCasualties} from "./Crash.ts";
import {z} from "zod";
import VehicleOwner, {VehicleOwnerFormSchema} from "./VehicleOwner.ts";

interface Person {
  id?: number;
  crashes: Crash[];
  dateBirth: string;
  gender?: Gender;
  name: string;
  vehiclesOwned: VehicleOwner[];
}

const personSchemaBase = z.object({
  id: z.number().int().positive().optional(),
  dateBirth: z.coerce
    .date({required_error: "Please select a date"})
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(), "Too far, please select a date before today"),
  gender: z.nativeEnum(Gender, {required_error: "Please select a gander"}),
  name: z.string().trim()
    .regex(/^[a-zA-Z]+$/, "Only letters are allowed")
    .min(2, "Too short, please use at least 2 letters")
    .max(255, "Too long, please use no more than 255 letters"),
  vehiclesOwned: z.array(VehicleOwnerFormSchema)
});

type PersonWithCrashes = z.infer<typeof personSchemaBase> & { crashes: CrashWithCasualties[] };

const personSchema: z.ZodType<PersonWithCrashes> = personSchemaBase.extend({
  crashes: z.lazy(() => z.array(crashSchema))
});

export {personSchema};
export default Person;
export type {PersonWithCrashes};