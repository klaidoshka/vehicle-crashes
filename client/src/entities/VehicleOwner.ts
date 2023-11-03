import Person from "./Person.ts";
import Vehicle from "./Vehicle.ts";
import {z} from "zod";

interface VehicleOwner {
  id?: number;
  dateAcquisition: string;
  dateDisposal?: string;
  person: Person;
  vehicle: Vehicle;
}

const VehicleOwnerFormSchema = z.object({
  id: z.number().int().positive().optional(),
  dateAcquisition: z.coerce
  .date({required_error: "Please select a date"})
  .min(new Date(1900, 0), "Too old, please select a date after 1900")
  .max(new Date(), "Too far, please select a date before today"),
  dateDisposal: z.coerce
  .date({required_error: "Please select a date"})
  .min(new Date(1900, 0), "Too old, please select a date after 1900")
  .max(new Date(), "Too far, please select a date before today")
  .optional()
});

export {VehicleOwnerFormSchema};
export default VehicleOwner;