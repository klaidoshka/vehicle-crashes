package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.entity.dto.InsuranceView;
import org.springframework.lang.NonNull;

public interface IInsuranceService {

  boolean isValid(@NonNull InsuranceView insurance);
}
