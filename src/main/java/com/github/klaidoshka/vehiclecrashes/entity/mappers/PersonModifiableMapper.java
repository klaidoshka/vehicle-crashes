package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.dto.person.PersonViewModifiable;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class PersonModifiableMapper implements Function<Person, PersonViewModifiable> {

  @Override
  public PersonViewModifiable apply(Person entity) {
    return new PersonViewModifiable(
        entity.getCrashes().stream()
            .map(Crash::getId)
            .toList(),
        entity.getDateBirth(),
        entity.getGender(),
        entity.getId(),
        entity.getName(),
        entity.getVehiclesOwned().stream()
            .map(new VehicleOwnerModifiableMapper())
            .toList()
    );
  }
}
