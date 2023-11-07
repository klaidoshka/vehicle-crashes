package com.github.klaidoshka.vehiclecrashes.entity;

import com.github.klaidoshka.vehiclecrashes.constant.Gender;
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
import jakarta.persistence.OneToMany;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import org.springframework.lang.NonNull;

@Entity
public final class Person {

  @ManyToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.EAGER
  )
  @JoinTable(
      name = "CrashCasualtiesPeople",
      joinColumns = @JoinColumn(name = "person"),
      inverseJoinColumns = @JoinColumn(name = "crash")
  )
  private Set<Crash> crashes = new HashSet<>();

  @Column(nullable = false)
  private LocalDate dateBirth;

  @Column(nullable = false)
  private Gender gender;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long id;

  @Column(nullable = false)
  private String name;

  @OneToMany(
      cascade = CascadeType.ALL,
      fetch = FetchType.EAGER,
      mappedBy = "person"
  )
  private Set<VehicleOwner> vehiclesOwned = new HashSet<>();

  public Person() {
  }

  public Person(@NonNull LocalDate dateBirth, @NonNull Gender gender, @NonNull Long id,
      @NonNull String name) {
    this.dateBirth = dateBirth;
    this.gender = gender;
    this.id = id;
    this.name = name;
  }

  public @NonNull Collection<VehicleOwner> getVehiclesOwned() {
    return Collections.unmodifiableSet(vehiclesOwned);
  }

  public void setVehiclesOwned(@NonNull Collection<VehicleOwner> vehiclesOwned) {
    this.vehiclesOwned = new HashSet<>(vehiclesOwned);
  }

  public @NonNull Collection<Crash> getCrashes() {
    return Collections.unmodifiableSet(crashes);
  }

  public void setCrashes(@NonNull Collection<Crash> crashes) {
    this.crashes = new HashSet<>(crashes);
  }

  public @NonNull LocalDate getDateBirth() {
    return dateBirth;
  }

  public void setDateBirth(@NonNull LocalDate dateBirth) {
    this.dateBirth = dateBirth;
  }

  public @NonNull Gender getGender() {
    return gender;
  }

  public void setGender(@NonNull Gender gender) {
    this.gender = gender;
  }

  public @NonNull Long getId() {
    return id;
  }

  public @NonNull String getName() {
    return name;
  }

  public void setName(@NonNull String name) {
    this.name = name;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Person person)) {
      return false;
    }
    return Objects.equals(vehiclesOwned, person.vehiclesOwned) && Objects.equals(crashes,
        person.crashes) && Objects.equals(dateBirth, person.dateBirth)
        && gender == person.gender && Objects.equals(id, person.id)
        && Objects.equals(name, person.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(dateBirth, gender, id, name);
  }
}
