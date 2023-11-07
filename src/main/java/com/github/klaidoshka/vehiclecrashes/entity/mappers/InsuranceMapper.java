package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.Insurance;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class InsuranceMapper implements
    Function<Insurance, com.github.klaidoshka.vehiclecrashes.entity.dto.Insurance> {

  @Override
  public com.github.klaidoshka.vehiclecrashes.entity.dto.Insurance apply(Insurance entity) {
    return new com.github.klaidoshka.vehiclecrashes.entity.dto.Insurance(
        entity.getDateInitialization(),
        entity.getDateExpiration(),
        entity.getId(),
        entity.getVehicle().getId()
    );
  }
}
