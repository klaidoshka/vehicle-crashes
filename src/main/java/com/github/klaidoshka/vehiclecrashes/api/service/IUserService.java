package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import com.github.klaidoshka.vehiclecrashes.entity.User;

public interface IUserService {

  ResultTyped<User> getUserByEmail(String email);

  ResultTyped<User> getUserByUsername(String username);
}
