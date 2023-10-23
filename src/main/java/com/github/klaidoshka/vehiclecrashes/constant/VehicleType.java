package com.github.klaidoshka.vehiclecrashes.constant;

import org.apache.commons.text.WordUtils;

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

  public int getId() {
    return id;
  }

  @Override
  public String toString() {
    return WordUtils.capitalizeFully(name());
  }
}
