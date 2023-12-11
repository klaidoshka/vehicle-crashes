package com.github.klaidoshka.vehiclecrashes.entity.dto.auth;

import org.springframework.lang.NonNull;

public record AuthenticationResponse(@NonNull String token) {

}
