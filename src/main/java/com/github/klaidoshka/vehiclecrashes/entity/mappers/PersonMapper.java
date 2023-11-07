package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class PersonMapper implements
    Function<Person, com.github.klaidoshka.vehiclecrashes.entity.dto.Person> {

  @Override
  public com.github.klaidoshka.vehiclecrashes.entity.dto.Person apply(Person entity) {
    return new com.github.klaidoshka.vehiclecrashes.entity.dto.Person(
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
