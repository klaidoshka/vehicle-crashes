package com.github.klaidoshka.vehiclecrashes.api.dto.auth;

import org.springframework.lang.NonNull;

public record LoginRequest(
    @NonNull String password,
    @NonNull String userName
) {

}
