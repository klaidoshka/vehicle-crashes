package com.github.klaidoshka.vehiclecrashes.api.response;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public class ResponseBase {

  private static final ResponseBase SUCCESS = new ResponseBase(null, true);

  private final String message;
  private final boolean success;

  public ResponseBase(@Nullable String message, boolean success) {
    this.message = message != null ? message : "";
    this.success = success;
  }

  public static ResponseBase failure(@NonNull Exception exception) {
    return new ResponseBase(exception.getMessage(), false);
  }

  public static ResponseBase failure(@NonNull String message) {
    return new ResponseBase(message, false);
  }

  public static ResponseBase success() {
    return SUCCESS;
  }

  public @NonNull String getMessage() {
    return message;
  }

  public boolean isSuccess() {
    return success;
  }
}
