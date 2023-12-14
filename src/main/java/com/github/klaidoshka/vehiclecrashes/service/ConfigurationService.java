package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.service.IConfigurationService;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public final class ConfigurationService implements IConfigurationService {

  @Override
  public @NonNull String getApiMapping() {
    return "/api";
  }

  @Override
  public @NonNull String getClientServerAddress() {
    return "http://127.0.0.1:3000";
  }

  @Override
  public @NonNull String getClientServerDomain() {
    return "http://localhost:3000";
  }

  @Override
  public String getEmailConfirmedEndpoint() {
    return getClientServerDomain() + "/page/register/email-confirmed";
  }

  @Override
  public String getEmailUnconfirmedEndpoint() {
    return getClientServerDomain() + "/page/register/email-unconfirmed";
  }

  @Override
  public @NonNull String getServerAddress() {
    return "http://127.0.0.1:8080";
  }
}
