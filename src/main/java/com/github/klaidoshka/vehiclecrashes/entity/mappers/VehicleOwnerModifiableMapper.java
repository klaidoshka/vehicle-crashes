package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner;
import com.github.klaidoshka.vehiclecrashes.entity.dto.vehicleowner.VehicleOwnerViewModifiable;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class VehicleOwnerModifiableMapper implements
    Function<VehicleOwner, VehicleOwnerViewModifiable> {

  @Override
  public VehicleOwnerViewModifiable apply(VehicleOwner entity) {
    return new VehicleOwnerViewModifiable(
        entity.getDateAcquisition(),
        entity.getDateDisposal(),
        entity.getId(),
        new PersonMapper().apply(entity.getPerson()),
        new VehicleMapper().apply(entity.getVehicle())
    );
  }
}
