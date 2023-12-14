package com.github.klaidoshka.vehiclecrashes.controller.entity;

import com.github.klaidoshka.vehiclecrashes.api.dto.CrashView;
import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashService;
import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.mappers.CrashMapper;
import com.github.klaidoshka.vehiclecrashes.util.ResponseResolver;
import java.io.InputStream;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/crashes")
public final class CrashController {

  private final ICrashContext context;
  private final ICrashService service;
  private final CrashMapper crashMapper;

  @Autowired
  public CrashController(@NonNull ICrashContext context, @NonNull ICrashService service,
      @NonNull CrashMapper crashMapper) {
    this.context = context;
    this.service = service;
    this.crashMapper = crashMapper;
  }

  @PostMapping
  public @NonNull ResponseEntity<Result> create(@NonNull @RequestBody CrashView entity) {
    if (!service.isValid(entity)) {
      return ResponseResolver.resolve(Result.failure("Invalid crash data"));
    }

    try {
      service.createOrUpdate(entity);
    } catch (IllegalArgumentException e) {
      return ResponseResolver.resolve(Result.failure(e.getMessage()));
    }

    return ResponseEntity.ok(Result.success());
  }

  @DeleteMapping("/{id}")
  public @NonNull ResponseEntity<Result> delete(@NonNull @PathVariable Long id) {
    try {
      service.deleteById(id);

      return ResponseEntity.ok(Result.success());
    } catch (IllegalArgumentException e) {
      return ResponseResolver.resolve(Result.failure(e.getMessage()));
    }
  }

  @PutMapping("/{id}")
  public @NonNull ResponseEntity<Result> edit(@NonNull @PathVariable Long id,
      @NonNull @RequestBody CrashView entity) {
    if (!id.equals(entity.id()) || !service.isValid(entity)) {
      return ResponseResolver.resolve(Result.failure("Invalid crash data (or id mismatch)"));
    }

    try {
      service.createOrUpdate(entity);
    } catch (IllegalArgumentException e) {
      return ResponseResolver.resolve(Result.failure(e.getMessage()));
    }

    return ResponseEntity.ok(Result.success());
  }

  @GetMapping
  public @NonNull Collection<CrashView> get() {
    final ResultTyped<Collection<Crash>> result = context.findAll(Crash.class);

    if (!result.isSuccess()) {
      return List.of();
    }

    return result.getValue().stream()
        .map(crashMapper)
        .toList();
  }

  @GetMapping("/{id}")
  public @NonNull ResponseEntity<ResultTyped<CrashView>> get(@NonNull @PathVariable Long id) {
    return ResponseResolver.resolve(Optional.ofNullable(context.find(Crash.class, id).getValue())
        .map(crashMapper), "Entity not found");
  }

  @GetMapping("/download-template")
  public byte[] getTemplate() {
    try (final InputStream stream = getClass().getResourceAsStream(
        "/crashes-upload-template.xlsx")) {
      return stream.readAllBytes();
    } catch (Exception e) {
      return new byte[0];
    }
  }

  @PostMapping("/import")
  public @NonNull ResponseEntity<ResultTyped<Integer>> importCrashes(
      @RequestParam MultipartFile file) {
    if (file.isEmpty()) {
      return ResponseEntity.badRequest()
          .body(ResultTyped.failure("Cannot import crashes from an empty file"));
    }

    final ResultTyped<Integer> result = service.importXlsx(file);

    if (!result.isSuccess()) {
      return ResponseEntity.badRequest().body(result);
    }

    return ResponseEntity.ok(ResultTyped.success(result.getValue()));
  }
}
