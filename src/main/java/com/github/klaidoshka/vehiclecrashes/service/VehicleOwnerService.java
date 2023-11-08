package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.service.IVehicleOwnerService;
import com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleOwnerView;
import org.springframework.stereotype.Service;

@Service
public final class VehicleOwnerService implements IVehicleOwnerService {

  @Override
  public boolean isValid(VehicleOwnerView vehicleOwner) {
    return true;
  }
}
