package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.api.response.ResponseValued;
import java.util.Collection;
import java.util.Optional;
import org.springframework.lang.NonNull;

public interface ICrashContext {

  /**
   * Saves entity to the context
   *
   * @param entity to save
   * @param <E>    entity type
   * @return response with saved entity or null, if entity save failed
   */
  <E> @NonNull ResponseValued<E> createOrUpdate(@NonNull E entity);

  /**
   * Saves entities to the context
   *
   * @param entities to save
   * @param <E>      entity type
   * @return response with saved entities or empty collection, if entities save failed
   */
  <E> @NonNull ResponseValued<Collection<E>> createOrUpdate(@NonNull Collection<E> entities);

  /**
   * Deletes entity from the context
   *
   * @param entity to delete
   * @param <E>    entity type
   * @return response with deleted entity or null, if entity delete failed
   */
  <E> @NonNull ResponseValued<E> delete(@NonNull E entity);

  /**
   * Deletes entity from the context
   *
   * @param clazz entity class
   * @param id    entity id
   * @param <E>   entity type
   * @return response with deleted entity or null, if entity delete failed
   */
  default <E> @NonNull ResponseValued<E> deleteById(@NonNull Class<E> clazz, @NonNull Object id) {
    final ResponseValued<E> entity = find(clazz, id);

    return Optional.ofNullable(entity.getValue())
        .map(this::delete)
        .orElse(ResponseValued.failure("Entity not found", null));
  }

  /**
   * Finds entity by id
   *
   * @param clazz entity class
   * @param id    entity id
   * @param <E>   entity type
   * @return response with found entity or null, if entity was not found
   */
  <E> @NonNull ResponseValued<E> find(@NonNull Class<E> clazz, @NonNull Object id);

  /**
   * Finds all entities of given class
   *
   * @param clazz entity class
   * @param <E>   entity type
   * @return response with collection of entities
   */
  <E> @NonNull ResponseValued<Collection<E>> findAll(@NonNull Class<E> clazz);
}