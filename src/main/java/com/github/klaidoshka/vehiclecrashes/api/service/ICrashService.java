package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.entity.Crash;
import com.github.klaidoshka.vehiclecrashes.entity.dto.CrashView;
import org.springframework.lang.NonNull;

public interface ICrashService {

  boolean isValid(@NonNull CrashView crash);

  @NonNull
  Crash merge(@NonNull Crash crash, @NonNull CrashView crashView);
}
