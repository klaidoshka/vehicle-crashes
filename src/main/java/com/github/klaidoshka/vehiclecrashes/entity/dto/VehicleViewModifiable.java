package com.github.klaidoshka.vehiclecrashes.entity.dto;

import com.github.klaidoshka.vehiclecrashes.constant.VehicleType;
import java.time.LocalDate;
import java.util.Collection;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public record VehicleViewModifiable(
    @NonNull String color,
    @NonNull Collection<Long> crashes,
    @NonNull LocalDate dateManufacture,
    @Nullable Long id,
    @NonNull Collection<InsuranceView> insurances,
    @NonNull Collection<VehicleOwnerViewModifiable> owners,
    @NonNull String plate,
    @NonNull VehicleType type
) {

}
