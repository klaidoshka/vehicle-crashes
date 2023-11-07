package com.github.klaidoshka.vehiclecrashes.entity.dto;

import java.time.LocalDate;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public record VehicleOwner(
    @NonNull LocalDate dateAcquisition,
    @Nullable LocalDate dateDisposal,
    @Nullable Long id,
    @NonNull Long personId,
    @NonNull Long vehicleId
) {

}
