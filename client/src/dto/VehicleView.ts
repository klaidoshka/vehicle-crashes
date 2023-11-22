import { z } from 'zod';

import { VehicleType } from '../constants/VehicleType.ts';

interface VehicleView {
  color: string;
  crashes: number[];
  dateManufacture: Date;
  id?: number;
  insurances: number[];
  owners: number[];
  plate: string;
  type: VehicleType;
}

const vehicleViewSchema = z.object({
  color: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[a-zA-Z]+$/, "Only letters are allowed")
    .min(2, "Too short, please use at least 2 letters")
    .max(36, "Too long, please use no more than 36 letters"),
  crashes: z.array(z.number().int().positive()),
  dateManufacture: z.coerce
    .date({ required_error: "Please select a date" })
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(), "Too far, please select a date before today"),
  id: z.number().int().positive().optional(),
  insurances: z.array(z.number().int().positive()),
  owners: z.array(z.number().int().positive()),
  plate: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/, "Only letters, numbers and dashes are allowed"),
  type: z.nativeEnum(VehicleType, {
    required_error: "Please select a vehicle type",
    invalid_type_error: "Please select a vehicle type"
  })
});

type VehicleViewSchema = z.infer<typeof vehicleViewSchema>;

export { vehicleViewSchema };
export default VehicleView;
export type { VehicleViewSchema };
