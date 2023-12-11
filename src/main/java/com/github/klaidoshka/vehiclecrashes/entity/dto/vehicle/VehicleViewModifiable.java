package com.github.klaidoshka.vehiclecrashes.entity.dto.vehicle;

import com.github.klaidoshka.vehiclecrashes.constant.VehicleType;
import com.github.klaidoshka.vehiclecrashes.entity.dto.InsuranceView;
import com.github.klaidoshka.vehiclecrashes.entity.dto.vehicleowner.VehicleOwnerViewModifiable;
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
