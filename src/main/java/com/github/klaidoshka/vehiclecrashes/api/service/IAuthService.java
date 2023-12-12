package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.entity.User;
import com.github.klaidoshka.vehiclecrashes.entity.dto.auth.AuthenticationResponse;
import com.github.klaidoshka.vehiclecrashes.entity.dto.auth.LoginRequest;
import com.github.klaidoshka.vehiclecrashes.entity.dto.auth.RegisterRequest;

public interface IAuthService {

  ResultTyped<AuthenticationResponse> login(LoginRequest model);

  ResultTyped<AuthenticationResponse> register(RegisterRequest model);
}
