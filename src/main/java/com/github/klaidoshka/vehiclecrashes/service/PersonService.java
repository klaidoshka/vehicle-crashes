package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.IPersonService;
import com.github.klaidoshka.vehiclecrashes.api.service.IVehicleOwnerService;
import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner;
import com.github.klaidoshka.vehiclecrashes.entity.dto.PersonViewModifiable;
import java.time.LocalDate;
import java.util.Objects;
import java.util.function.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public final class PersonService implements IPersonService {

  private final ICrashContext context;
  private final IVehicleOwnerService vehicleOwnerService;

  @Autowired
  public PersonService(@NonNull ICrashContext context, @NonNull IVehicleOwnerService vehicleOwnerService) {
    this.context = context;
    this.vehicleOwnerService = vehicleOwnerService;
  }

  @Override
  public boolean isValid(PersonViewModifiable person) {
    if (person.dateBirth().isAfter(LocalDate.now())) {
      return false;
    }

    if (person.name().isBlank()) {
      return false;
    } else {
      for (char c : person.name().toCharArray()) {
        if (Character.isDigit(c) || !Character.isWhitespace(c) && !Character.isLetter(c)) {
          return false;
        }
      }
    }

    return person.vehiclesOwned().stream().noneMatch(Predicate.not(vehicleOwnerService::isValid));
  }

  @Override
  public Person merge(Person person, PersonViewModifiable personView) {
    person.setGender(personView.gender());

    person.setName(personView.name());

    person.setDateBirth(personView.dateBirth());

    person.setCrashes(personView.crashes().stream()
        .filter(Objects::nonNull)
        .map(id -> context.find(Crash.class, id).getValue())
        .filter(Objects::nonNull)
        .toList());

    person.setVehiclesOwned(personView.vehiclesOwned().stream()
        .filter(Objects::nonNull)
        .map(vo -> {
          if (vo.id() != null) {
            return context.find(VehicleOwner.class, vo.id()).getValue();
          }

          final Vehicle vehicle = context.find(Vehicle.class, vo.personId()).getValue();

          if (vehicle == null) {
            return null;
          }

          return new VehicleOwner(vo.dateAcquisition(), vo.dateDisposal(), person, vehicle);
        })
        .filter(Objects::nonNull)
        .toList());

    return person;
  }
}
