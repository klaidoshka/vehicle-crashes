package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.api.dto.CrashView;
import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import org.springframework.lang.NonNull;
import org.springframework.web.multipart.MultipartFile;

public interface ICrashService {

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

  /***
   * Imports crashes from file
   * @param file to import
   * @return result of import
   */
  ResultTyped<Integer> importXlsx(@NonNull MultipartFile file);

  /***
   * Checks if crash is valid
   * @param crash to check
   * @return true if is valid, false otherwise
   */
  boolean isValid(@NonNull CrashView crash);
}
