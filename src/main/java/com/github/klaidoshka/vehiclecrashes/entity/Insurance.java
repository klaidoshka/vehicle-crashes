package com.github.klaidoshka.vehiclecrashes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.Objects;
import org.springframework.lang.NonNull;

@Entity
@Table(schema = "crashes")
public final class Insurance {

  @Column(nullable = false)
  private LocalDate dateInitialization;

  @Column(nullable = false)
  private LocalDate dateExpiration;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long id;

  @ManyToOne
  @JoinColumn(
      name = "vehicle_id",
      nullable = false
  )
  @JsonBackReference("vehicle")
  private Vehicle vehicle;

  public Insurance() {
  }

  public Insurance(@NonNull LocalDate dateInitialization, @NonNull LocalDate dateExpiration,
      @NonNull Long id) {
    this.dateInitialization = dateInitialization;
    this.dateExpiration = dateExpiration;
    this.id = id;
  }

  public Insurance(@NonNull LocalDate dateInitialization, @NonNull LocalDate dateExpiration,
      @NonNull Vehicle vehicle) {
    this.dateInitialization = dateInitialization;
    this.dateExpiration = dateExpiration;
    this.vehicle = vehicle;
  }

  public @NonNull LocalDate getDateInitialization() {
    return dateInitialization;
  }

  public void setDateInitialization(@NonNull LocalDate dateInitialization) {
    this.dateInitialization = dateInitialization;
  }

  public @NonNull LocalDate getDateExpiration() {
    return dateExpiration;
  }

  public void setDateExpiration(@NonNull LocalDate dateExpiration) {
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
        && Objects.equals(id, insurance.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(dateInitialization, dateExpiration, id);
  }
}
