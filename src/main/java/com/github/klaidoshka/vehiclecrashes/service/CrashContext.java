package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseValued;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.Collection;
import java.util.Collections;
import java.util.function.Consumer;
import java.util.function.Function;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public final class CrashContext implements ICrashContext {

  private static final Logger LOGGER = LoggerFactory.getLogger(CrashContext.class.getSimpleName());

  private final EntityManagerFactory entityManagerFactory;

  @Autowired
  public CrashContext(@NonNull EntityManagerFactory entityManagerFactory) {
    this.entityManagerFactory = entityManagerFactory;
  }

  @Override
  public @NonNull <E> ResponseValued<E> delete(@NonNull E entity) {
    final EntityManager manager = entityManagerFactory.createEntityManager();

    try {
      manager.getTransaction().begin();

      entity = manager.merge(entity);

      manager.remove(entity);

      manager.getTransaction().commit();

      return ResponseValued.success(entity);
    } catch (Exception e) {
      LOGGER.error("Error while deleting entity. Rolling back...");
      LOGGER.error("Message: {}", e.getMessage());

      manager.getTransaction().rollback();

      return ResponseValued.failure(e, null);
    } finally {
      manager.close();
    }
  }

  @Override
  public @NonNull <E> ResponseValued<E> find(@NonNull Class<E> clazz, @NonNull Object id) {
    try (final EntityManager manager = entityManagerFactory.createEntityManager()) {
      final E entity = manager.find(clazz, id);

      return entity != null
             ? ResponseValued.success(entity)
             : ResponseValued.failure("Entity not found", null);
    } catch (Exception e) {
      LOGGER.error("Error while finding entity");
      LOGGER.error("Message: {}", e.getMessage());

      return ResponseValued.failure(e, null);
    }
  }

  @Override
  public @NonNull <E> ResponseValued<Collection<E>> findAll(@NonNull Class<E> clazz) {
    try (final EntityManager entityManager = entityManagerFactory.createEntityManager()) {
      final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
      final CriteriaQuery<E> criteriaQuery = criteriaBuilder.createQuery(clazz);
      final Root<E> root = criteriaQuery.from(clazz);

      criteriaQuery.select(root);

      return ResponseValued.success(entityManager.createQuery(criteriaQuery).getResultList());
    } catch (Exception e) {
      LOGGER.error("Error while getting entities");
      LOGGER.error("Message: {}", e.getMessage());

      return ResponseValued.failure(e, Collections.emptyList());
    }
  }

  @Override
  public <T> T wrappedRead(@NonNull Function<EntityManager, T> consumer) {
    final EntityManager manager = entityManagerFactory.createEntityManager();

    try {
      manager.getTransaction().begin();

      final T element = consumer.apply(manager);

      manager.getTransaction().commit();

      return element;
    } catch (Exception e) {
      LOGGER.error("Error while wrapping transaction for consumer. Rolling back...");
      LOGGER.error("Message: {}", e.getMessage());

      manager.getTransaction().rollback();

      return null;
    } finally {
      manager.close();
    }
  }

  @Override
  public <E> @NonNull ResponseValued<E> createOrUpdate(@NonNull E entity) {
    final EntityManager manager = entityManagerFactory.createEntityManager();

    try {
      manager.getTransaction().begin();

      entity = manager.merge(entity);

      manager.getTransaction().commit();

      return ResponseValued.success(entity);
    } catch (Exception e) {
      LOGGER.error("Error while saving entity. Rolling back...");
      LOGGER.error("Message: {}", e.getMessage());

      manager.getTransaction().rollback();

      return ResponseValued.failure(e, null);
    } finally {
      manager.close();
    }
  }

  @Override
  public <E> @NonNull ResponseValued<Collection<E>> createOrUpdate(
      @NonNull Collection<E> entities) {
    final EntityManager manager = entityManagerFactory.createEntityManager();

    try {
      manager.getTransaction().begin();

      final Collection<E> entitiesMerged = entities.stream()
          .map(manager::merge)
          .toList();

      manager.getTransaction().commit();

      return ResponseValued.success(entitiesMerged);
    } catch (Exception e) {
      LOGGER.error("Error while saving entities. Rolling back...");
      LOGGER.error("Message: {}", e.getMessage());

      manager.getTransaction().rollback();

      return ResponseValued.failure(e, Collections.emptyList());
    } finally {
      manager.close();
    }
  }

  @NonNull
  @Override
  public ResponseBase wrappedUpdate(@NonNull Consumer<EntityManager> consumer) {
    final EntityManager manager = entityManagerFactory.createEntityManager();

    try {
      manager.getTransaction().begin();

      consumer.accept(manager);

      manager.getTransaction().commit();

      return ResponseBase.success();
    } catch (Exception e) {
      LOGGER.error("Error while wrapping transaction for consumer. Rolling back...");
      LOGGER.error("Message: {}", e.getMessage());

      manager.getTransaction().rollback();

      return ResponseBase.failure(e.getMessage());
    } finally {
      manager.close();
    }
  }
}
