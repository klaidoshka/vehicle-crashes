package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.api.dto.CrashView;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class CrashMapper implements
    Function<Crash, CrashView> {

  @Override
  public CrashView apply(Crash entity) {
    return new CrashView(
        entity.getCasualtiesPeople().stream()
            .map(new PersonMapper())
            .toList(),
        entity.getCasualtiesVehicle().stream()
            .map(new VehicleMapper())
            .toList(),
        entity.getDamageCost(),
        entity.getDate(),
        entity.getId()
    );
  }
}
