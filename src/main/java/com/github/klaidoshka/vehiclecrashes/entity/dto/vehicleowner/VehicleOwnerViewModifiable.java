package com.github.klaidoshka.vehiclecrashes.entity.dto.vehicleowner;

import com.github.klaidoshka.vehiclecrashes.entity.dto.person.PersonView;
import com.github.klaidoshka.vehiclecrashes.entity.dto.vehicle.VehicleView;
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
