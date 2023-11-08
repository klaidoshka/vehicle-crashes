package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleViewModifiable;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class VehicleModifiableMapper implements Function<Vehicle, VehicleViewModifiable> {

  @Override
  public VehicleViewModifiable apply(Vehicle vehicle) {
    return new VehicleViewModifiable(
        vehicle.getColor(),
        vehicle.getCrashes().stream()
            .map(Crash::getId)
            .toList(),
        vehicle.getDateManufacture(),
        vehicle.getId(),
        vehicle.getInsurances().stream()
            .map(new InsuranceMapper())
            .toList(),
        vehicle.getOwners().stream()
            .map(new VehicleOwnerModifiableMapper())
            .toList(),
        vehicle.getPlate(),
        vehicle.getType()
    );
  }
}
