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
public final class VehicleOwner {

  @Column(nullable = false)
  private LocalDateTime dateAcquisition;

  @Column
  private LocalDateTime dateDisposal;

  @Id
  @Column(nullable = false)
  private Long id;

  @ManyToOne
  @JoinColumn(
      name = "person_id",
      nullable = false
  )
  private Person person;

  @ManyToOne
  @JoinColumn(
      name = "vehicle_id",
      nullable = false
  )
  private Vehicle vehicle;

  public VehicleOwner() {
  }

  public VehicleOwner(LocalDateTime dateAcquisition, LocalDateTime dateDisposal, Long id,
      Person person, Vehicle vehicle) {
    this.dateAcquisition = dateAcquisition;
    this.dateDisposal = dateDisposal;
    this.id = id;
    this.person = person;
    this.vehicle = vehicle;
  }

  public @NonNull LocalDateTime getDateAcquisition() {
    return dateAcquisition;
  }

  public void setDateAcquisition(@NonNull LocalDateTime dateAcquisition) {
    this.dateAcquisition = dateAcquisition;
  }

  public @NonNull LocalDateTime getDateDisposal() {
    return dateDisposal;
  }

  public void setDateDisposal(@NonNull LocalDateTime dateDisposal) {
    this.dateDisposal = dateDisposal;
  }

  public @NonNull Long getId() {
    return id;
  }

  public @NonNull Person getPerson() {
    return person;
  }

  public void setPerson(@NonNull Person person) {
    this.person = person;
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
    if (!(o instanceof VehicleOwner that)) {
      return false;
    }
    return Objects.equals(dateAcquisition, that.dateAcquisition)
        && Objects.equals(dateDisposal, that.dateDisposal) && Objects.equals(id,
        that.id) && Objects.equals(person, that.person) && Objects.equals(vehicle,
        that.vehicle);
  }

  @Override
  public int hashCode() {
    return Objects.hash(dateAcquisition, dateDisposal, id, person, vehicle);
  }
}
