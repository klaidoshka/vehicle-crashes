package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import java.util.Collection;
import java.util.Optional;
import org.springframework.lang.NonNull;

public interface ICrashContext {

  /**
   * Deletes entity from the context
   *
   * @param entity to delete
   * @param <E>    entity type
   * @return response
   */
  <E> @NonNull ResponseBase delete(@NonNull E entity);

  /**
   * Deletes entity from the context
   *
   * @param clazz entity class
   * @param id    entity id
   * @param <E>   entity type
   * @return response
   */
  default <E> @NonNull ResponseBase delete(@NonNull Class<E> clazz, @NonNull Object id) {
    final Optional<E> entity = find(clazz, id);

    return entity
        .map(this::delete)
        .orElse(ResponseBase.failure("Entity not found"));
  }

  /**
   * Finds entity by id
   *
   * @param clazz entity class
   * @param id    entity id
   * @param <E>   entity type
   * @return entity
   */
  <E> @NonNull Optional<E> find(@NonNull Class<E> clazz, @NonNull Object id);

  /**
   * Finds all entities of given class
   *
   * @param clazz entity class
   * @param <E>   entity type
   * @return collection of entities
   */
  <E> @NonNull Collection<E> get(@NonNull Class<E> clazz);

  /**
   * Saves entity to the context
   *
   * @param entity to save
   * @param <E>    entity type
   * @return response
   */
  <E> @NonNull ResponseBase save(@NonNull E entity);

  /**
   * Saves entities to the context
   *
   * @param entities to save
   * @param <E>      entity type
   * @return response
   */
  <E> @NonNull ResponseBase save(@NonNull Collection<E> entities);
}