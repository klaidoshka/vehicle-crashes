package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class CrashMapper implements
    Function<Crash, com.github.klaidoshka.vehiclecrashes.entity.dto.Crash> {

  @Override
  public com.github.klaidoshka.vehiclecrashes.entity.dto.Crash apply(Crash entity) {
    return new com.github.klaidoshka.vehiclecrashes.entity.dto.Crash(
        entity.getCasualtiesPeople().stream()
            .map(Person::getId)
            .toList(),
        entity.getCasualtiesVehicle().stream()
            .map(Vehicle::getId)
            .toList(),
        entity.getDate(),
        entity.getDamageCost(),
        entity.getId()
    );
  }
}
