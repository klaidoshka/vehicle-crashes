package com.github.klaidoshka.vehiclecrashes.constant;

import org.springframework.lang.NonNull;

public enum VehicleType {

  CAR(0),
  BUS(1),
  VAN(2),
  TRUCK(3),
  MOTORCYCLE(4),
  BICYCLE(5),
  BOAT(6),
  PLANE(7);

  private final int id;

  VehicleType(int id) {
    this.id = id;
  }

  public static @NonNull VehicleType fromId(@NonNull int vehicleTypeId) {
    for (VehicleType type : values()) {
      if (type.getId() == vehicleTypeId) {
        return type;
      }
    }

    throw new IllegalArgumentException("No vehicle type with id " + vehicleTypeId);
  }

  public int getId() {
    return id;
  }

  @Override
  public String toString() {
    return name();
  }
}
