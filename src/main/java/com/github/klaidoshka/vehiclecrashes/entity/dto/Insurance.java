package com.github.klaidoshka.vehiclecrashes.entity.dto;

import java.time.LocalDate;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public record Insurance(
    @NonNull LocalDate dateInitialization,
    @NonNull LocalDate dateExpiration,
    @Nullable Long id,
    @NonNull Long vehicleId
) {

}
