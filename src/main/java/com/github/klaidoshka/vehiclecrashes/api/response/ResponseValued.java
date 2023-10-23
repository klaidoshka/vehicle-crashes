package com.github.klaidoshka.vehiclecrashes.api.response;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public final class ResponseValued<T> extends ResponseBase {

  private final T value;

  public ResponseValued(@Nullable String message, boolean success, @Nullable T value) {
    super(message, success);

    this.value = value;
  }

  public static <T> ResponseValued<T> failure(@NonNull Exception exception, @Nullable T value) {
    return new ResponseValued<>(exception.getMessage(), false, value);
  }

  public static <T> ResponseValued<T> failure(@Nullable String message, @Nullable T value) {
    return new ResponseValued<>(message, false, value);
  }

  public static <T> ResponseValued<T> success(@Nullable T value) {
    return new ResponseValued<>(null, true, value);
  }

  public @Nullable T getValue() {
    return value;
  }
}
