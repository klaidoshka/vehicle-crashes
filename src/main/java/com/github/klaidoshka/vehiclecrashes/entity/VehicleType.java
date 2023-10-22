package com.github.klaidoshka.vehiclecrashes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import java.util.Objects;
import org.springframework.lang.NonNull;

@Entity
public final class VehicleType {

  @Id
  @Column(nullable = false)
  private Integer id;

  @Enumerated(value = EnumType.STRING)
  @Column(nullable = false)
  private com.github.klaidoshka.vehiclecrashes.constants.VehicleType type;

  public VehicleType() {
  }

  public VehicleType(@NonNull Integer id,
      @NonNull com.github.klaidoshka.vehiclecrashes.constants.VehicleType type) {
    this.id = id;
    this.type = type;
  }

  public @NonNull Integer getId() {
    return id;
  }

  public @NonNull com.github.klaidoshka.vehiclecrashes.constants.VehicleType getType() {
    return type;
  }

  public void setType(@NonNull com.github.klaidoshka.vehiclecrashes.constants.VehicleType type) {
    this.type = type;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof VehicleType that)) {
      return false;
    }
    return Objects.equals(id, that.id) && type == that.type;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, type);
  }
}
