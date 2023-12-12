package com.github.klaidoshka.vehiclecrashes.api.dto;

import java.time.LocalDate;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public record InsuranceView(
    @NonNull LocalDate dateInitialization,
    @NonNull LocalDate dateExpiration,
    @Nullable Long id,
    @NonNull Long vehicleId
) {

}
