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
import com.github.klaidoshka.vehiclecrashes.entity.dto.vehicle.VehicleViewModifiable;
import java.time.LocalDate;
import java.util.List;
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
  public void createOrUpdate(@NonNull VehicleViewModifiable vehicleView) {
    context.wrappedUpdate(m -> {
      final Vehicle vehicle;

      if (vehicleView.id() != null) {
        vehicle = m.find(Vehicle.class, vehicleView.id());
      } else {
        vehicle = new Vehicle();
      }

      vehicle.setColor(vehicleView.color());
      vehicle.setDateManufacture(vehicleView.dateManufacture());
      vehicle.setPlate(vehicleView.plate());
      vehicle.setType(vehicleView.type());

      vehicle.setCrashes(vehicleView.crashes().stream()
          .map(id -> m.find(Crash.class, id))
          .filter(Objects::nonNull)
          .toList());

      vehicle.setInsurances(vehicleView.insurances().stream()
          .map(i -> {
            if (i.id() != null) {
              final Insurance insurance = m.find(Insurance.class, i.id());

              insurance.setDateInitialization(i.dateInitialization());
              insurance.setDateExpiration(i.dateExpiration());

              return insurance;
            }

            return new Insurance(i.dateInitialization(), i.dateExpiration(), vehicle);
          })
          .toList());

      vehicle.setOwners(vehicleView.owners().stream()
          .map(vo -> {
            if (vo.id() != null) {
              return m.find(VehicleOwner.class, vo.id());
            }

            final Person person = m.find(Person.class, vo.person().id());

            if (person == null) {
              return null;
            }

            return new VehicleOwner(vo.dateAcquisition(), vo.dateDisposal(), person, vehicle);
          })
          .filter(Objects::nonNull)
          .toList());

      m.merge(vehicle);
    });
  }

  @Override
  public void deleteById(@NonNull Long id) {
    context.wrappedUpdate(m -> {
      final Vehicle vehicle = m.find(Vehicle.class, id);

      if (vehicle == null) {
        throw new IllegalArgumentException("Vehicle with id " + id + " not found");
      }

      vehicle.getCrashes().forEach(c -> c.setCasualtiesVehicle(c.getCasualtiesVehicle().stream()
          .filter(v -> !v.getId().equals(vehicle.getId()))
          .toList()));

      vehicle.getOwners().forEach(o -> {
        final Person person = o.getPerson();

        person.setVehiclesOwned(person.getVehiclesOwned().stream()
            .filter(vo -> !vo.getVehicle().getId().equals(vehicle.getId()))
            .toList());
      });

      vehicle.getOwners().forEach(m::remove);

      vehicle.setCrashes(List.of());
      vehicle.setInsurances(List.of());
      vehicle.setOwners(List.of());

      m.merge(vehicle);

      m.remove(vehicle);
    });
  }
}
