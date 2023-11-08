package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner;
import com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleOwnerView;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class VehicleOwnerMapper implements
    Function<VehicleOwner, VehicleOwnerView> {

  @Override
  public VehicleOwnerView apply(
      VehicleOwner entity) {
    return new VehicleOwnerView(
        entity.getDateAcquisition(),
        entity.getDateDisposal(),
        entity.getId(),
        entity.getPerson().getId(),
        entity.getVehicle().getId()
    );
  }
}
