package com.github.klaidoshka.vehiclecrashes.api;

import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import java.util.Collection;
import java.util.Optional;
import org.springframework.lang.NonNull;

public interface ICrashContext {

  <E> @NonNull ResponseBase delete(@NonNull E entity);

  default <E> @NonNull ResponseBase delete(@NonNull Class<E> clazz, @NonNull Object id) {
    final Optional<E> entity = find(clazz, id);

    return entity
        .map(this::delete)
        .orElse(ResponseBase.failure("Entity not found"));
  }

  <E> @NonNull Optional<E> find(@NonNull Class<E> clazz, @NonNull Object id);

  <E> @NonNull Collection<E> get(@NonNull Class<E> clazz);

  <E> @NonNull ResponseBase save(@NonNull E entity);

  <E> @NonNull ResponseBase save(@NonNull Collection<E> entities);
}