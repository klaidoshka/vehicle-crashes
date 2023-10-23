package com.github.klaidoshka.vehiclecrashes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.Objects;
import org.springframework.lang.NonNull;

@Entity
public final class Insurance {

  @Column(nullable = false)
  private LocalDateTime dateInitialization;

  @Column(nullable = false)
  private LocalDateTime dateExpiration;

  @Id
  @Column(nullable = false)
  private Long id;

  @ManyToOne
  @JoinColumn(
      name = "vehicle_id",
      nullable = false
  )
  private Vehicle vehicle;

  public Insurance() {
  }

  public Insurance(@NonNull LocalDateTime dateInitialization, @NonNull LocalDateTime dateExpiration,
      @NonNull Long id) {
    this.dateInitialization = dateInitialization;
    this.dateExpiration = dateExpiration;
    this.id = id;
  }

  public @NonNull LocalDateTime getDateInitialization() {
    return dateInitialization;
  }

  public void setDateInitialization(@NonNull LocalDateTime dateInitialization) {
    this.dateInitialization = dateInitialization;
  }

  public @NonNull LocalDateTime getDateExpiration() {
    return dateExpiration;
  }

  public void setDateExpiration(@NonNull LocalDateTime dateExpiration) {
    this.dateExpiration = dateExpiration;
  }

  public @NonNull Long getId() {
    return id;
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
    if (!(o instanceof Insurance insurance)) {
      return false;
    }
    return Objects.equals(dateInitialization, insurance.dateInitialization)
        && Objects.equals(dateExpiration, insurance.dateExpiration)
        && Objects.equals(id, insurance.id) && Objects.equals(vehicle,
        insurance.vehicle);
  }

  @Override
  public int hashCode() {
    return Objects.hash(dateInitialization, dateExpiration, id, vehicle);
  }
}
