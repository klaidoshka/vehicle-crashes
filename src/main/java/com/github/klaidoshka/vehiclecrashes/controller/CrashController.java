package com.github.klaidoshka.vehiclecrashes.controller;

import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseValued;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashService;
import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.dto.CrashView;
import com.github.klaidoshka.vehiclecrashes.entity.mappers.CrashMapper;
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
@RequestMapping("/api/crashes")
public final class CrashController {

  private final ICrashContext context;
  private final ICrashService service;
  private final CrashMapper crashMapper;

  @Autowired
  public CrashController(@NonNull ICrashContext context, @NonNull ICrashService service,
      @NonNull CrashMapper crashMapper) {
    this.context = context;
    this.service = service;
    this.crashMapper = crashMapper;
  }

  @PostMapping
  public @NonNull ResponseEntity<ResponseBase> create(@NonNull @RequestBody CrashView entity) {
    if (!service.isValid(entity)) {
      return ResponseResolver.resolve(ResponseBase.failure("Invalid entity data"));
    }

    return ResponseResolver.resolve(context.createOrUpdate(service.merge(new Crash(), entity)));
  }

  @DeleteMapping("/{id}")
  public @NonNull ResponseEntity<ResponseBase> delete(@NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(context.deleteById(Crash.class, id));
  }

  @PutMapping("/{id}")
  public @NonNull ResponseEntity<ResponseBase> edit(@NonNull @PathVariable Long id,
      @NonNull @RequestBody CrashView entity) {
    if (!service.isValid(entity)) {
      return ResponseResolver.resolve(ResponseBase.failure("Invalid entity data"));
    }

    return Optional.ofNullable(context.find(Crash.class, id).getValue())
        .map(v -> service.merge(v, entity))
        .map(v -> ResponseResolver.resolve(context.createOrUpdate(v)))
        .orElseGet(() -> ResponseEntity.badRequest().build());
  }

  @GetMapping
  public @NonNull Collection<CrashView> get() {
    return context.findAll(Crash.class).getValue().stream()
        .map(crashMapper)
        .toList();
  }

  @GetMapping("/{id}")
  public @NonNull ResponseEntity<ResponseValued<CrashView>> get(@NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(Optional.ofNullable(context.find(Crash.class, id).getValue())
        .map(crashMapper), "Entity not found");
  }
}
