package com.github.klaidoshka.vehiclecrashes.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import org.springframework.lang.NonNull;

@Entity
@Table(schema = "crashes")
public final class Crash {

  @ManyToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.EAGER
  )
  @JoinTable(
      schema = "crashes",
      name = "crash_casualties_people",
      joinColumns = @JoinColumn(name = "crash_id"),
      inverseJoinColumns = @JoinColumn(name = "person_id")
  )
  private final Set<Person> casualtiesPeople = new HashSet<>();

  @ManyToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.EAGER
  )
  @JoinTable(
      schema = "crashes",
      name = "crash_casualties_vehicle",
      joinColumns = @JoinColumn(name = "crash_id"),
      inverseJoinColumns = @JoinColumn(name = "vehicle_id")
  )
  private final Set<Vehicle> casualtiesVehicle = new HashSet<>();

  @Column(nullable = false)
  private LocalDateTime dateCrash;

  @Column(
      nullable = false,
      precision = 2
  )
  private double damageCost;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long id;

  public Crash() {
  }

  public Crash(@NonNull LocalDateTime dateCrash, double damageCost, @NonNull Long id) {
    this.dateCrash = dateCrash;
    this.damageCost = damageCost;
    this.id = id;
  }

  public @NonNull Collection<Person> getCasualtiesPeople() {
    return Collections.unmodifiableSet(casualtiesPeople);
  }

  public void setCasualtiesPeople(@NonNull Collection<Person> casualtiesPeople) {
    if (!this.casualtiesPeople.isEmpty()) {
      this.casualtiesPeople.clear();
    }

    this.casualtiesPeople.addAll(casualtiesPeople);
  }

  public @NonNull Collection<Vehicle> getCasualtiesVehicle() {
    return Collections.unmodifiableSet(casualtiesVehicle);
  }

  public void setCasualtiesVehicle(@NonNull Collection<Vehicle> casualtiesVehicle) {
    if (!this.casualtiesVehicle.isEmpty()) {
      this.casualtiesVehicle.clear();
    }

    this.casualtiesVehicle.addAll(casualtiesVehicle);
  }

  public @NonNull LocalDateTime getDate() {
    return dateCrash;
  }

  public void setDate(@NonNull LocalDateTime dateCrash) {
    this.dateCrash = dateCrash;
  }

  public double getDamageCost() {
    return damageCost;
  }

  public void setDamageCost(double damageCost) {
    this.damageCost = damageCost;
  }

  public @NonNull Long getId() {
    return id;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Crash crash)) {
      return false;
    }
    return Double.compare(damageCost, crash.damageCost) == 0 && Objects.equals(
        casualtiesPeople, crash.casualtiesPeople) && Objects.equals(casualtiesVehicle,
        crash.casualtiesVehicle) && Objects.equals(dateCrash, crash.dateCrash)
        && Objects.equals(id, crash.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(dateCrash, damageCost, id);
  }
}
