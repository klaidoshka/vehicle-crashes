package com.github.klaidoshka.vehiclecrashes.entity.dto;

import com.github.klaidoshka.vehiclecrashes.constant.Gender;
import java.time.LocalDate;
import java.util.Collection;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public record Person(
    @NonNull Collection<Long> crashes,
    @NonNull LocalDate dateBirth,
    @NonNull Gender gender,
    @Nullable Long id,
    @NonNull String name,
    @NonNull Collection<Long> vehiclesOwned
) {

}
