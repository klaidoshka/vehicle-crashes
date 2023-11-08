package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleOwnerView;
import com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleOwnerViewModifiable;
import org.springframework.lang.NonNull;

public interface IVehicleOwnerService {

  boolean isValid(@NonNull VehicleOwnerView vehicleOwner);

  boolean isValid(@NonNull VehicleOwnerViewModifiable vehicleOwner);
}
