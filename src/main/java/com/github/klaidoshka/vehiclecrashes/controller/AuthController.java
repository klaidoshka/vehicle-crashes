package com.github.klaidoshka.vehiclecrashes.controller;

import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.service.IAuthService;
import com.github.klaidoshka.vehiclecrashes.entity.dto.auth.AuthenticationResponse;
import com.github.klaidoshka.vehiclecrashes.entity.dto.auth.LoginRequest;
import com.github.klaidoshka.vehiclecrashes.entity.dto.auth.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public final class AuthController {

  private final IAuthService authService;

  public AuthController(IAuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  public ResponseEntity<ResultTyped<AuthenticationResponse>> login(
      @RequestBody LoginRequest model) {
    final ResultTyped<AuthenticationResponse> result = authService.login(model);

    if (result.isSuccess()) {
      return ResponseEntity.ok(result);
    }

    return ResponseEntity.badRequest().body(result);
  }

  @PostMapping("/register")
  public ResponseEntity<ResultTyped<AuthenticationResponse>> register(
      @RequestBody RegisterRequest model) {
    final ResultTyped<AuthenticationResponse> result = authService.register(model);

    if (result.isSuccess()) {
      return ResponseEntity.ok(result);
    }

    return ResponseEntity.badRequest().body(result);
  }
}
