import {Gender} from "../constants/Gender.ts";
import Crash, {
  crashSchema,
  mapToEntity as mapToEntityCrash,
  mapToSchema as mapToSchemaCrash,
  CrashWithCasualties
} from "./Crash.ts";
import {z} from "zod";
import VehicleOwner, {
  mapToEntity as mapToEntityVehicleOwner,
  mapToSchema as mapToSchemaVehicleOwner,
  vehicleOwnerSchema
} from "./VehicleOwner.ts";

interface Person {
  id?: number;
  crashes: Crash[];
  dateBirth: string;
  gender: Gender;
  name: string;
  vehiclesOwned: VehicleOwner[];
}

const mapToEntity = (person: PersonWithCrashes): Person => {
  return {
    ...person,
    crashes: person.crashes.map(crash => mapToEntityCrash(crash)),
    dateBirth: person.dateBirth.toISOString().substring(0, 10),
    vehiclesOwned: person.vehiclesOwned.map(vehicleOwner => mapToEntityVehicleOwner(vehicleOwner))
  };
};

const mapToSchema = (person: Person): PersonWithCrashes => {
  person.vehiclesOwned.forEach(owner => owner.person = ({
    ...person,
    vehiclesOwned: []
  }));

  return {
    ...person,
    crashes: person.crashes.map(crash => mapToSchemaCrash(crash)),
    dateBirth: new Date(person.dateBirth),
    vehiclesOwned: person.vehiclesOwned.map(vehicleOwner => mapToSchemaVehicleOwner(vehicleOwner))
  };
};

const personSchemaBase = z.object({
  id: z.number().int().positive().optional(),
  dateBirth: z.coerce
    .date({required_error: "Please select a date"})
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(), "Too far, please select a date before today"),
  gender: z.nativeEnum(Gender, {required_error: "Please select a gender"}),
  name: z.string().trim()
    .regex(/^[aA-zZąĄ-žŽ ]+$/, "Only letters and spaces are allowed")
    .min(2, "Too short, please use at least 2 letters")
    .max(255, "Too long, please use no more than 255 letters"),
  vehiclesOwned: z.array(vehicleOwnerSchema)
});

type PersonWithCrashes = z.infer<typeof personSchemaBase> & { crashes: CrashWithCasualties[] };

const personSchema: z.ZodType<PersonWithCrashes> = personSchemaBase.extend({
  crashes: z.lazy(() => z.array(crashSchema))
});

export {personSchema, mapToEntity, mapToSchema};
export default Person;
export type {PersonWithCrashes};