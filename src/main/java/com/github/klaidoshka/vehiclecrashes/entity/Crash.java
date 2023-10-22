package com.github.klaidoshka.vehiclecrashes.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import org.springframework.lang.NonNull;

@Entity
public final class Crash {

  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(
      name = "CrashCasualtiesPeople",
      joinColumns = @JoinColumn(name = "crash"),
      inverseJoinColumns = @JoinColumn(name = "people")
  )
  private Set<Person> casualtiesPeople;

  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(
      name = "CrashCasualtiesVehicle",
      joinColumns = @JoinColumn(name = "crash"),
      inverseJoinColumns = @JoinColumn(name = "vehicle")
  )
  private Set<Vehicle> casualtiesVehicle;

  @Column(nullable = false)
  private LocalDateTime dateCrash;

  @Column(
      nullable = false,
      precision = 2)
  private double damageCost;

  @Id
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
    this.casualtiesPeople = new HashSet<>(casualtiesPeople);
  }

  public @NonNull Collection<Vehicle> getCasualtiesVehicle() {
    return Collections.unmodifiableSet(casualtiesVehicle);
  }

  public void setCasualtiesVehicle(@NonNull Collection<Vehicle> casualtiesVehicle) {
    this.casualtiesVehicle = new HashSet<>(casualtiesVehicle);
  }

  public @NonNull LocalDateTime getDateCrash() {
    return dateCrash;
  }

  public void setDateCrash(@NonNull LocalDateTime dateCrash) {
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
    return Objects.hash(casualtiesPeople, casualtiesVehicle, dateCrash, damageCost, id);
  }
}
