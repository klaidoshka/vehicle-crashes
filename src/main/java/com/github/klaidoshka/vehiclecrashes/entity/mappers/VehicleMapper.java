package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Insurance;
import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner;
import com.github.klaidoshka.vehiclecrashes.entity.dto.vehicle.VehicleView;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class VehicleMapper implements
    Function<Vehicle, VehicleView> {

  @Override
  public VehicleView apply(Vehicle entity) {
    return new VehicleView(
        entity.getColor(),
        entity.getCrashes().stream()
            .map(Crash::getId)
            .toList(),
        entity.getDateManufacture(),
        entity.getId(),
        entity.getInsurances().stream()
            .map(Insurance::getId)
            .toList(),
        entity.getOwners().stream()
            .map(VehicleOwner::getId)
            .toList(),
        entity.getPlate(),
        entity.getType()
    );
  }
}
