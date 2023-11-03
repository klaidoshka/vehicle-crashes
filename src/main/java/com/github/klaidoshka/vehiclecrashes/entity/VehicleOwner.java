package com.github.klaidoshka.vehiclecrashes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import java.util.Objects;
import org.springframework.lang.NonNull;

@Entity
public final class VehicleOwner {

  @Column(nullable = false)
  private LocalDate dateAcquisition;

  @Column
  private LocalDate dateDisposal;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long id;

  @ManyToOne
  @JoinColumn(
      name = "person_id",
      nullable = false
  )
  @JsonBackReference("vehicles-owned-person")
  private Person person;

  @ManyToOne
  @JoinColumn(
      name = "vehicle_id",
      nullable = false
  )
  @JsonBackReference("vehicles-owned-vehicle")
  private Vehicle vehicle;

  public VehicleOwner() {
  }

  public VehicleOwner(LocalDate dateAcquisition, LocalDate dateDisposal, Long id,
      Person person, Vehicle vehicle) {
    this.dateAcquisition = dateAcquisition;
    this.dateDisposal = dateDisposal;
    this.id = id;
    this.person = person;
    this.vehicle = vehicle;
  }

  public @NonNull LocalDate getDateAcquisition() {
    return dateAcquisition;
  }

  public void setDateAcquisition(@NonNull LocalDate dateAcquisition) {
    this.dateAcquisition = dateAcquisition;
  }

  public @NonNull LocalDate getDateDisposal() {
    return dateDisposal;
  }

  public void setDateDisposal(@NonNull LocalDate dateDisposal) {
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
        that.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(dateAcquisition, dateDisposal, id);
  }
}
