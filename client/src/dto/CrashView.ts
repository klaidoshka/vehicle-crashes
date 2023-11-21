import { z } from 'zod';

interface CrashView {
  casualtiesPeople: number[];
  casualtiesVehicle: number[];
  damageCost: number;
  date: string;
  id?: number;
}

const crashSchema = z.object({
  casualtiesPeople: z.array(z.number().int().positive()),
  casualtiesVehicle: z.array(z.number().int().positive()),
  damageCost: z.number().nonnegative(),
  date: z.coerce
    .date({ required_error: "Please select a date" })
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(), "Too far, please select a date before today"),
  id: z.number().int().positive().optional()
});

type CrashViewSchema = z.infer<typeof crashSchema>;

export default CrashView;
export type { CrashViewSchema };
