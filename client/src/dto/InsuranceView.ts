import { z } from 'zod';

interface InsuranceView {
  dateExpiration: Date;
  dateInitialization: Date;
  id?: number;
  vehicleId?: number;
}

const insuranceViewSchema = z
  .object({
    dateExpiration: z.coerce
      .date({ required_error: "Please select an expire date" })
      .min(new Date(1900, 0), "Too old, please select a date after 1900")
      .max(
        new Date(new Date().getFullYear() + 2, 0),
        "Too far, please select a date with 2 years from today"
      ),
    dateInitialization: z.coerce
      .date({ required_error: "Please select a begin date" })
      .min(new Date(1900, 0), "Too old, please select a date after 1900")
      .max(
        new Date(new Date().getFullYear() + 1, 0),
        "Too far, please select a date with 1 years from today"
      ),
    id: z.number().int().positive().optional(),
    vehicleId: z.number().int().positive().optional()
  })
  .refine((data) => data.dateExpiration >= data.dateInitialization, {
    message: "Expiration date must be after the begin date",
    path: ["dateExpiration"]
  });

type InsuranceViewSchema = z.infer<typeof insuranceViewSchema>;

export { insuranceViewSchema };
export default InsuranceView;
export type { InsuranceViewSchema };
