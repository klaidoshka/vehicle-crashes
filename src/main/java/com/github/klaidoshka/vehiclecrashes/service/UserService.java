package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.api.service.ICrashContext;
import com.github.klaidoshka.vehiclecrashes.api.service.IUserService;
import com.github.klaidoshka.vehiclecrashes.entity.User;
import org.springframework.stereotype.Service;

@Service
public final class UserService implements IUserService {

  private final ICrashContext crashContext;

  public UserService(ICrashContext crashContext) {
    this.crashContext = crashContext;
  }

  @Override
  public ResultTyped<User> getUserByEmail(String email) {
    final User user;

    try {
      user = crashContext.wrappedRead(
          (m) -> m.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class)
              .setParameter("email", email.toLowerCase())
              .getSingleResult());
    } catch (Exception e) {
      return ResultTyped.failure("User not found");
    }

    if (user == null) {
      return ResultTyped.failure("User not found");
    }

    return ResultTyped.success(user);
  }

  @Override
  public ResultTyped<User> getUserByUsername(String username) {
    final User user = crashContext.wrappedRead(
        (m) -> m.createQuery("SELECT u FROM User u WHERE u.username = :userName", User.class)
            .setParameter("userName", username.toLowerCase())
            .getSingleResult());

    if (user == null) {
      return ResultTyped.failure("User not found");
    }

    return ResultTyped.success(user);
  }
}
