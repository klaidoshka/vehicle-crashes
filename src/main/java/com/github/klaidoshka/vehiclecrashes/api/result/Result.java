package com.github.klaidoshka.vehiclecrashes.api.result;

import java.util.Collection;
import java.util.List;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public class Result {

  private static final Result SUCCESS = new Result(null, null, true);

  private final String message;
  private final Collection<String> messages;
  private final boolean success;

  public Result(@Nullable String message, @Nullable Collection<String> messages, boolean success) {
    this.message = message;
    this.messages = messages;
    this.success = success;
  }

  public static <T> ResultTyped<T> failure(@NonNull Exception exception) {
    return new ResultTyped<>(exception.getMessage(), null, false, null);
  }

  public static <T> ResultTyped<T> failure(@NonNull String message) {
    return new ResultTyped<>(message, null, false, null);
  }

  public static <T> ResultTyped<T> failure(@NonNull Collection<String> messages) {
    return new ResultTyped<>(null, messages, false, null);
  }

  public static Result success() {
    return SUCCESS;
  }

  public @Nullable String getMessage() {
    return message;
  }

  public @Nullable Collection<String> getMessages() {
    return messages;
  }

  public boolean isSuccess() {
    return success;
  }
}
