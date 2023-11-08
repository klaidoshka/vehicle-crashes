package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.service.IInsuranceService;
import com.github.klaidoshka.vehiclecrashes.entity.dto.InsuranceView;
import org.springframework.stereotype.Service;

@Service
public final class InsuranceService implements IInsuranceService {

  @Override
  public boolean isValid(InsuranceView insurance) {
    return true;
  }
}
