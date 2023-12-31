package com.github.klaidoshka.vehiclecrashes.controller;

import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.service.IConfigurationService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/error")
public final class ErrorController implements
    org.springframework.boot.web.servlet.error.ErrorController {

  private final IConfigurationService configurationService;

  public ErrorController(IConfigurationService configurationService) {
    this.configurationService = configurationService;
  }

  @GetMapping
  public @NonNull RedirectView redirectToClientServer(@NonNull HttpServletRequest request) {
    return new RedirectView(configurationService.getClientServerDomain());
  }

  @PostMapping
  public @NonNull ResponseEntity<Result> handleErrorResponse(
      @NonNull HttpServletRequest request, @NonNull Exception exception) {

    return ResponseEntity
        .status(
            Optional.ofNullable((Integer) request.getAttribute("javax.servlet.error.status_code"))
                .orElse(400)
        )
        .body(Result.failure(
            Optional.ofNullable((String) request.getAttribute("javax.servlet.error.message"))
                .orElse("Error has occurred on the server side. Wrong request.")
        ));
  }
}
