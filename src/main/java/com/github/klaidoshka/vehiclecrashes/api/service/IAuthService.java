package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.api.dto.auth.AuthenticationResponse;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.LoginRequest;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.ProfileRequest;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.RegisterRequest;
import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;

public interface IAuthService {

  Result confirmEmail(String userName, String token);

  String generateEmailConfirmationToken(String userName);

  ResultTyped<AuthenticationResponse> login(LoginRequest model);

  ResultTyped<AuthenticationResponse> resolveProfile(ProfileRequest model);

  Result register(RegisterRequest model);

  void sendEmailConfirmationToken(String email, String token);
}
