package com.github.klaidoshka.vehiclecrashes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Objects;
import org.springframework.lang.NonNull;

@Entity
public final class CrashCasualtiesVehicle {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long id;

  @ManyToOne
  @JoinColumn(
      name = "crash_id",
      nullable = false
  )
  private Crash crash;

  @ManyToOne
  @JoinColumn(
      name = "vehicle_id",
      nullable = false
  )
  private Vehicle vehicle;

  public CrashCasualtiesVehicle() {
  }

  public CrashCasualtiesVehicle(@NonNull Long id, @NonNull Crash crash, @NonNull Vehicle vehicle) {
    this.id = id;
    this.crash = crash;
    this.vehicle = vehicle;
  }

  public @NonNull Long getId() {
    return id;
  }

  public @NonNull Crash getCrash() {
    return crash;
  }

  public void setCrash(@NonNull Crash crash) {
    this.crash = crash;
  }

  public @NonNull Vehicle getVehicle() {
    return vehicle;
  }

  public void setVehicle(@NonNull Vehicle vehicle) {
    this.vehicle = vehicle;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof CrashCasualtiesVehicle that)) {
      return false;
    }
    return Objects.equals(id, that.id) && Objects.equals(crash, that.crash)
        && Objects.equals(vehicle, that.vehicle);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, crash, vehicle);
  }
}
