package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.dto.CrashView;
import com.github.klaidoshka.vehiclecrashes.api.dto.CrashXlsx;
import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashService;
import com.github.klaidoshka.vehiclecrashes.api.service.IPersonService;
import com.github.klaidoshka.vehiclecrashes.api.service.IVehicleService;
import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.Vehicle;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public final class CrashService implements ICrashService {

  private final ICrashContext context;
  private final IPersonService personService;
  private final IVehicleService vehicleService;

  public CrashService(@NonNull ICrashContext context, IPersonService personService,
      IVehicleService vehicleService) {
    this.context = context;
    this.personService = personService;
    this.vehicleService = vehicleService;
  }

  private void appendImportError(@NonNull String cellIndex, @NonNull String message,
      @NonNull Collection<String> errors) {
    errors.add("Cell " + cellIndex + ": " + message);
  }

  @NonNull
  @Override
  public void createOrUpdate(@NonNull CrashView crashView) {
    context.wrappedUpdate(m -> {
      final Crash crash;

      if (crashView.id() != null) {
        crash = m.find(Crash.class, crashView.id());
      } else {
        crash = new Crash();
      }

      crash.setDate(crashView.dateCrash());
      crash.setDamageCost(crashView.damageCost());

      crash.setCasualtiesPeople(crashView.casualtiesPeople().stream()
          .map(p -> m.find(Person.class, p.id()))
          .filter(Objects::nonNull)
          .toList());

      crash.getCasualtiesPeople().forEach(p -> {
        final Collection<Crash> crashes = new ArrayList<>(p.getCrashes());

        crashes.add(crash);

        p.setCrashes(crashes);
      });

      crash.setCasualtiesVehicle(crashView.casualtiesVehicle().stream()
          .map(v -> m.find(Vehicle.class, v.id()))
          .filter(Objects::nonNull)
          .toList());

      crash.getCasualtiesVehicle().forEach(v -> {
        final Collection<Crash> crashes = new ArrayList<>(v.getCrashes());

        crashes.add(crash);

        v.setCrashes(crashes);
      });

      m.merge(crash);
    });
  }

  @Override
  public void deleteById(@NonNull Long id) {
    context.wrappedUpdate(m -> {
      Crash crash = m.find(Crash.class, id);

      if (crash == null) {
        throw new IllegalArgumentException("Crash with id " + id + " not found");
      }

      crash.getCasualtiesPeople().forEach(p -> p.setCrashes(p.getCrashes().stream()
          .filter(c -> !c.getId().equals(crash.getId()))
          .toList()));

      crash.getCasualtiesVehicle().forEach(v -> v.setCrashes(v.getCrashes().stream()
          .filter(c -> !c.getId().equals(crash.getId()))
          .toList()));

      crash.setCasualtiesPeople(List.of());
      crash.setCasualtiesVehicle(List.of());

      m.merge(crash);

      m.remove(crash);
    });
  }

  @Override
  public ResultTyped<Integer> importXlsx(@NonNull MultipartFile file) {
    try (
        final InputStream stream = file.getInputStream();
        final XSSFWorkbook workbook = new XSSFWorkbook(stream)
    ) {
      final XSSFSheet sheet = workbook.getSheet("NewCrashes");

      if (sheet == null) {
        return Result.failure("Sheet with name 'NewCrashes' not found");
      }
      final Iterator<Row> iterator = sheet.iterator();

      iterator.next(); // skip header

      final Collection<String> errors = new ArrayList<>();
      final Set<CrashXlsx> crashes = resolveValidXlsxRows(errors, iterator);

      if (!errors.isEmpty()) {
        return Result.failure(errors);
      }

      if (crashes.isEmpty()) {
        return Result.failure("No rows were found");
      }

      crashes.forEach(c -> {
        context.wrappedUpdate(m -> {
          final Crash crash = new Crash();

          crash.setDate(c.dateCrash());
          crash.setDamageCost(c.damageCost());

          crash.setCasualtiesPeople(c.casualtiesPeople().stream()
              .map(personService::getByName)
              .filter(Objects::nonNull)
              .toList());

          crash.getCasualtiesPeople().forEach(p -> {
            final Collection<Crash> personCrashes = new ArrayList<>(p.getCrashes());

            personCrashes.add(crash);

            p.setCrashes(personCrashes);
          });

          crash.setCasualtiesVehicle(c.casualtiesVehicle().stream()
              .map(vehicleService::getByPlate)
              .filter(Objects::nonNull)
              .toList());

          crash.getCasualtiesVehicle().forEach(v -> {
            final Collection<Crash> vehicleCrashes = new ArrayList<>(v.getCrashes());

            vehicleCrashes.add(crash);

            v.setCrashes(vehicleCrashes);
          });

          m.merge(crash);
        });
      });

      return ResultTyped.success(crashes.size());
    } catch (IOException e) {
      return Result.failure(e.getMessage());
    }
  }

  @Override
  public boolean isValid(@NonNull CrashView crash) {
    if (crash.dateCrash().isAfter(LocalDateTime.now())) {
      return false;
    }

    return !(crash.damageCost() < 0);
  }

  private Set<CrashXlsx> resolveValidXlsxRows(Collection<String> errors, Iterator<Row> iterator) {
    final Set<CrashXlsx> crashes = new HashSet<>();

    iterator.forEachRemaining(row -> {
      final Collection<String> errorsRow = new ArrayList<>();
      final int rowNumber = row.getRowNum() + 1;
      final Cell cellDate = row.getCell(0);
      final Cell cellDamageCost = row.getCell(1);
      final Cell cellPeople = row.getCell(2);
      final Cell cellVehicles = row.getCell(3);

      if (cellDate == null && cellDamageCost == null && cellPeople == null
          && cellVehicles == null) {
        return;
      }

      if (!DateUtil.isCellDateFormatted(cellDate) || cellDate.getLocalDateTimeCellValue() == null) {
        appendImportError("A" + rowNumber, "Invalid or empty, must be a date", errorsRow);
      }

      if (cellDamageCost == null || cellDamageCost.getCellType() != CellType.NUMERIC) {
        appendImportError("B" + rowNumber, "Invalid or empty, must be a number",
            errorsRow);
      }

      final Set<String> people;

      if (cellPeople == null || cellPeople.getCellType() != CellType.STRING) {
        appendImportError("C" + rowNumber, "Invalid or empty, must be a text", errorsRow);

        people = Set.of();
      } else {
        people = Arrays.stream(cellPeople.getStringCellValue().split(";"))
            .map(String::trim)
            .collect(Collectors.toUnmodifiableSet());

        people.forEach(name -> {
          if (personService.getByName(name) == null) {
            appendImportError(cellPeople.getAddress().formatAsString(),
                "Person with name " + name + " not found", errorsRow);
          }
        });
      }

      final Set<String> vehicles;

      if (cellVehicles == null || cellVehicles.getCellType() != CellType.STRING) {
        appendImportError("D" + rowNumber, "Invalid or empty, must be a text", errorsRow);

        vehicles = Set.of();
      } else {
        vehicles = Arrays.stream(cellVehicles.getStringCellValue().split(";"))
            .map(String::trim)
            .collect(Collectors.toUnmodifiableSet());

        vehicles.forEach(plate -> {
          if (vehicleService.getByPlate(plate) == null) {
            appendImportError(cellVehicles.getAddress().formatAsString(),
                "Vehicle with plate " + plate + " not found", errorsRow);
          }
        });
      }

      if (!errorsRow.isEmpty()) {
        errors.addAll(errorsRow);

        return;
      }

      crashes.add(new CrashXlsx(
          cellDate.getLocalDateTimeCellValue(),
          cellDamageCost.getNumericCellValue(),
          people,
          vehicles
      ));
    });

    return crashes;
  }
}
