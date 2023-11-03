package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.IVehicleTypesFiller;
import com.github.klaidoshka.vehiclecrashes.entity.VehicleType;
import java.util.Map;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public final class VehicleTypesFiller implements IVehicleTypesFiller {

  private static final Logger LOGGER = LoggerFactory.getLogger(VehicleTypesFiller.class);

  private final ICrashContext context;

  @Autowired
  public VehicleTypesFiller(@NonNull ICrashContext context) {
    this.context = context;
  }

  @Override
  public void fillMissing() {
    final Map<com.github.klaidoshka.vehiclecrashes.constant.VehicleType, VehicleType> types =
        context.get(VehicleType.class).stream()
            .collect(Collectors.toMap(VehicleType::getType, v -> v));

    for (com.github.klaidoshka.vehiclecrashes.constant.VehicleType type : com.github.klaidoshka.vehiclecrashes.constant.VehicleType.values()) {
      LOGGER.info("Checking type [{}]. Is stored within database: {}", type,
          types.containsKey(type));

      if (!types.containsKey(type)) {
        context.save(new VehicleType(type.getId(), type));
      }
    }
  }
}
