package com.github.klaidoshka.vehiclecrashes.controller;

import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseValued;
import java.util.Collection;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;

public abstract class ControllerBase<E, I> {

  protected final ICrashContext context;

  protected ControllerBase(@NonNull ICrashContext context) {
    this.context = context;
  }

  public @NonNull ResponseEntity<ResponseBase> create(@NonNull E entity) {
    final ResponseBase response = context.save(entity);

    return response.isSuccess()
           ? ResponseEntity.ok(null)
           : ResponseEntity.badRequest().body(response);
  }

  public @NonNull ResponseEntity<ResponseBase> delete(@NonNull I id) {
    final ResponseBase response = context.delete(getEntityClass(), id);

    return response.isSuccess()
           ? ResponseEntity.ok(null)
           : ResponseEntity.badRequest().body(response);
  }

  public @NonNull ResponseEntity<ResponseBase> edit(@NonNull Long id, @NonNull E entity) {
    final ResponseBase response = context.save(entity);

    return response.isSuccess()
           ? ResponseEntity.ok(null)
           : ResponseEntity.badRequest().body(response);
  }

  public @NonNull Collection<E> get() {
    return context.get(getEntityClass());
  }

  public @NonNull ResponseEntity<ResponseValued<E>> get(@NonNull I id) {
    return context
        .find(getEntityClass(), id)
        .map(e -> ResponseEntity.ok(ResponseValued.success(e)))
        .orElse(ResponseEntity.badRequest()
            .body(ResponseValued.failure("Entity not found", null)));
  }

  public abstract @NonNull Class<E> getEntityClass();
}
