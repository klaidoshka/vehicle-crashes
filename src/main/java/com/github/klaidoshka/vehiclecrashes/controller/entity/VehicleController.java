package com.github.klaidoshka.vehiclecrashes.controller.entity;

import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.IVehicleService;
import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import com.github.klaidoshka.vehiclecrashes.entity.dto.vehicle.VehicleView;
import com.github.klaidoshka.vehiclecrashes.entity.dto.vehicle.VehicleViewModifiable;
import com.github.klaidoshka.vehiclecrashes.entity.mappers.VehicleMapper;
import com.github.klaidoshka.vehiclecrashes.entity.mappers.VehicleModifiableMapper;
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
@RequestMapping("/api/vehicles")
public final class VehicleController {

  private final ICrashContext context;
  private final IVehicleService service;
  private final VehicleMapper vehicleViewMapper;
  private final VehicleModifiableMapper vehicleViewModifiableMapper;

  @Autowired
  public VehicleController(@NonNull ICrashContext context, @NonNull IVehicleService service,
      @NonNull VehicleMapper vehicleViewMapper,
      @NonNull VehicleModifiableMapper vehicleViewModifiableMapper) {
    this.context = context;
    this.service = service;
    this.vehicleViewMapper = vehicleViewMapper;
    this.vehicleViewModifiableMapper = vehicleViewModifiableMapper;
  }

  @PostMapping
  public @NonNull ResponseEntity<Result> create(
      @NonNull @RequestBody VehicleViewModifiable entity) {
    if (!service.isValid(entity)) {
      return ResponseResolver.resolve(Result.failure("Invalid vehicle data"));
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
      @NonNull @RequestBody VehicleViewModifiable entity) {
    if (!id.equals(entity.id()) || !service.isValid(entity)) {
      return ResponseResolver.resolve(
          Result.failure("Invalid vehicle data (or id mismatch)"));
    }

    try {
      service.createOrUpdate(entity);
    } catch (IllegalArgumentException e) {
      return ResponseResolver.resolve(Result.failure(e.getMessage()));
    }

    return ResponseEntity.ok(Result.success());
  }

  @GetMapping
  public @NonNull Collection<VehicleView> get() {
    return context.findAll(Vehicle.class).getValue().stream()
        .map(vehicleViewMapper)
        .toList();
  }

  @GetMapping("/{id}")
  public @NonNull ResponseEntity<ResultTyped<VehicleView>> get(@NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(Optional.ofNullable(context.find(Vehicle.class, id).getValue())
        .map(vehicleViewMapper), "Entity not found");
  }

  @GetMapping("/modifiable")
  public @NonNull Collection<VehicleViewModifiable> getModifiable() {
    return context.findAll(Vehicle.class).getValue().stream()
        .map(vehicleViewModifiableMapper)
        .toList();
  }

  @GetMapping("/{id}/modifiable")
  public @NonNull ResponseEntity<ResultTyped<VehicleViewModifiable>> getModifiable(
      @NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(Optional.ofNullable(context.find(Vehicle.class, id).getValue())
        .map(vehicleViewModifiableMapper), "Entity not found");
  }
}
