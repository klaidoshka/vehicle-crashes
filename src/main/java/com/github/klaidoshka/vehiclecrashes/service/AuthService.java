package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.service.IAuthService;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.IJwtService;
import com.github.klaidoshka.vehiclecrashes.api.service.IUserService;
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
  private final IUserService userService;

  public AuthService(@NonNull AuthenticationManager authenticationManager,
      @NonNull ICrashContext crashContext, @NonNull IJwtService jwtService,
      @NonNull PasswordEncoder passwordEncoder, IUserService userService) {
    this.authenticationManager = authenticationManager;
    this.crashContext = crashContext;
    this.jwtService = jwtService;
    this.passwordEncoder = passwordEncoder;
    this.userService = userService;
  }

  @Override
  public ResultTyped<AuthenticationResponse> login(LoginRequest model) {
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
          model.userName(),
          model.password()
      ));
    } catch (Exception e) {
      return ResultTyped.failure("Invalid username or password");
    }

    final ResultTyped<User> result = userService.getUserByUsername(model.userName());

    if (!result.isSuccess()) {
      return ResultTyped.failure("Invalid username or password");
    }

    return ResultTyped.success(new AuthenticationResponse(
        jwtService.generateToken(result.getValue())
    ));
  }

  @Override
  public ResultTyped<AuthenticationResponse> register(RegisterRequest model) {
    if (userService.getUserByEmail(model.email()).isSuccess()) {
      return ResultTyped.failure("User with this email already exists");
    }

    if (userService.getUserByUsername(model.userName()).isSuccess()) {
      return ResultTyped.failure("User with this username already exists");
    }

    final User user = new User();

    user.setEmail(model.email().toLowerCase());
    user.setUsername(model.userName().toLowerCase());
    user.setPassword(passwordEncoder.encode(model.password()));
    user.setRole(Role.USER);

    if (!crashContext.createOrUpdate(user).isSuccess()) {
      return ResultTyped.failure("Registration has failed, please try again");
    }

    return ResultTyped.success(new AuthenticationResponse(
        jwtService.generateToken(user)
    ));
  }
}
