package com.github.klaidoshka.vehiclecrashes.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import org.springframework.lang.NonNull;

@Entity
public final class Vehicle {

  @Column(nullable = false)
  private String color;

  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(
      name = "CrashCasualtiesPeople",
      joinColumns = @JoinColumn(name = "person"),
      inverseJoinColumns = @JoinColumn(name = "crash")
  )
  private Set<Crash> crashes;

  @Column(nullable = false)
  private LocalDateTime dateManufacture;

  @Id
  @Column(nullable = false)
  private Long id;

  @OneToMany(cascade = CascadeType.ALL)
  private Set<Insurance> insurances;

  @OneToMany(cascade = CascadeType.ALL)
  private Set<VehicleOwner> owners;

  @Column(nullable = false)
  private String plate;

  @ManyToOne
  private VehicleType type;

  public Vehicle() {
  }

  public Vehicle(@NonNull String color, @NonNull LocalDateTime dateManufacture, @NonNull Long id,
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
    this.crashes = new HashSet<>(crashes);
  }

  public @NonNull LocalDateTime getDateManufacture() {
    return dateManufacture;
  }

  public void setDateManufacture(@NonNull LocalDateTime dateManufacture) {
    this.dateManufacture = dateManufacture;
  }

  public @NonNull Long getId() {
    return id;
  }

  public @NonNull Collection<Insurance> getInsurances() {
    return Collections.unmodifiableSet(insurances);
  }

  public void setInsurances(@NonNull Collection<Insurance> insurances) {
    this.insurances = new HashSet<>(insurances);
  }

  public @NonNull Collection<VehicleOwner> getOwners() {
    return Collections.unmodifiableSet(owners);
  }

  public void setOwners(@NonNull Collection<VehicleOwner> owners) {
    this.owners = new HashSet<>(owners);
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
    return Objects.equals(color, vehicle.color) && Objects.equals(crashes,
        vehicle.crashes) && Objects.equals(dateManufacture, vehicle.dateManufacture)
        && Objects.equals(id, vehicle.id) && Objects.equals(insurances,
        vehicle.insurances) && Objects.equals(owners, vehicle.owners)
        && Objects.equals(plate, vehicle.plate) && Objects.equals(type,
        vehicle.type);
  }

  @Override
  public int hashCode() {
    return Objects.hash(color, crashes, dateManufacture, id, insurances, owners, plate, type);
  }
}