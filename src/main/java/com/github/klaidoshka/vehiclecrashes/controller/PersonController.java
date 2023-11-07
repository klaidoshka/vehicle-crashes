package com.github.klaidoshka.vehiclecrashes.controller;

import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseValued;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.entity.dto.Person;
import com.github.klaidoshka.vehiclecrashes.entity.mappers.PersonMapper;
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
@RequestMapping("/api/people")
public final class PersonController {

  private final ICrashContext context;
  private final PersonMapper personMapper;

  @Autowired
  public PersonController(@NonNull ICrashContext context, @NonNull PersonMapper personMapper) {
    this.context = context;
    this.personMapper = personMapper;
  }

  @PostMapping
  public @NonNull ResponseEntity<ResponseBase> create(@NonNull @RequestBody Person entity) {
    return ResponseResolver.resolve(context.save(entity));
  }

  @DeleteMapping("/{id}")
  public @NonNull ResponseEntity<ResponseBase> delete(@NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(
        context.deleteById(com.github.klaidoshka.vehiclecrashes.entity.Person.class, id));
  }

  @PutMapping("/{id}")
  public @NonNull ResponseEntity<ResponseBase> edit(@NonNull @PathVariable Long id,
      @NonNull @RequestBody Person entity) {
    final Optional<com.github.klaidoshka.vehiclecrashes.entity.Person> person = context.find(
            com.github.klaidoshka.vehiclecrashes.entity.Person.class, id)
        .map(p -> {
          p.setGender(entity.gender());
          p.setName(entity.name());
          p.setDateBirth(entity.dateBirth());

          p.setCrashes(entity.crashes().stream()
              .filter(Objects::nonNull)
              .map(crashId -> context.find(
                      com.github.klaidoshka.vehiclecrashes.entity.Crash.class, crashId)
                  .orElseThrow())
              .toList());

          p.setVehiclesOwned(entity.vehiclesOwned().stream()
              .filter(Objects::nonNull)
              .map(vehicleOwnerId -> context.find(
                      com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner.class,
                      vehicleOwnerId)
                  .orElseThrow())
              .toList());

          return p;
        });

    return person.map(v -> ResponseResolver.resolve(context.save(v)))
        .orElseGet(() -> ResponseEntity.badRequest().build());
  }

  @GetMapping
  public @NonNull Collection<Person> get() {
    return context.get(com.github.klaidoshka.vehiclecrashes.entity.Person.class).stream()
        .map(personMapper)
        .toList();
  }

  @GetMapping("/{id}")
  public @NonNull ResponseEntity<ResponseValued<Person>> get(@NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(
        context.find(com.github.klaidoshka.vehiclecrashes.entity.Person.class, id)
            .map(personMapper),
        "Entity not found");
  }
}
