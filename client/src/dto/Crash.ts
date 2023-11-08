import {z} from "zod";
import Person, {mapToEntity as mapToEntityPerson, mapToSchema as mapToSchemaPerson, personSchema, PersonWithCrashes} from "./Person.ts";
import Vehicle, {mapToEntity as mapToEntityVehicle, mapToSchema as mapToSchemaVehicle, vehicleSchema, VehicleWithCrashesAndInsurances} from "./Vehicle.ts";

interface Crash {
  id?: number;
  casualtiesPeople: Person[];
  casualtiesVehicle: Vehicle[];
  damageCost: number;
  date: string;
}

const mapToEntity = (crash: CrashWithCasualties): Crash => {
  return {
    ...crash,
    date: crash.date.toISOString().substring(0, 10),
    casualtiesPeople: crash.casualtiesPeople.map(person => mapToEntityPerson(person)),
    casualtiesVehicle: crash.casualtiesVehicle.map(vehicle => mapToEntityVehicle(vehicle))
  };
};

const mapToSchema = (crash: Crash): CrashWithCasualties => {
  crash.casualtiesVehicle.forEach(vehicle => vehicle.crashes = []);
  crash.casualtiesPeople.forEach(person => person.crashes = []);

  return {
    ...crash,
    date: new Date(crash.date),
    casualtiesPeople: crash.casualtiesPeople.map(person => mapToSchemaPerson(person)),
    casualtiesVehicle: crash.casualtiesVehicle.map(vehicle => mapToSchemaVehicle(vehicle))
  };
};

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
  casualtiesVehicle: VehicleWithCrashesAndInsurances[]
};

const crashSchema: z.ZodType<CrashWithCasualties> = crashSchemaBase.extend({
  casualtiesPeople: z.lazy(() => z.array(personSchema)),
  casualtiesVehicle: z.lazy(() => z.array(vehicleSchema))
});

export {crashSchema, mapToEntity, mapToSchema};
export default Crash;
export type {CrashWithCasualties};