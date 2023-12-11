package com.github.klaidoshka.vehiclecrashes.controller.entity;

import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner;
import com.github.klaidoshka.vehiclecrashes.entity.dto.vehicleowner.VehicleOwnerView;
import com.github.klaidoshka.vehiclecrashes.entity.mappers.VehicleOwnerMapper;
import com.github.klaidoshka.vehiclecrashes.util.ResponseResolver;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vehicleOwners")
public final class VehicleOwnerController {

  private final ICrashContext context;
  private final VehicleOwnerMapper vehicleOwnerMapper;

  @Autowired
  public VehicleOwnerController(ICrashContext context, VehicleOwnerMapper vehicleOwnerMapper) {
    this.context = context;
    this.vehicleOwnerMapper = vehicleOwnerMapper;
  }

  @GetMapping("/{id}")
  public @NonNull ResponseEntity<ResultTyped<VehicleOwnerView>> get(
      @NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(
        Optional.ofNullable(context.find(VehicleOwner.class, id).getValue())
            .map(vehicleOwnerMapper), "Entity not found");
  }
}
