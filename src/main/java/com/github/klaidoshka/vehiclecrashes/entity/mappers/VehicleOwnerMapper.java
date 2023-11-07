package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class VehicleOwnerMapper implements
    Function<VehicleOwner, com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleOwner> {

  @Override
  public com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleOwner apply(
      VehicleOwner entity) {
    return new com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleOwner(
        entity.getDateAcquisition(),
        entity.getDateDisposal(),
        entity.getId(),
        entity.getPerson().getId(),
        entity.getVehicle().getId()
    );
  }
}
