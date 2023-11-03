import {z} from "zod";
import Person, {personSchema, PersonWithCrashes} from "./Person.ts";
import Vehicle, {vehicleSchema, VehicleWithCrashes} from "./Vehicle.ts";

interface Crash {
  id?: number;
  casualtiesPeople: Person[];
  casualtiesVehicle: Vehicle[];
  damageCost: number;
  date: string;
}

const crashSchemaBase = z.object({
  id: z.number().int().positive().optional(),
  damageCost: z.number().nonnegative(),
  date: z.coerce
  .date({required_error: "Please select a date"})
  .min(new Date(1900, 0), "Too old, please select a date after 1900")
  .max(new Date(), "Too far, please select a date before today")
});

type CrashWithCasualties = z.infer<typeof crashSchemaBase> & {
  casualtiesPeople: PersonWithCrashes[],
  casualtiesVehicle: VehicleWithCrashes[]
};

const crashSchema: z.ZodType<CrashWithCasualties> = crashSchemaBase.extend({
  casualtiesPeople: z.lazy(() => z.array(personSchema)),
  casualtiesVehicle: z.lazy(() => z.array(vehicleSchema))
});

export {crashSchema};
export default Crash;
export type {CrashWithCasualties};