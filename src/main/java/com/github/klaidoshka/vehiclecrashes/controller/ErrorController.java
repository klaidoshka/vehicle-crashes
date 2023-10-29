package com.github.klaidoshka.vehiclecrashes.controller;

import com.github.klaidoshka.vehiclecrashes.api.service.IConfigurationService;
import com.github.klaidoshka.vehiclecrashes.api.response.ResponseBase;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/error")
public final class ErrorController implements
    org.springframework.boot.web.servlet.error.ErrorController {

  private final IConfigurationService configurationService;

  public ErrorController(IConfigurationService configurationService) {
    this.configurationService = configurationService;
  }

  @GetMapping
  public @NonNull String redirectToClientServer(@NonNull HttpServletRequest request) {
    return """
          <html>
            <head>
              <title>Redirecting...</title>
            </head>
            <body>
              <script>
                setTimeout(function () {
                  window.location.href = "%s";
                }, 3000);
              </script>
            </body>
          </html>
        """
        .formatted(configurationService.getClientServerDomain());
  }

  @PostMapping
  public @NonNull ResponseEntity<ResponseBase> handleErrorResponse(
      @NonNull HttpServletRequest request, @NonNull Exception exception) {

    return ResponseEntity
        .status(
            Optional.ofNullable((Integer) request.getAttribute("javax.servlet.error.status_code"))
                .orElse(400)
        )
        .body(ResponseBase.failure(
            Optional.ofNullable((String) request.getAttribute("javax.servlet.error.message"))
                .orElse("Error has occurred on the server side. Wrong request.")
        ));
  }
}
