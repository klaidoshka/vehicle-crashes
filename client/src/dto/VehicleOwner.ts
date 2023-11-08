import Person, {
  mapToEntity as mapToEntityPerson,
  mapToSchema as mapToSchemaPerson,
  personSchema,
  PersonWithCrashes
} from "./Person.ts";
import Vehicle, {
  mapToEntity as mapToEntityVehicle,
  mapToSchema as mapToSchemaVehicle,
  vehicleSchema,
  VehicleWithCrashesAndInsurances
} from "./Vehicle.ts";
import {z} from "zod";
import {equalOrGreater} from "../services/Dates.ts";

interface VehicleOwner {
  id?: number;
  dateAcquisition: string;
  dateDisposal?: string;
  person: Person;
  vehicle: Vehicle;
}

const mapToEntity = (vehicleOwner: VehicleOwnerSchema): VehicleOwner => {
  return {
    ...vehicleOwner,
    dateAcquisition: vehicleOwner.dateAcquisition.toISOString().substring(0, 10),
    dateDisposal: vehicleOwner.dateDisposal ? new Date(vehicleOwner.dateDisposal).toISOString().substring(0, 10) : "",
    person: mapToEntityPerson(vehicleOwner.person),
    vehicle: mapToEntityVehicle(vehicleOwner.vehicle)
  };
};

const mapToSchema = (vehicleOwner: VehicleOwner): VehicleOwnerSchema => {
  return {
    ...vehicleOwner,
    dateAcquisition: new Date(vehicleOwner.dateAcquisition),
    dateDisposal: vehicleOwner.dateDisposal ? new Date(vehicleOwner.dateDisposal) : undefined,
    person: mapToSchemaPerson(vehicleOwner.person),
    vehicle: mapToSchemaVehicle(vehicleOwner.vehicle)
  };
};

const vehicleOwnerSchemaBase = z.object({
  id: z.number().int().positive().optional(),
  dateAcquisition: z.coerce
    .date({required_error: "Please select a date"})
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(), "Too far, please select a date before today"),
  dateDisposal: z.union([z.coerce
    .date({required_error: "Please select a date"})
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(), "Too far, please select a date before today")
    .optional(), z.literal("")])
});

type VehicleOwnerSchema = z.infer<typeof vehicleOwnerSchemaBase> & {
  person: PersonWithCrashes,
  vehicle: VehicleWithCrashesAndInsurances
};

const vehicleOwnerSchema: z.ZodType<VehicleOwnerSchema> = vehicleOwnerSchemaBase
  .extend({
    person: z.lazy(() => personSchema),
    vehicle: z.lazy(() => vehicleSchema)
  })
  .refine(v => v.dateDisposal ? equalOrGreater(v.dateDisposal, v.dateAcquisition) : true, {
    message: "Disposal date must be after acquisition date",
    path: ["dateDisposal"]
  });

export {mapToEntity, mapToSchema, vehicleOwnerSchema};
export default VehicleOwner;
export type {VehicleOwnerSchema};