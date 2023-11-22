import VehicleOwnerViewModifiable, {
    VehicleOwnerViewModifiableSchema
} from '../dto/VehicleOwnerViewModifiable.ts';
import { mapApiViewData as mapApiPersonViewData } from './PersonService.ts';
import { mapApiViewData as mapApiVehicleViewData } from './VehicleService.ts';

const mapApiViewModifiableData = (
  vehicleOwner: VehicleOwnerViewModifiable
): VehicleOwnerViewModifiable => {
  return {
    ...vehicleOwner,
    person: mapApiPersonViewData(vehicleOwner.person),
    vehicle: mapApiVehicleViewData(vehicleOwner.vehicle)
  };
};

const mapSchemaToEntity = (
  vehicleOwnerSchema: VehicleOwnerViewModifiableSchema
): VehicleOwnerViewModifiable => {
  return {
    ...vehicleOwnerSchema,
    dateDisposal:
      vehicleOwnerSchema.dateDisposal !== undefined && vehicleOwnerSchema.dateDisposal !== ""
        ? new Date(vehicleOwnerSchema.dateDisposal)
        : undefined
  };
};

export { mapApiViewModifiableData, mapSchemaToEntity };
