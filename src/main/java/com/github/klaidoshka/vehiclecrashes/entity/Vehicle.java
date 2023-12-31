package com.github.klaidoshka.vehiclecrashes.entity;

import com.github.klaidoshka.vehiclecrashes.constant.VehicleType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import org.springframework.lang.NonNull;

@Entity
@Table(schema = "crashes")
public final class Vehicle {

  @ManyToMany(
      fetch = FetchType.EAGER,
      mappedBy = "casualtiesVehicle"
  )
  private final Set<Crash> crashes = new HashSet<>();

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.EAGER,
      mappedBy = "vehicle",
      orphanRemoval = true
  )
  private final Set<Insurance> insurances = new HashSet<>();

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.EAGER,
      mappedBy = "vehicle",
      orphanRemoval = true
  )
  private final Set<VehicleOwner> owners = new HashSet<>();

  @Column(nullable = false)
  private String color;

  @Column(nullable = false)
  private LocalDate dateManufacture;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long id;

  @Column(nullable = false, unique = true)
  private String plate;

  @Column(nullable = false)
  private VehicleType type;

  public Vehicle() {
  }

  public Vehicle(@NonNull String color, @NonNull LocalDate dateManufacture, @NonNull Long id,
      @NonNull String plate,
      @NonNull VehicleType type) {
    this.color = color;
    this.dateManufacture = dateManufacture;
    this.id = id;
    this.plate = plate;
    this.type = type;
  }

  public @NonNull String getColor() {
    return color;
  }

  public void setColor(@NonNull String color) {
    this.color = color;
  }

  public @NonNull Collection<Crash> getCrashes() {
    return Collections.unmodifiableSet(crashes);
  }

  public void setCrashes(@NonNull Collection<Crash> crashes) {
    if (!this.crashes.isEmpty()) {
      this.crashes.clear();
    }

    this.crashes.addAll(crashes);
  }

  public @NonNull LocalDate getDateManufacture() {
    return dateManufacture;
  }

  public void setDateManufacture(@NonNull LocalDate dateManufacture) {
    this.dateManufacture = dateManufacture;
  }

  public @NonNull Long getId() {
    return id;
  }

  public @NonNull Collection<Insurance> getInsurances() {
    return Collections.unmodifiableSet(insurances);
  }

  public void setInsurances(@NonNull Collection<Insurance> insurances) {
    if (!this.insurances.isEmpty()) {
      this.insurances.clear();
    }

    this.insurances.addAll(insurances);
  }

  public @NonNull Collection<VehicleOwner> getOwners() {
    return Collections.unmodifiableSet(owners);
  }

  public void setOwners(@NonNull Collection<VehicleOwner> owners) {
    if (!this.owners.isEmpty()) {
      this.owners.clear();
    }

    this.owners.addAll(owners);
  }

  public @NonNull String getPlate() {
    return plate;
  }

  public void setPlate(@NonNull String plate) {
    this.plate = plate;
  }

  public @NonNull VehicleType getType() {
    return type;
  }

  public void setType(@NonNull VehicleType type) {
    this.type = type;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Vehicle vehicle)) {
      return false;
    }
    return Objects.equals(color, vehicle.color) && Objects.equals(dateManufacture,
        vehicle.dateManufacture) && Objects.equals(id, vehicle.id) && Objects.equals(insurances,
        vehicle.insurances) && Objects.equals(owners, vehicle.owners)
        && Objects.equals(plate, vehicle.plate) && Objects.equals(type,
        vehicle.type);
  }

  @Override
  public int hashCode() {
    return Objects.hash(color, dateManufacture, id, plate, type);
  }
}
