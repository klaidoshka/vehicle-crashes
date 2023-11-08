package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.IInsuranceService;
import com.github.klaidoshka.vehiclecrashes.api.service.IVehicleOwnerService;
import com.github.klaidoshka.vehiclecrashes.api.service.IVehicleService;
import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Insurance;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import com.github.klaidoshka.vehiclecrashes.entity.VehicleOwner;
import com.github.klaidoshka.vehiclecrashes.entity.dto.VehicleViewModifiable;
import java.time.LocalDate;
import java.util.Objects;
import java.util.function.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public final class VehicleService implements IVehicleService {

  private final ICrashContext context;
  private final IInsuranceService insuranceService;
  private final IVehicleOwnerService vehicleOwnerService;

  @Autowired
  public VehicleService(@NonNull ICrashContext context, @NonNull IInsuranceService insuranceService,
      @NonNull IVehicleOwnerService vehicleOwnerService) {
    this.context = context;
    this.insuranceService = insuranceService;
    this.vehicleOwnerService = vehicleOwnerService;
  }

  @Override
  public boolean isValid(@NonNull VehicleViewModifiable vehicle) {
    if (vehicle.insurances().stream().anyMatch(Predicate.not(insuranceService::isValid))) {
      return false;
    }

    if (vehicle.owners().stream().anyMatch(Predicate.not(vehicleOwnerService::isValid))) {
      return false;
    }

    if (vehicle.color().isBlank()) {
      return false;
    }

    if (vehicle.dateManufacture().isAfter(LocalDate.now())) {
      return false;
    }

    return !vehicle.plate().isBlank();
  }

  @NonNull
  @Override
  public Vehicle merge(@NonNull Vehicle vehicle, @NonNull VehicleViewModifiable vehicleView) {
    vehicle.setColor(vehicleView.color());

    vehicle.setDateManufacture(vehicleView.dateManufacture());

    vehicle.setPlate(vehicleView.plate());

    vehicle.setType(vehicleView.type());

    vehicle.setCrashes(vehicleView.crashes().stream()
        .filter(Objects::nonNull)
        .map(id -> context.find(Crash.class, id).getValue())
        .filter(Objects::nonNull)
        .toList());

    vehicle.setInsurances(vehicleView.insurances().stream()
        .filter(Objects::nonNull)
        .map(i -> i.id() != null
                  ? context.find(Insurance.class, i.id()).getValue()
                  : new Insurance(i.dateInitialization(), i.dateExpiration(), vehicle))
        .filter(Objects::nonNull)
        .toList());

    vehicle.setOwners(vehicleView.owners().stream()
        .filter(Objects::nonNull)
        .map(vo -> {
          if (vo.id() != null) {
            return context.find(VehicleOwner.class, vo.id()).getValue();
          }

          final Person person = context.find(Person.class, vo.personId()).getValue();

          if (person == null) {
            return null;
          }

          return new VehicleOwner(vo.dateAcquisition(), vo.dateDisposal(), person, vehicle);
        })
        .filter(Objects::nonNull)
        .toList());

    return vehicle;
  }
}
