package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.AuthenticationResponse;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.LoginRequest;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.RegisterRequest;

public interface IAuthService {

  Result confirmEmail(String userName, String token);

  ResultTyped<AuthenticationResponse> login(LoginRequest model);

  ResultTyped<AuthenticationResponse> register(RegisterRequest model);
}
