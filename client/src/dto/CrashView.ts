import { z } from 'zod';

import PersonView, { personViewSchema } from './PersonView';
import VehicleView, { vehicleViewSchema } from './VehicleView';

interface CrashView {
  casualtiesPeople: PersonView[];
  casualtiesVehicle: VehicleView[];
  damageCost: number;
  dateCrash: Date;
  id?: number;
}

const crashSchema = z.object({
  casualtiesPeople: z.array(personViewSchema),
  casualtiesVehicle: z.array(vehicleViewSchema),
  damageCost: z.number().nonnegative(),
  dateCrash: z.coerce
    .date({ required_error: "Please select a date" })
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(), "Too far, please select a date before today"),
  id: z.number().int().positive().optional()
});

type CrashViewSchema = z.infer<typeof crashSchema>;

export default CrashView;
export type { CrashViewSchema };
