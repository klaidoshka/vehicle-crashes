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

  public static @NonNull VehicleType fromString(@NonNull String vehicleType) {
    return valueOf(vehicleType.trim().toUpperCase());
  }

  public int getId() {
    return id;
  }

  @Override
  public String toString() {
    return name();
  }
}
