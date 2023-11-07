package com.github.klaidoshka.vehiclecrashes.controller;

import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseValued;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.entity.dto.Vehicle;
import com.github.klaidoshka.vehiclecrashes.entity.mappers.VehicleMapper;
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
@RequestMapping("/api/vehicles")
public final class VehicleController {

  private final ICrashContext context;
  private final VehicleMapper vehicleMapper;

  @Autowired
  public VehicleController(@NonNull ICrashContext context, @NonNull VehicleMapper vehicleMapper) {
    this.context = context;
    this.vehicleMapper = vehicleMapper;
  }

  @PostMapping
  public @NonNull ResponseEntity<ResponseBase> create(@NonNull @RequestBody Vehicle entity) {
    return ResponseResolver.resolve(context.save(entity));
  }

  @DeleteMapping("/{id}")
  public @NonNull ResponseEntity<ResponseBase> delete(@NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(
        context.deleteById(com.github.klaidoshka.vehiclecrashes.entity.Vehicle.class, id));
  }

  @PutMapping("/{id}")
  public @NonNull ResponseEntity<ResponseBase> edit(@NonNull @PathVariable Long id,
      @NonNull @RequestBody Vehicle entity) {
    final Optional<com.github.klaidoshka.vehiclecrashes.entity.Vehicle> vehicle = context.find(
            com.github.klaidoshka.vehiclecrashes.entity.Vehicle.class, id)
        .map(v -> {
          v.setColor(entity.color());
          v.setDateManufacture(entity.dateManufacture());
          v.setPlate(entity.plate());
          v.setType(entity.type());

          v.setCrashes(entity.crashes().stream()
              .filter(Objects::nonNull)
              .map(crashId -> context.find(
                      com.github.klaidoshka.vehiclecrashes.entity.Crash.class, crashId)
                  .orElseThrow())
              .toList());

          v.setInsurances(entity.insurances().stream()
              .filter(Objects::nonNull)
              .map(insuranceId -> context.find(
                      com.github.klaidoshka.vehiclecrashes.entity.Insurance.class,
                      insuranceId)
                  .orElseThrow())
              .toList());

          v.setOwners(entity.owners().stream()
              .filter(Objects::nonNull)
              .map(ownerId -> context.find(
                      com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner.class,
                      ownerId)
                  .orElseThrow())
              .toList());

          return v;
        });

    return vehicle.map(v -> ResponseResolver.resolve(context.save(v)))
        .orElseGet(() -> ResponseEntity.badRequest().build());
  }

  @GetMapping
  public @NonNull Collection<Vehicle> get() {
    return context.get(com.github.klaidoshka.vehiclecrashes.entity.Vehicle.class).stream()
        .map(vehicleMapper)
        .toList();
  }

  @GetMapping("/{id}")
  public @NonNull ResponseEntity<ResponseValued<Vehicle>> get(@NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(
        context.find(com.github.klaidoshka.vehiclecrashes.entity.Vehicle.class, id)
            .map(vehicleMapper),
        "Entity not found");
  }
}
