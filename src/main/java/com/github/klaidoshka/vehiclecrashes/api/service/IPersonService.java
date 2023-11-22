package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.entity.dto.PersonViewModifiable;
import org.springframework.lang.NonNull;

public interface IPersonService {

  /***
   * Checks if person is valid
   * @param person person to check
   * @return true if person is valid, false otherwise
   */
  boolean isValid(@NonNull PersonViewModifiable person);

  /**
   * Creates or updates person
   *
   * @param personView person to create or update
   * @throws IllegalArgumentException if person with id from personView is not found or some error
   *                                  occurred while updating database with new entry
   */
  @NonNull
  void createOrUpdate(@NonNull PersonViewModifiable personView) throws IllegalArgumentException;

  /**
   * Deletes person by id
   *
   * @param id of person to delete
   */
  void deleteById(@NonNull Long id);
}
