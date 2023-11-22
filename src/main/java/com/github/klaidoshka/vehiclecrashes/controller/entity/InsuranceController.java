package com.github.klaidoshka.vehiclecrashes.controller.entity;

import com.github.klaidoshka.vehiclecrashes.api.response.ResponseValued;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.entity.Insurance;
import com.github.klaidoshka.vehiclecrashes.entity.dto.InsuranceView;
import com.github.klaidoshka.vehiclecrashes.entity.mappers.InsuranceMapper;
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
@RequestMapping("/api/insurances")
public final class InsuranceController {

  private final ICrashContext context;
  private final InsuranceMapper insuranceMapper;

  @Autowired
  public InsuranceController(ICrashContext context, InsuranceMapper insuranceMapper) {
    this.context = context;
    this.insuranceMapper = insuranceMapper;
  }

  @GetMapping("/{id}")
  public @NonNull ResponseEntity<ResponseValued<InsuranceView>> get(
      @NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(
        Optional.ofNullable(context.find(Insurance.class, id).getValue())
            .map(insuranceMapper), "Entity not found");
  }
}
