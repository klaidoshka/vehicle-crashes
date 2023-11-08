package com.github.klaidoshka.vehiclecrashes.entity.dto;

import com.github.klaidoshka.vehiclecrashes.constant.VehicleType;
import java.time.LocalDate;
import java.util.Collection;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public record VehicleView(
    @NonNull String color,
    @NonNull Collection<Long> crashes,
    @NonNull LocalDate dateManufacture,
    @Nullable Long id,
    @NonNull Collection<Long> insurances,
    @NonNull Collection<Long> owners,
    @NonNull String plate,
    @NonNull VehicleType type
) {

}
