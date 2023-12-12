package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.service.IInsuranceService;
import com.github.klaidoshka.vehiclecrashes.api.dto.InsuranceView;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public final class InsuranceService implements IInsuranceService {

  @Override
  public boolean isValid(@NonNull InsuranceView insurance) {
    return true;
  }
}
