package com.github.klaidoshka.vehiclecrashes.api.dto;

import java.time.LocalDateTime;
import java.util.Collection;
import org.springframework.lang.NonNull;

public record CrashXlsx(
    @NonNull LocalDateTime dateCrash,
    double damageCost,
    @NonNull Collection<String> casualtiesPeople,
    @NonNull Collection<String> casualtiesVehicle
) {

}
