package com.github.klaidoshka.vehiclecrashes.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public final class ErrorController implements
    org.springframework.boot.web.servlet.error.ErrorController {

  @RequestMapping("/error")
  public String handleError(@NonNull HttpServletRequest request) {
    return "error.html";
  }
}
