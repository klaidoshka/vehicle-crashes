import {VehicleType} from "../constants/VehicleType.ts";
import Insurance, {InsuranceFormSchema} from "./Insurance.ts";
import Crash from "./Crash.ts";
import VehicleOwner, {VehicleOwnerFormSchema} from "./VehicleOwner.ts";
import {z} from "zod";


interface Vehicle {
  id?: number;
  color: string;
  crashes?: Crash[];
  dateManufacture: string;
  insurances?: Insurance[];
  owners?: VehicleOwner[];
  plate: string;
  type?: VehicleType;
}

const convertToSchemaObject = (vehicle: Vehicle): VehicleFormSchemaType => {
  return {
    id: vehicle.id,
    color: vehicle.color,
    dateManufacture: new Date(vehicle.dateManufacture),
    insurances: vehicle.insurances?.map(insurance => {
      return {
        id: insurance.id,
        dateInitialization: new Date(insurance.dateInitialization),
        dateExpiration: new Date(insurance.dateExpiration)
      };
    }),
    owners: vehicle.owners?.map(owner => {
      return {
        id: owner.id,
        dateAcquisition: new Date(owner.dateAcquisition),
        dateDisposal: owner?.dateDisposal && new Date(owner.dateDisposal) || undefined,
      };
    }),
    plate: vehicle.plate,
    type: vehicle.type!
  };
}

const VehicleFormSchema = z.object({
  id: z.number().int().positive().optional(),
  color: z.string().trim().toUpperCase()
    .regex(/^[a-zA-Z]+$/, "Only letters are allowed")
    .min(2, "Too short, please use at least 2 letters")
    .max(36, "Too long, please use no more than 36 letters"),
  dateManufacture: z.coerce
    .date({required_error: "Please select a date"})
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(), "Too far, please select a date before today"),
  insurances: z.array(InsuranceFormSchema).optional(),
  owners: z.array(VehicleOwnerFormSchema).optional(),
  plate: z.string().trim().toUpperCase()
    .regex(/^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/,
        "Only letters, numbers and dashes are allowed"),
  type: z.nativeEnum(VehicleType, {
    required_error: "Please select a vehicle type",
    invalid_type_error: "Please select a vehicle type"
  }).default(VehicleType.CAR)
});

type VehicleFormSchemaType = z.infer<typeof VehicleFormSchema>;

export {
  VehicleFormSchema,
  convertToSchemaObject
};

export default Vehicle;

export type {
  VehicleFormSchemaType
};
