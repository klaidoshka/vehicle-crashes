package com.github.klaidoshka.vehiclecrashes.controller.entity;

import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.IPersonService;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.dto.person.PersonView;
import com.github.klaidoshka.vehiclecrashes.entity.dto.person.PersonViewModifiable;
import com.github.klaidoshka.vehiclecrashes.entity.mappers.PersonMapper;
import com.github.klaidoshka.vehiclecrashes.entity.mappers.PersonModifiableMapper;
import com.github.klaidoshka.vehiclecrashes.util.ResponseResolver;
import java.util.Collection;
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
  private final IPersonService service;
  private final PersonMapper personViewMapper;
  private final PersonModifiableMapper personViewModifiableMapper;

  @Autowired
  public PersonController(@NonNull ICrashContext context, @NonNull IPersonService service,
      @NonNull PersonMapper personViewMapper,
      @NonNull PersonModifiableMapper personViewModifiableMapper) {
    this.context = context;
    this.service = service;
    this.personViewMapper = personViewMapper;
    this.personViewModifiableMapper = personViewModifiableMapper;
  }

  @PostMapping
  public @NonNull ResponseEntity<Result> create(
      @NonNull @RequestBody PersonViewModifiable entity) {
    if (!service.isValid(entity)) {
      return ResponseResolver.resolve(Result.failure("Invalid person data"));
    }

    try {
      service.createOrUpdate(entity);
    } catch (IllegalArgumentException e) {
      return ResponseResolver.resolve(Result.failure(e.getMessage()));
    }

    return ResponseEntity.ok(Result.success());
  }

  @DeleteMapping("/{id}")
  public @NonNull ResponseEntity<Result> delete(@NonNull @PathVariable Long id) {
    try {
      service.deleteById(id);

      return ResponseEntity.ok(Result.success());
    } catch (IllegalArgumentException e) {
      return ResponseResolver.resolve(Result.failure(e.getMessage()));
    }
  }

  @PutMapping("/{id}")
  public @NonNull ResponseEntity<Result> edit(@NonNull @PathVariable Long id,
      @NonNull @RequestBody PersonViewModifiable entity) {
    if (!id.equals(entity.id()) || !service.isValid(entity)) {
      return ResponseResolver.resolve(Result.failure("Invalid person data (or id mismatch)"));
    }

    try {
      service.createOrUpdate(entity);
    } catch (IllegalArgumentException e) {
      return ResponseResolver.resolve(Result.failure(e.getMessage()));
    }

    return ResponseEntity.ok(Result.success());
  }

  @GetMapping
  public @NonNull Collection<PersonView> get() {
    return context.findAll(Person.class).getValue().stream()
        .map(personViewMapper)
        .toList();
  }

  @GetMapping("/{id}")
  public @NonNull ResponseEntity<ResultTyped<PersonView>> get(@NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(Optional.ofNullable(context.find(Person.class, id).getValue())
        .map(personViewMapper), "Entity not found");
  }

  @GetMapping("/modifiable")
  public @NonNull Collection<PersonViewModifiable> getModifiable() {
    return context.findAll(Person.class).getValue().stream()
        .map(personViewModifiableMapper)
        .toList();
  }

  @GetMapping("/{id}/modifiable")
  public @NonNull ResponseEntity<ResultTyped<PersonViewModifiable>> getModifiable(
      @NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(Optional.ofNullable(context.find(Person.class, id).getValue())
        .map(personViewModifiableMapper), "Entity not found");
  }
}
