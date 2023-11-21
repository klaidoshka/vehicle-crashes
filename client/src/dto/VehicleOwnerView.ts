import { z } from 'zod';

import { equalOrGreater } from '../services/Dates.ts';

interface VehicleOwnerView {
  dateAcquisition: string;
  dateDisposal?: string;
  id?: number;
  personId?: number;
  vehicleId?: number;
}

const vehicleOwnerViewSchema = z
  .object({
    dateAcquisition: z.coerce
      .date({ required_error: "Please select a date" })
      .min(new Date(1900, 0), "Too old, please select a date after 1900")
      .max(new Date(), "Too far, please select a date before today"),
    dateDisposal: z.union([
      z.coerce
        .date({ required_error: "Please select a date" })
        .min(new Date(1900, 0), "Too old, please select a date after 1900")
        .max(new Date(), "Too far, please select a date before today")
        .optional(),
      z.literal("")
    ]),
    id: z.number().int().positive().optional(),
    personId: z.number().int().positive().optional(),
    vehicleId: z.number().int().positive().optional()
  })
  .refine((v) => (v.dateDisposal ? equalOrGreater(v.dateDisposal, v.dateAcquisition) : true), {
    message: "Disposal date must be after acquisition date",
    path: ["dateDisposal"]
  });

type VehicleOwnerViewSchema = z.infer<typeof vehicleOwnerViewSchema>;

export { vehicleOwnerViewSchema };
export default VehicleOwnerView;
export type { VehicleOwnerViewSchema };
