package com.github.klaidoshka.vehiclecrashes.api.dto.auth;

import org.springframework.lang.NonNull;

public record AuthenticationResponse(@NonNull String token, @NonNull String userName) {

}
