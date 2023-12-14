package com.github.klaidoshka.vehiclecrashes.controller;

import com.github.klaidoshka.vehiclecrashes.api.dto.auth.AuthenticationResponse;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.LoginRequest;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.ProfileRequest;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.RegisterRequest;
import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.service.IAuthService;
import com.github.klaidoshka.vehiclecrashes.api.service.IConfigurationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/auth")
public final class AuthController {

  private final IConfigurationService configurationService;
  private final IAuthService authService;

  public AuthController(IConfigurationService configurationService, IAuthService authService) {
    this.configurationService = configurationService;
    this.authService = authService;
  }

  @GetMapping("/confirm-email")
  public RedirectView confirmEmail(@RequestParam String userName,
      @RequestParam String token) {
    final Result result = authService.confirmEmail(userName, token);

    if (!result.isSuccess()) {
      return new RedirectView(configurationService.getEmailUnconfirmedEndpoint());
    }

    return new RedirectView(configurationService.getEmailConfirmedEndpoint());
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

  @PostMapping("/profile")
  public ResponseEntity<ResultTyped<AuthenticationResponse>> profile(
      @RequestBody ProfileRequest model) {
    final ResultTyped<AuthenticationResponse> result = authService.resolveProfile(model);

    if (result.isSuccess()) {
      return ResponseEntity.ok(result);
    }

    return ResponseEntity.badRequest().body(result);
  }

  @PostMapping("/register")
  public ResponseEntity<Result> register(
      @RequestBody RegisterRequest model) {
    final Result result = authService.register(model);

    if (result.isSuccess()) {
      return ResponseEntity.ok(result);
    }

    return ResponseEntity.badRequest().body(result);
  }
}
