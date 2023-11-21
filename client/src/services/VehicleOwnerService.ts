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
    person: {
      ...vehicleOwnerSchema.person,
      dateBirth: vehicleOwnerSchema.person.dateBirth.toISOString().substring(0, 10)
    },
    vehicle: {
      ...vehicleOwnerSchema.vehicle,
      dateManufacture: vehicleOwnerSchema.vehicle.dateManufacture.toISOString().substring(0, 10)
    },
    dateAcquisition: vehicleOwnerSchema.dateAcquisition.toISOString().substring(0, 10),
    dateDisposal:
      vehicleOwnerSchema.dateDisposal === ""
        ? undefined
        : vehicleOwnerSchema.dateDisposal
        ? new Date(vehicleOwnerSchema.dateDisposal).toISOString().substring(0, 10)
        : undefined
  };
};

export { mapApiViewModifiableData, mapSchemaToEntity };
