package com.github.klaidoshka.vehiclecrashes.entity.dto;

import com.github.klaidoshka.vehiclecrashes.entity.dto.person.PersonView;
import com.github.klaidoshka.vehiclecrashes.entity.dto.vehicle.VehicleView;
import java.time.LocalDateTime;
import java.util.Collection;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public record CrashView(
    @NonNull Collection<PersonView> casualtiesPeople,
    @NonNull Collection<VehicleView> casualtiesVehicle,
    double damageCost,
    @NonNull LocalDateTime dateCrash,
    @Nullable Long id
) {

}
