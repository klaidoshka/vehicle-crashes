package com.github.klaidoshka.vehiclecrashes.api.service;

import org.springframework.lang.NonNull;

public interface IConfigurationService {

  /**
   * Mapping of the server-side API (Spring)
   *
   * @return mapping of the server-side API
   */
  @NonNull
  String getApiMapping();

  /**
   * Endpoint address of the client-side server (React), i.e. http://127.0.0.1:3000/
   *
   * @return endpoint of the client-side server
   */
  @NonNull
  String getClientServerAddress();

  /**
   * Endpoint address of the client-side server (React) using domain, i.e. http://localhost:3000/
   *
   * @return endpoint of the client-side server
   */
  @NonNull
  String getClientServerDomain();

  /**
   * Endpoint of the client-side server (React) for successful email confirmation
   *
   * @return endpoint of the client-side server for successful email confirmation
   */
  @NonNull
  String getEmailConfirmedEndpoint();

  /**
   * Endpoint of the client-side server (React) for failed email confirmation
   *
   * @return endpoint of the client-side server for failed email confirmation
   */
  @NonNull
  String getEmailUnconfirmedEndpoint();

  /**
   * Endpoint of the server-side server (Spring)
   *
   * @return endpoint of the server-side server
   */
  @NonNull
  String getServerAddress();
}
