package com.github.klaidoshka.vehiclecrashes.api.dto.person;

import com.github.klaidoshka.vehiclecrashes.constant.Gender;
import com.github.klaidoshka.vehiclecrashes.api.dto.vehicleowner.VehicleOwnerViewModifiable;
import java.time.LocalDate;
import java.util.Collection;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public record PersonViewModifiable(
    @NonNull Collection<Long> crashes,
    @NonNull LocalDate dateBirth,
    @NonNull Gender gender,
    @Nullable Long id,
    @NonNull String name,
    @NonNull Collection<VehicleOwnerViewModifiable> vehiclesOwned
) {

}
