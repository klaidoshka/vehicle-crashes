package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashService;
import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import com.github.klaidoshka.vehiclecrashes.api.dto.CrashView;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
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

  @NonNull
  @Override
  public void createOrUpdate(@NonNull CrashView crashView) {
    context.wrappedUpdate(m -> {
      final Crash crash;

      if (crashView.id() != null) {
        crash = m.find(Crash.class, crashView.id());
      } else {
        crash = new Crash();
      }

      crash.setDate(crashView.dateCrash());
      crash.setDamageCost(crashView.damageCost());

      crash.setCasualtiesPeople(crashView.casualtiesPeople().stream()
          .map(p -> m.find(Person.class, p.id()))
          .filter(Objects::nonNull)
          .toList());

      crash.getCasualtiesPeople().forEach(p -> {
        final Collection<Crash> crashes = new ArrayList<>(p.getCrashes());

        crashes.add(crash);

        p.setCrashes(crashes);
      });

      crash.setCasualtiesVehicle(crashView.casualtiesVehicle().stream()
          .map(v -> m.find(Vehicle.class, v.id()))
          .filter(Objects::nonNull)
          .toList());

      crash.getCasualtiesVehicle().forEach(v -> {
        final Collection<Crash> crashes = new ArrayList<>(v.getCrashes());

        crashes.add(crash);

        v.setCrashes(crashes);
      });

      m.merge(crash);
    });
  }

  @Override
  public void deleteById(@NonNull Long id) {
    context.wrappedUpdate(m -> {
      Crash crash = m.find(Crash.class, id);

      if (crash == null) {
        throw new IllegalArgumentException("Crash with id " + id + " not found");
      }

      crash.getCasualtiesPeople().forEach(p -> p.setCrashes(p.getCrashes().stream()
          .filter(c -> !c.getId().equals(crash.getId()))
          .toList()));

      crash.getCasualtiesVehicle().forEach(v -> v.setCrashes(v.getCrashes().stream()
          .filter(c -> !c.getId().equals(crash.getId()))
          .toList()));

      crash.setCasualtiesPeople(List.of());
      crash.setCasualtiesVehicle(List.of());

      m.merge(crash);

      m.remove(crash);
    });
  }
}
