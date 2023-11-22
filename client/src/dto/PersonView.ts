import { z } from 'zod';

import { Gender } from '../constants/Gender.ts';

interface PersonView {
  crashes: number[];
  dateBirth: Date;
  gender: Gender;
  id?: number;
  name: string;
  vehiclesOwned: number[];
}

const personViewSchema = z.object({
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
  vehiclesOwned: z.array(z.number().int().positive())
});

type PersonViewSchema = z.infer<typeof personViewSchema>;

export { personViewSchema };
export default PersonView;
export type { PersonViewSchema };
