package com.github.klaidoshka.vehiclecrashes.controller;

import com.github.klaidoshka.vehiclecrashes.api.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseValued;
import com.github.klaidoshka.vehiclecrashes.entity.Crash;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public final class CrashController extends ControllerBase<Crash, Long> {

  @Autowired
  public CrashController(@NonNull ICrashContext context) {
    super(context);
  }

  @PostMapping("/crashes")
  @Override
  public @NonNull ResponseEntity<ResponseBase> create(@NonNull @RequestBody Crash entity) {
    return super.create(entity);
  }

  @DeleteMapping("/crashes/{id}")
  @Override
  public @NonNull ResponseEntity<ResponseBase> delete(@NonNull @PathVariable Long id) {
    return super.delete(id);
  }

  @PutMapping("/crashes/{id}")
  @Override
  public @NonNull ResponseEntity<ResponseBase> edit(@NonNull Long id,
      @NonNull @RequestBody Crash entity) {
    if (!id.equals(entity.getId())) {
      return ResponseEntity.badRequest().body(ResponseBase.failure("Id mismatch"));
    }

    return super.edit(id, entity);
  }

  @GetMapping("/crashes")
  @Override
  public @NonNull Collection<Crash> get() {
    return super.get();
  }

  @GetMapping("/crashes/{id}")
  @Override
  public @NonNull ResponseEntity<ResponseValued<Crash>> get(@NonNull @PathVariable Long id) {
    return super.get(id);
  }

  @Override
  public @NonNull Class<Crash> getEntityClass() {
    return Crash.class;
  }
}
