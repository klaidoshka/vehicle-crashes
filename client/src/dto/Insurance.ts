import {z} from "zod";

interface Insurance {
  id?: number;
  dateInitialization: string;
  dateExpiration: string;
}

const mapToEntity = (insurance: InsuranceFormSchema): Insurance => {
  return {
    ...insurance,
    dateInitialization: insurance.dateInitialization.toISOString().substring(0, 10),
    dateExpiration: insurance.dateExpiration.toISOString().substring(0, 10)
  };
};

const mapToSchema = (insurance: Insurance): InsuranceFormSchema => {
  return {
    ...insurance,
    dateInitialization: new Date(insurance.dateInitialization),
    dateExpiration: new Date(insurance.dateExpiration)
  };
};

const insuranceSchema = z.object({
  id: z.number().int().positive().optional(),
  dateInitialization: z.coerce
    .date({required_error: "Please select a begin date"})
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(new Date().getFullYear() + 1, 0), "Too far, please select a date with 1 years from today"),
  dateExpiration: z.coerce
    .date({required_error: "Please select an expire date"})
    .min(new Date(1900, 0), "Too old, please select a date after 1900")
    .max(new Date(new Date().getFullYear() + 2, 0), "Too far, please select a date with 2 years from today")
})
.refine(data => data.dateExpiration >= data.dateInitialization,
    {
      message: "Expiration date must be after the begin date",
      path: ["dateExpiration"]
    }
);

type InsuranceFormSchema = z.infer<typeof insuranceSchema>;

export {insuranceSchema, mapToEntity, mapToSchema};
export default Insurance;
export type {InsuranceFormSchema};