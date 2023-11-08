package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleViewModifiable;
import org.springframework.lang.NonNull;

public interface IVehicleService {

  boolean isValid(@NonNull VehicleViewModifiable vehicle);

  @NonNull
  Vehicle merge(@NonNull Vehicle vehicle, @NonNull VehicleViewModifiable vehicleView);
}
