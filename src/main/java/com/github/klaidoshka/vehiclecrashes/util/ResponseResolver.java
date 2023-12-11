package com.github.klaidoshka.vehiclecrashes.util;

import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.result.ResultTyped;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;

public final class ResponseResolver {

  public static @NonNull ResponseEntity<Result> resolve(@NonNull Result response) {
    return response.isSuccess()
           ? ResponseEntity.ok(null)
           : ResponseEntity.badRequest().body(response);
  }

  public static @NonNull <T> ResponseEntity<ResultTyped<T>> resolve(@NonNull Optional<T> entity,
      @NonNull String message) {
    return entity
        .map(e -> ResponseEntity.ok(ResultTyped.success(e)))
        .orElse(ResponseEntity.badRequest()
            .body(ResultTyped.failure(message)));
  }
}
