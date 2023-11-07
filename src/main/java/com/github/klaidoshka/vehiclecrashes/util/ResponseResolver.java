package com.github.klaidoshka.vehiclecrashes.util;

import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseValued;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;

public final class ResponseResolver {

  public static @NonNull ResponseEntity<ResponseBase> resolve(@NonNull ResponseBase response) {
    return response.isSuccess()
           ? ResponseEntity.ok(null)
           : ResponseEntity.badRequest().body(response);
  }

  public static @NonNull <T> ResponseEntity<ResponseValued<T>> resolve(@NonNull Optional<T> entity,
      @NonNull String message) {
    return entity
        .map(e -> ResponseEntity.ok(ResponseValued.success(e)))
        .orElse(ResponseEntity.badRequest()
            .body(ResponseValued.failure(message, null)));
  }
}
