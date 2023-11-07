import {VehicleType} from "../constants/VehicleType.ts";
import Insurance, {
  insuranceSchema,
  mapToEntity as mapToEntityInsurance,
  mapToSchema as mapToSchemaInsurance
} from "./Insurance.ts";
import Crash, {
  crashSchema,
  CrashWithCasualties,
  mapToEntity as mapToEntityCrash,
  mapToSchema as mapToSchemaCrash
} from "./Crash.ts";
import VehicleOwner, {
  mapToEntity as mapToEntityVehicleOwner,
  mapToSchema as mapToSchemaVehicleOwner,
  VehicleOwnerSchema,
  vehicleOwnerSchema
} from "./VehicleOwner.ts";
import {z} from "zod";


interface Vehicle {
  color: string;
  crashes: Crash[];
  dateManufacture: string;
  id?: number;
  insurances: Insurance[];
  owners: VehicleOwner[];
  plate: string;
  type: VehicleType;
}

const mapToEntity = (vehicle: VehicleWithCrashesAndInsurances): Vehicle => {
  return {
    ...vehicle,
    crashes: vehicle.crashes.map(crash => mapToEntityCrash(crash)),
    dateManufacture: vehicle.dateManufacture.toISOString().substring(0, 10),
    insurances: vehicle.insurances.map(insurance => mapToEntityInsurance(insurance)),
    owners: vehicle.owners?.map(owner => mapToEntityVehicleOwner(owner)) ?? [],
  };
};

const mapToSchema = (vehicle: Vehicle): VehicleWithCrashesAndInsurances => {
  vehicle.owners.forEach(owner => owner.vehicle = ({
    ...vehicle,
    owners: []
  }));

  return {
    ...vehicle,
    crashes: vehicle.crashes.map(crash => mapToSchemaCrash(crash)),
    dateManufacture: new Date(vehicle.dateManufacture),
    insurances: vehicle.insurances.map(insurance => mapToSchemaInsurance(insurance)),
    owners: vehicle.owners.map(owner => mapToSchemaVehicleOwner(owner)),
    type: (isNaN(vehicle.type) ? VehicleType[vehicle.type] : vehicle.type) as VehicleType
  };
};

const vehicleSchemaBase = z.object({
  id: z.number().int().positive().optional(),
  color: z.string().trim().toUpperCase()
    .regex(/^[a-zA-Z]+$/, "Only letters are allowed")
    .min(2, "Too short, please use at least 2 letters")
    .max(36, "Too long, please use no more than 36 letters"),
  dateManufacture: z.coerce
    .date({required_error: "Please select a date"})
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(), "Too far, please select a date before today"),
  insurances: z.array(insuranceSchema),
  plate: z.string().trim().toUpperCase()
    .regex(/^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/,
        "Only letters, numbers and dashes are allowed"),
  type: z.nativeEnum(
      VehicleType,
      {
        required_error: "Please select a vehicle type",
        invalid_type_error: "Please select a vehicle type"
      })
});

type VehicleWithCrashesAndInsurances = z.infer<typeof vehicleSchemaBase> & {
  crashes: CrashWithCasualties[];
  owners: VehicleOwnerSchema[];
};

const vehicleSchema: z.ZodType<VehicleWithCrashesAndInsurances> = vehicleSchemaBase.extend({
  crashes: z.lazy(() => z.array(crashSchema)),
  owners: z.lazy(() => z.array(vehicleOwnerSchema))
});

export {
  vehicleSchema,
  mapToSchema,
  mapToEntity
};

export default Vehicle;

export type {VehicleWithCrashesAndInsurances};
