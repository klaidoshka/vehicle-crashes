import {z} from "zod";

interface Insurance {
  id?: number;
  dateInitialization: string;
  dateExpiration: string;
}

const InsuranceFormSchema = z.object({
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
    "Expiration date must be after the begin date");

export {InsuranceFormSchema};
export default Insurance;