package com.github.klaidoshka.vehiclecrashes.entity.dto;

import java.time.LocalDate;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public record VehicleOwnerView(
    @NonNull LocalDate dateAcquisition,
    @Nullable LocalDate dateDisposal,
    @Nullable Long id,
    @NonNull Long personId,
    @NonNull Long vehicleId
) {

}
