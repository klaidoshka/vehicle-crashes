package com.github.klaidoshka.vehiclecrashes.controller;

import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseValued;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import java.util.Collection;
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
public final class PersonController extends ControllerBase<Person, Long> {

  @Autowired
  public PersonController(@NonNull ICrashContext context) {
    super(context);
  }

  @PostMapping
  @Override
  public @NonNull ResponseEntity<ResponseBase> create(@NonNull @RequestBody Person entity) {
    entity.getCarsOwned().forEach(car -> car.setPerson(entity));

    return super.create(entity);
  }

  @DeleteMapping("/{id}")
  @Override
  public @NonNull ResponseEntity<ResponseBase> delete(@NonNull @PathVariable Long id) {
    return super.delete(id);
  }

  @PutMapping("/{id}")
  @Override
  public @NonNull ResponseEntity<ResponseBase> edit(@NonNull @PathVariable Long id,
      @NonNull @RequestBody Person entity) {
    entity.getCarsOwned().forEach(car -> car.setPerson(entity));

    if (!id.equals(entity.getId())) {
      return ResponseEntity.badRequest().body(ResponseBase.failure("Id mismatch"));
    }

    return super.edit(id, entity);
  }

  @GetMapping
  @Override
  public @NonNull Collection<Person> get() {
    return super.get();
  }

  @GetMapping("/{id}")
  @Override
  public @NonNull ResponseEntity<ResponseValued<Person>> get(@NonNull @PathVariable Long id) {
    return super.get(id);
  }

  @Override
  public @NonNull Class<Person> getEntityClass() {
    return Person.class;
  }
}
