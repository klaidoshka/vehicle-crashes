package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.result.Result;
import com.github.klaidoshka.vehiclecrashes.api.service.IEmailService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public final class EmailService implements IEmailService {

  private final JavaMailSender emailSender;
  @Value("${spring.mail.username}")
  private String emailUsername;

  public EmailService(JavaMailSender emailSender) {
    this.emailSender = emailSender;
  }

  @Override
  public Result sendEmail(String to, String subject, String message) {
    return sendEmail(to, subject, message, false);
  }

  @Override
  public Result sendEmail(String to, String subject, String message, boolean isHtml) {
    MimeMessage mail = emailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mail, "utf-8");

    try {
      helper.setFrom(emailUsername);
      helper.setTo(to);
      helper.setSubject(subject);
      helper.setText(message, isHtml);
    } catch (Exception e) {
      return Result.failure(e.getMessage());
    }

    emailSender.send(mail);

    return Result.success();
  }

  @Override
  public Result sendEmailHtml(String to, String subject, String html) {
    return sendEmail(to, subject, html, true);
  }
}
