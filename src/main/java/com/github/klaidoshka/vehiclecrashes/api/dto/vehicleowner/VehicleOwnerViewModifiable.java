package com.github.klaidoshka.vehiclecrashes.api.dto.vehicleowner;

import com.github.klaidoshka.vehiclecrashes.api.dto.vehicle.VehicleView;
import com.github.klaidoshka.vehiclecrashes.api.dto.person.PersonView;
import java.time.LocalDate;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public record VehicleOwnerViewModifiable(
    @NonNull LocalDate dateAcquisition,
    @Nullable LocalDate dateDisposal,
    @Nullable Long id,
    @NonNull PersonView person,
    @NonNull VehicleView vehicle
) {

}
