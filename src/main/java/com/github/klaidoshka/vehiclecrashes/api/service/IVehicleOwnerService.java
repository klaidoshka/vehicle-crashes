package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.entity.dto.vehicleowner.VehicleOwnerView;
import com.github.klaidoshka.vehiclecrashes.entity.dto.vehicleowner.VehicleOwnerViewModifiable;
import org.springframework.lang.NonNull;

public interface IVehicleOwnerService {

  /***
   * Checks if vehicle owner is valid
   * @param vehicleOwner to check
   * @return true if is valid, false otherwise
   */
  boolean isValid(@NonNull VehicleOwnerView vehicleOwner);

  /***
   * Checks if vehicle owner is valid
   * @param vehicleOwner to check
   * @return true if is valid, false otherwise
   */
  boolean isValid(@NonNull VehicleOwnerViewModifiable vehicleOwner);
}
