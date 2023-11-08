package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleOwnerView;
import org.springframework.lang.NonNull;

public interface IVehicleOwnerService {

  boolean isValid(@NonNull VehicleOwnerView vehicleOwner);
}
