package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public final class CrashContext implements ICrashContext {

  private static final Logger LOGGER = LoggerFactory.getLogger(CrashContext.class.getSimpleName());

  private final EntityManagerFactory entityManagerFactory;

  @Autowired
  public CrashContext(@NonNull EntityManagerFactory entityManagerFactory) {
    this.entityManagerFactory = entityManagerFactory;
  }

  @Override
  public @NonNull <E> ResponseBase delete(@NonNull E entity) {
    final EntityManager manager = entityManagerFactory.createEntityManager();

    try {
      manager.getTransaction().begin();

      manager.remove(manager.merge(entity));

      manager.getTransaction().commit();

      return ResponseBase.success();
    } catch (Exception e) {
      LOGGER.error("Error while deleting entity. Rolling back...");
      LOGGER.error("Message: {}", e.getMessage());

      manager.getTransaction().rollback();

      return ResponseBase.failure(e);
    } finally {
      manager.close();
    }
  }

  @Override
  public @NonNull <E> Optional<E> find(@NonNull Class<E> clazz, @NonNull Object id) {
    try (final EntityManager manager = entityManagerFactory.createEntityManager()) {
      return Optional.ofNullable(manager.find(clazz, id));
    } catch (Exception e) {
      LOGGER.error("Error while finding entity");
      LOGGER.error("Message: {}", e.getMessage());

      return Optional.empty();
    }
  }

  @Override
  public @NonNull <E> Collection<E> get(@NonNull Class<E> clazz) {
    try (final EntityManager entityManager = entityManagerFactory.createEntityManager()) {
      final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
      final CriteriaQuery<E> criteriaQuery = criteriaBuilder.createQuery(clazz);
      final Root<E> root = criteriaQuery.from(clazz);

      criteriaQuery.select(root);

      return entityManager.createQuery(criteriaQuery).getResultList();
    } catch (Exception e) {
      LOGGER.error("Error while getting entities");
      LOGGER.error("Message: {}", e.getMessage());

      return Collections.emptyList();
    }
  }

  @Override
  public <E> @NonNull ResponseBase save(@NonNull E entity) {
    final EntityManager manager = entityManagerFactory.createEntityManager();

    try {
      manager.getTransaction().begin();

      manager.merge(entity);

      manager.getTransaction().commit();

      return ResponseBase.success();
    } catch (Exception e) {
      LOGGER.error("Error while saving entity. Rolling back...");
      LOGGER.error("Message: {}", e.getMessage());

      manager.getTransaction().rollback();

      return ResponseBase.failure(e);
    } finally {
      manager.close();
    }
  }

  @Override
  public <E> @NonNull ResponseBase save(@NonNull Collection<E> entities) {
    final EntityManager manager = entityManagerFactory.createEntityManager();

    try {
      manager.getTransaction().begin();

      entities.forEach(manager::merge);

      manager.getTransaction().commit();

      return ResponseBase.success();
    } catch (Exception e) {
      LOGGER.error("Error while saving entities. Rolling back...");
      LOGGER.error("Message: {}", e.getMessage());

      manager.getTransaction().rollback();

      return ResponseBase.failure(e);
    } finally {
      manager.close();
    }
  }
}
