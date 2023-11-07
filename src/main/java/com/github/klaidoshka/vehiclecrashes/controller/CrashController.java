package com.github.klaidoshka.vehiclecrashes.controller;

import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseValued;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.entity.dto.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.mappers.CrashMapper;
import com.github.klaidoshka.vehiclecrashes.util.ResponseResolver;
import java.util.Collection;
import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/crashes")
public final class CrashController {

  private final ICrashContext context;
  private final CrashMapper crashMapper;

  @Autowired
  public CrashController(@NonNull ICrashContext context, @NonNull CrashMapper crashMapper) {
    this.context = context;
    this.crashMapper = crashMapper;
  }

  @PostMapping
  public @NonNull ResponseEntity<ResponseBase> create(@NonNull @RequestBody Crash entity) {
    return ResponseResolver.resolve(context.save(entity));
  }

  @DeleteMapping("/{id}")
  public @NonNull ResponseEntity<ResponseBase> delete(@NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(
        context.deleteById(com.github.klaidoshka.vehiclecrashes.entity.Crash.class, id));
  }

  @PutMapping("/{id}")
  public @NonNull ResponseEntity<ResponseBase> edit(@NonNull @PathVariable Long id,
      @NonNull @RequestBody Crash entity) {
    final Optional<com.github.klaidoshka.vehiclecrashes.entity.Crash> crash = context.find(
            com.github.klaidoshka.vehiclecrashes.entity.Crash.class, id)
        .map(c -> {
          c.setDate(entity.dateCrash());
          c.setDamageCost(entity.damageCost());

          c.setCasualtiesPeople(entity.casualtiesPeople().stream()
              .filter(Objects::nonNull)
              .map(personId -> context.find(
                      com.github.klaidoshka.vehiclecrashes.entity.Person.class, personId)
                  .orElseThrow())
              .toList());
          c.setCasualtiesVehicle(entity.casualtiesVehicle().stream()
              .filter(Objects::nonNull)
              .map(vehicleId -> context.find(
                      com.github.klaidoshka.vehiclecrashes.entity.Vehicle.class, vehicleId)
                  .orElseThrow())
              .toList());

          return c;
        });

    return crash.map(v -> ResponseResolver.resolve(context.save(v)))
        .orElseGet(() -> ResponseEntity.badRequest().build());
  }

  @GetMapping
  public @NonNull Collection<Crash> get() {
    return context.get(com.github.klaidoshka.vehiclecrashes.entity.Crash.class).stream()
        .map(crashMapper)
        .toList();
  }

  @GetMapping("/{id}")
  public @NonNull ResponseEntity<ResponseValued<Crash>> get(@NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(
        context.find(com.github.klaidoshka.vehiclecrashes.entity.Crash.class, id)
            .map(crashMapper),
        "Entity not found");
  }
}
