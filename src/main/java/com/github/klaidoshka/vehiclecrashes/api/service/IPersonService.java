package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.entity.Person;
import com.github.klaidoshka.vehiclecrashes.entity.dto.PersonViewModifiable;
import org.springframework.lang.NonNull;

public interface IPersonService {

  boolean isValid(@NonNull PersonViewModifiable person);

  @NonNull
  Person merge(@NonNull Person person, @NonNull PersonViewModifiable personView);
}
