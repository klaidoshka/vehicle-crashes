package com.github.klaidoshka.vehiclecrashes.entity.dto;

import java.time.LocalDateTime;
import java.util.Collection;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public record Crash(
    @NonNull Collection<Long> casualtiesPeople,
    @NonNull Collection<Long> casualtiesVehicle,
    @NonNull LocalDateTime dateCrash,
    double damageCost,
    @Nullable Long id
) {

}
