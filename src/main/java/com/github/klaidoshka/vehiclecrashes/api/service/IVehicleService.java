package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.api.dto.vehicle.VehicleViewModifiable;
import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

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

  /**
   * Deletes vehicle by id
   *
   * @param id of vehicle to delete
   */
  void deleteById(@NonNull Long id);

  /**
   * Finds vehicle by plate
   *
   * @param plate of vehicle to find
   * @return vehicle if found, null otherwise
   */
  @Nullable
  Vehicle getByPlate(@NonNull String plate);
}
