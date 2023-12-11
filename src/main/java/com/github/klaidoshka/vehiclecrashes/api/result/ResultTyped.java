package com.github.klaidoshka.vehiclecrashes.api.result;

import java.util.Collection;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public final class ResultTyped<T> extends Result {

  private final T value;

  public ResultTyped(@Nullable String message, @Nullable Collection<String> messages,
      boolean success, @Nullable T value) {
    super(message, messages, success);

    this.value = value;
  }

  public static <T> ResultTyped<T> success(@Nullable T value) {
    return new ResultTyped<>(null, null, true, value);
  }

  public @Nullable T getValue() {
    return value;
  }
}
