package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleViewModifiable;
import org.springframework.lang.NonNull;

public interface IVehicleService {

  /**
   * Checks if vehicle is valid
   *
   * @param vehicle vehicle to check
   * @return true if vehicle is valid, false otherwise
   */
  boolean isValid(@NonNull VehicleViewModifiable vehicle);

  /**
   * Creates or updates vehicle
   *
   * @param vehicleView vehicle view
   * @throws IllegalArgumentException if vehicle with id from vehicleView is not found or some error
   *                                  occurred while updating database with new entry
   */
  @NonNull
  void createOrUpdate(@NonNull VehicleViewModifiable vehicleView) throws IllegalArgumentException;
}
