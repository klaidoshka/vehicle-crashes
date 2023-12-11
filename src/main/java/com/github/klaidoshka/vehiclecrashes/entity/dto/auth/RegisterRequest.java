package com.github.klaidoshka.vehiclecrashes.entity.dto.auth;

import org.springframework.lang.NonNull;

public record RegisterRequest(
    @NonNull String email,
    @NonNull String password,
    @NonNull String userName
) {

}
