package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.api.dto.InsuranceView;
import org.springframework.lang.NonNull;

public interface IInsuranceService {

  /***
   * Checks if insurance is valid
   * @param insurance to check
   * @return true if is valid, false otherwise
   */
  boolean isValid(@NonNull InsuranceView insurance);
}
