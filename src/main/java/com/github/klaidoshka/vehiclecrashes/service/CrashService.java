package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashService;
import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import com.github.klaidoshka.vehiclecrashes.entity.dto.CrashView;
import java.time.LocalDateTime;
import java.util.Objects;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public final class CrashService implements ICrashService {

  private final ICrashContext context;

  public CrashService(@NonNull ICrashContext context) {
    this.context = context;
  }

  @Override
  public boolean isValid(@NonNull CrashView crash) {
    if (crash.dateCrash().isAfter(LocalDateTime.now())) {
      return false;
    }

    return !(crash.damageCost() < 0);
  }

  @Override
  public Crash merge(Crash crash, CrashView crashView) {
    crash.setDate(crashView.dateCrash());

    crash.setDamageCost(crashView.damageCost());

    crash.setCasualtiesPeople(crashView.casualtiesPeople().stream()
        .filter(Objects::nonNull)
        .map(id -> context.find(Person.class, id).getValue())
        .filter(Objects::nonNull)
        .toList());

    crash.setCasualtiesVehicle(crashView.casualtiesVehicle().stream()
        .filter(Objects::nonNull)
        .map(id -> context.find(Vehicle.class, id).getValue())
        .filter(Objects::nonNull)
        .toList());

    return crash;
  }
}
