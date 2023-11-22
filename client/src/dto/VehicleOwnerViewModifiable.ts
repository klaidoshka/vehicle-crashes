import { z } from 'zod';

import { equalOrGreater } from '../services/Dates.ts';
import PersonView, { personViewSchema } from './PersonView.ts';
import VehicleView, { vehicleViewSchema } from './VehicleView.ts';

interface VehicleOwnerViewModifiable {
  dateAcquisition: Date;
  dateDisposal: Date | undefined;
  id?: number;
  person: PersonView;
  vehicle: VehicleView;
}

const vehicleOwnerViewModifiableSchema = z
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
    person: personViewSchema,
    vehicle: vehicleViewSchema
  })
  .refine((v) => (v.dateDisposal ? equalOrGreater(v.dateDisposal, v.dateAcquisition) : true), {
    message: "Disposal date must be after acquisition date",
    path: ["dateDisposal"]
  });

type VehicleOwnerViewModifiableSchema = z.infer<typeof vehicleOwnerViewModifiableSchema>;

export { vehicleOwnerViewModifiableSchema };
export default VehicleOwnerViewModifiable;
export type { VehicleOwnerViewModifiableSchema };
