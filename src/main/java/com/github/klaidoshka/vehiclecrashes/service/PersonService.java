package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.IPersonService;
import com.github.klaidoshka.vehiclecrashes.api.service.IVehicleOwnerService;
import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner;
import com.github.klaidoshka.vehiclecrashes.api.dto.person.PersonViewModifiable;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public final class PersonService implements IPersonService {

  private final ICrashContext context;
  private final IVehicleOwnerService vehicleOwnerService;

  @Autowired
  public PersonService(@NonNull ICrashContext context,
      @NonNull IVehicleOwnerService vehicleOwnerService) {
    this.context = context;
    this.vehicleOwnerService = vehicleOwnerService;
  }

  @Override
  public boolean isValid(@NonNull PersonViewModifiable person) {
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
  public void createOrUpdate(@NonNull PersonViewModifiable personView) {
    context.wrappedUpdate(m -> {
      final Person person;

      if (personView.id() != null) {
        person = Optional.ofNullable(m.find(Person.class, personView.id()))
            .orElseThrow(() -> new IllegalArgumentException(
                "Person with id " + personView.id() + " not found"));
      } else {
        person = new Person();
      }

      person.setGender(personView.gender());

      person.setName(personView.name());

      person.setDateBirth(personView.dateBirth());

      person.setCrashes(personView.crashes().stream()
          .map(id -> id != null ? m.find(Crash.class, id) : null)
          .filter(Objects::nonNull)
          .toList());

      person.setVehiclesOwned(personView.vehiclesOwned().stream()
          .map(vo -> {
            if (vo.id() != null) {
              final VehicleOwner vehicleOwner = m.find(VehicleOwner.class, vo.id());

              if (vehicleOwner != null) {
                vehicleOwner.setDateAcquisition(vo.dateAcquisition());

                vehicleOwner.setDateDisposal(vo.dateDisposal());

                vehicleOwner.setPerson(person);
              }

              return vehicleOwner;
            } else if (vo.vehicle().id() == null) {
              return null;
            }

            final Vehicle vehicle = m.find(Vehicle.class, vo.vehicle().id());

            return vehicle != null
                   ? new VehicleOwner(vo.dateAcquisition(), vo.dateDisposal(), person, vehicle)
                   : null;
          })
          .filter(Objects::nonNull)
          .toList());

      person.getVehiclesOwned().forEach(vo ->
          vo.getVehicle().setOwners(vo.getVehicle().getOwners().stream()
              .filter(o -> !o.getPerson().getId().equals(person.getId()) ||
                  person.getVehiclesOwned().contains(o))
              .toList()));

      m.merge(person);
    });
  }

  @Override
  public void deleteById(@NonNull Long id) {
    context.wrappedUpdate(m -> {
      final Person person = m.find(Person.class, id);

      if (person == null) {
        throw new IllegalArgumentException("Person with id " + id + " not found");
      }

      person.getCrashes().forEach(c -> c.setCasualtiesPeople(c.getCasualtiesPeople().stream()
          .filter(p -> !p.getId().equals(person.getId()))
          .toList()));

      person.getVehiclesOwned().forEach(vo -> {
        final Vehicle vehicle = vo.getVehicle();

        vehicle.setOwners(vehicle.getOwners().stream()
            .filter(o -> !o.getPerson().getId().equals(person.getId()))
            .toList());
      });

      person.getVehiclesOwned().forEach(m::remove);

      person.setCrashes(List.of());
      person.setVehiclesOwned(List.of());

      m.merge(person);

      m.remove(person);
    });
  }
}
