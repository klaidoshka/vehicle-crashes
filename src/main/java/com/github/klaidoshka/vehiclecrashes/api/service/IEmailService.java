package com.github.klaidoshka.vehiclecrashes.api.service;

import com.github.klaidoshka.vehiclecrashes.api.result.Result;

public interface IEmailService {

  Result sendEmail(String to, String subject, String message);

  Result sendEmail(String to, String subject, String message, boolean isHtml);

  Result sendEmailHtml(String to, String subject, String html);
}
