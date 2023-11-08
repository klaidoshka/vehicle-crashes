package com.github.klaidoshka.vehiclecrashes.entity.mappers;

import com.github.klaidoshka.vehiclecrashes.entity.Insurance;
import com.github.klaidoshka.vehiclecrashes.entity.dto.InsuranceView;
import java.util.function.Function;
import org.springframework.stereotype.Component;

@Component
public final class InsuranceMapper implements
    Function<Insurance, InsuranceView> {

  @Override
  public InsuranceView apply(Insurance entity) {
    return new InsuranceView(
        entity.getDateInitialization(),
        entity.getDateExpiration(),
        entity.getId(),
        entity.getVehicle().getId()
    );
  }
}
