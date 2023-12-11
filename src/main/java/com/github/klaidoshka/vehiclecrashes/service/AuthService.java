package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.service.IAuthService;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.IJwtService;
import com.github.klaidoshka.vehiclecrashes.constant.Role;
import com.github.klaidoshka.vehiclecrashes.entity.User;
import com.github.klaidoshka.vehiclecrashes.entity.dto.auth.AuthenticationResponse;
import com.github.klaidoshka.vehiclecrashes.entity.dto.auth.LoginRequest;
import com.github.klaidoshka.vehiclecrashes.entity.dto.auth.RegisterRequest;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public final class AuthService implements IAuthService {

  private final AuthenticationManager authenticationManager;
  private final ICrashContext crashContext;
  private final IJwtService jwtService;
  private final PasswordEncoder passwordEncoder;

  public AuthService(@NonNull AuthenticationManager authenticationManager,
      @NonNull ICrashContext crashContext, @NonNull IJwtService jwtService,
      @NonNull PasswordEncoder passwordEncoder) {
    this.authenticationManager = authenticationManager;
    this.crashContext = crashContext;
    this.jwtService = jwtService;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public ResultTyped<AuthenticationResponse> login(LoginRequest model) {
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
          model.userName(),
          model.password()
      ));
    } catch (Exception e) {
      return ResultTyped.failure(e);
    }

    final User user = crashContext.wrappedRead(
        (m) -> m.createQuery("SELECT u FROM User u WHERE u.username = :userName", User.class)
            .setParameter("userName", model.userName())
            .getSingleResult());

    if (user == null) {
      return ResultTyped.failure("User not found");
    }

    return ResultTyped.success(new AuthenticationResponse(
        jwtService.generateToken(user)
    ));
  }

  @Override
  public ResultTyped<AuthenticationResponse> register(RegisterRequest model) {
    final User user = new User();

    user.setEmail(model.email());
    user.setUsername(model.userName());
    user.setPassword(passwordEncoder.encode(model.password()));
    user.setRole(Role.USER);

    if (!crashContext.createOrUpdate(user).isSuccess()) {
      return ResultTyped.failure("Failed to create user");
    }

    return ResultTyped.success(new AuthenticationResponse(
        jwtService.generateToken(user)
    ));
  }
}
