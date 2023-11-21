import { z } from 'zod';

import { Gender } from '../constants/Gender.ts';
import VehicleOwnerViewModifiable, {
    vehicleOwnerViewModifiableSchema
} from './VehicleOwnerViewModifiable.ts';

interface PersonViewModifiable {
  crashes: number[];
  dateBirth: string;
  gender: Gender;
  id?: number;
  name: string;
  vehiclesOwned: VehicleOwnerViewModifiable[];
}

const personViewModifiableSchema = z.object({
  crashes: z.array(z.number().int().positive()),
  dateBirth: z.coerce
    .date({ required_error: "Please select a date" })
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(), "Too far, please select a date before today"),
  gender: z.nativeEnum(Gender, { required_error: "Please select a gender" }),
  id: z.number().int().positive().optional(),
  name: z
    .string()
    .trim()
    .regex(/^[aA-zZąĄ-žŽ ]+$/, "Only letters and spaces are allowed")
    .min(2, "Too short, please use at least 2 letters")
    .max(255, "Too long, please use no more than 255 letters"),
  vehiclesOwned: z.array(vehicleOwnerViewModifiableSchema)
});

type PersonViewModifiableSchema = z.infer<typeof personViewModifiableSchema>;

export { personViewModifiableSchema };
export default PersonViewModifiable;
export type { PersonViewModifiableSchema };
