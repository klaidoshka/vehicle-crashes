package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import jakarta.persistence.EntityManager;
import java.util.Collection;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;
import org.springframework.lang.NonNull;

public interface ICrashContext {

  /**
   * Saves entity to the context
   *
   * @param entity to save
   * @param <E>    entity type
   * @return response with saved entity or null, if entity save failed
   */
  <E> @NonNull ResultTyped<E> createOrUpdate(@NonNull E entity);

  /**
   * Saves entities to the context
   *
   * @param entities to save
   * @param <E>      entity type
   * @return response with saved entities or empty collection, if entities save failed
   */
  <E> @NonNull ResultTyped<Collection<E>> createOrUpdate(@NonNull Collection<E> entities);

  /**
   * Deletes entity from the context
   *
   * @param entity to delete
   * @param <E>    entity type
   * @return response with deleted entity or null, if entity delete failed
   */
  <E> @NonNull ResultTyped<E> delete(@NonNull E entity);

  /**
   * Deletes entity from the context
   *
   * @param clazz entity class
   * @param id    entity id
   * @param <E>   entity type
   * @return response with deleted entity or null, if entity delete failed
   */
  default <E> @NonNull ResultTyped<E> deleteById(@NonNull Class<E> clazz, @NonNull Object id) {
    final ResultTyped<E> entity = find(clazz, id);

    return Optional.ofNullable(entity.getValue())
        .map(this::delete)
        .orElse(ResultTyped.failure("Entity not found"));
  }

  /**
   * Finds entity by id
   *
   * @param clazz entity class
   * @param id    entity id
   * @param <E>   entity type
   * @return response with found entity or null, if entity was not found
   */
  <E> @NonNull ResultTyped<E> find(@NonNull Class<E> clazz, @NonNull Object id);

  /**
   * Finds all entities of given class
   *
   * @param clazz entity class
   * @param <E>   entity type
   * @return response with collection of entities
   */
  <E> @NonNull ResultTyped<Collection<E>> findAll(@NonNull Class<E> clazz);

  /**
   * Wraps fetch around consumer
   *
   * @param consumer to wrap
   * @param <T>      type of fetched value
   * @return response with fetched value
   */
  <T> T wrappedRead(@NonNull Function<EntityManager, T> consumer);

  /**
   * Wraps transaction around consumer
   *
   * @param consumer to wrap
   * @return response with boolean and/or message values, indicating if transaction was successful
   */
  @NonNull
  Result wrappedUpdate(@NonNull Consumer<EntityManager> consumer);
}