package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner;
import com.github.klaidoshka.vehiclecrashes.entity.dto.person.PersonView;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class PersonMapper implements
    Function<Person, PersonView> {

  @Override
  public PersonView apply(Person entity) {
    return new PersonView(
        entity.getCrashes().stream()
            .map(Crash::getId)
            .toList(),
        entity.getDateBirth(),
        entity.getGender(),
        entity.getId(),
        entity.getName(),
        entity.getVehiclesOwned().stream()
            .map(VehicleOwner::getId)
            .toList()
    );
  }
}
