package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.entity.dto.CrashView;
import org.springframework.lang.NonNull;

public interface ICrashService {

  /***
   * Checks if crash is valid
   * @param crash to check
   * @return true if is valid, false otherwise
   */
  boolean isValid(@NonNull CrashView crash);

  /**
   * Creates or updates crash
   *
   * @param crashView crash view to create or update
   * @throws IllegalArgumentException if crash with id from crashView is not found or some error
   *                                  occurred while updating database with new entry
   */
  @NonNull
  void createOrUpdate(@NonNull CrashView crashView);

  /**
   * Deletes crash by id
   *
   * @param id of crash to delete
   */
  void deleteById(@NonNull Long id);
}
