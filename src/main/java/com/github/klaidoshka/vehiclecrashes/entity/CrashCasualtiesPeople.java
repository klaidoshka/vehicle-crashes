package com.github.klaidoshka.vehiclecrashes.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.util.Objects;
import org.springframework.lang.NonNull;

@Entity
public final class CrashCasualtiesPeople {

  @Id
  @Column(nullable = false)
  private Long id;

  @ManyToOne
  private Crash crash;

  @ManyToOne
  private Person person;

  public CrashCasualtiesPeople() {
  }

  public CrashCasualtiesPeople(@NonNull Long id, @NonNull Crash crash, @NonNull Person person) {
    this.id = id;
    this.crash = crash;
    this.person = person;
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

  public @NonNull Person getPerson() {
    return person;
  }

  public void setPerson(@NonNull Person person) {
    this.person = person;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof CrashCasualtiesPeople that)) {
      return false;
    }
    return Objects.equals(id, that.id) && Objects.equals(crash, that.crash)
        && Objects.equals(person, that.person);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, crash, person);
  }
}
