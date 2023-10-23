package com.github.klaidoshka.vehiclecrashes.constant;

public enum Gender {

  MALE(0),
  FEMALE(1),
  OTHER(2);

  private final int id;

  Gender(int id) {
    this.id = id;
  }

  public int getId() {
    return id;
  }
}
