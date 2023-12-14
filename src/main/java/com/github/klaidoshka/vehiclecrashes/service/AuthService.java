package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.dto.auth.AuthenticationResponse;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.LoginRequest;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.ProfileRequest;
import com.github.klaidoshka.vehiclecrashes.api.dto.auth.RegisterRequest;
import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.service.IAuthService;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.IEmailService;
import com.github.klaidoshka.vehiclecrashes.api.service.IJwtService;
import com.github.klaidoshka.vehiclecrashes.api.service.IUserService;
import com.github.klaidoshka.vehiclecrashes.constant.Role;
import com.github.klaidoshka.vehiclecrashes.entity.User;
import java.util.Base64;
import java.util.Random;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public final class AuthService implements IAuthService {

  private final AuthenticationManager authenticationManager;
  private final ICrashContext crashContext;
  private final IEmailService emailService;
  private final IJwtService jwtService;
  private final PasswordEncoder passwordEncoder;
  private final IUserService userService;

  public AuthService(@NonNull AuthenticationManager authenticationManager,
      @NonNull ICrashContext crashContext, IEmailService emailService,
      @NonNull IJwtService jwtService,
      @NonNull PasswordEncoder passwordEncoder, IUserService userService) {
    this.authenticationManager = authenticationManager;
    this.crashContext = crashContext;
    this.emailService = emailService;
    this.jwtService = jwtService;
    this.passwordEncoder = passwordEncoder;
    this.userService = userService;
  }

  @Override
  public Result confirmEmail(String userName, String token) {
    final ResultTyped<User> result = userService.getUserByUsername(userName);

    if (!result.isSuccess()) {
      return Result.failure("Invalid confirmation token");
    }

    final User user = result.getValue();

    if (user.isEmailConfirmed()) {
      return Result.success();
    }

    if (userName.length() != token.length()) {
      return Result.failure("Invalid confirmation token");
    }

    user.setEmailConfirmed(true);

    crashContext.createOrUpdate(user);

    return Result.success();
  }

  @Override
  public String generateEmailConfirmationToken(String userName) {
    StringBuilder builder = new StringBuilder(Base64.getEncoder().encodeToString(
        new Random()
            .ints(97, 122 + 1)
            .limit(userName.length())
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString()
            .getBytes()
    ));

    builder.append("=".repeat(Math.max(0, userName.length() - builder.length())));

    if (builder.length() > userName.length()) {
      builder = new StringBuilder(builder.substring(0, userName.length()));
    }

    return builder.toString();
  }

  @Override
  public ResultTyped<AuthenticationResponse> login(LoginRequest model) {
    final User user = userService.getUserByUsername(model.userName()).getValue();

    if (user == null) {
      return ResultTyped.failure("Invalid username or password");
    }

    final Authentication authentication;

    try {
      authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              model.userName(),
              model.password()
          ));
    } catch (Exception e) {
      return ResultTyped.failure("Invalid username or password");
    }

    if (!user.isEmailConfirmed()) {
      authentication.setAuthenticated(false);

      return ResultTyped.failure(
          "Account is not verified. Please confirm your account by clicking on the link that was sent to your email.");
    }

    return ResultTyped.success(new AuthenticationResponse(
        jwtService.generateToken(user),
        user.getUsername()
    ));
  }

  @Override
  public ResultTyped<AuthenticationResponse> resolveProfile(ProfileRequest model) {
    final boolean expired = jwtService.isTokenExpired(model.token());

    if (expired) {
      return ResultTyped.failure("Token has expired");
    }

    final String userName = jwtService.resolveUsername(model.token());
    final ResultTyped<User> result = userService.getUserByUsername(userName);

    if (!result.isSuccess()) {
      return ResultTyped.failure("User not found");
    }

    return ResultTyped.success(new AuthenticationResponse(
        jwtService.generateToken(result.getValue()),
        result.getValue().getUsername()
    ));
  }

  @Override
  public Result register(RegisterRequest model) {
    if (userService.getUserByEmail(model.email()).isSuccess()) {
      return Result.failure("User with this email already exists");
    }

    if (userService.getUserByUsername(model.userName()).isSuccess()) {
      return Result.failure("User with this username already exists");
    }

    final User user = new User();

    user.setEmail(model.email().toLowerCase());
    user.setEmailConfirmed(false);
    user.setUsername(model.userName().toLowerCase());
    user.setPassword(passwordEncoder.encode(model.password()));
    user.setRole(Role.USER);

    if (!crashContext.createOrUpdate(user).isSuccess()) {
      return Result.failure("Registration has failed, please try again");
    }

    sendEmailConfirmationToken(user.getEmail(), generateEmailConfirmationToken(user.getUsername()));

    return Result.success();
  }

  @Override
  public void sendEmailConfirmationToken(String email, String token) {
    final ResultTyped<User> result = userService.getUserByEmail(email);

    if (!result.isSuccess()) {
      return;
    }

    final User user = result.getValue();

    emailService.sendEmailHtml(
        user.getEmail(),
        "Crevah @ Vehicles Crashes || Email Confirmation",
        """
             <h1>Welcome, {userName} 🙌</h1>

             <p>
                 Please confirm your account by <a href='{url}'>clicking here</a>. If you can't click on the link,
                 please copy and paste the following URL in your browser: {url}
             </p>

             <p>
                 If you didn't register on our website, please ignore this message. Have a nice day! 🍃
             </p>
            """
            .replace("{userName}", user.getUsername())
            .replace("{url}",
                "http://localhost:8080/api/auth/confirm-email?userName=" + user.getUsername()
                    + "&token=" + token)
    );
  }
}
