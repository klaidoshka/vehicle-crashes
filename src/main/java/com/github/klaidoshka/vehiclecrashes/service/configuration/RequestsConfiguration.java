package com.github.klaidoshka.vehiclecrashes.service.configuration;

import com.github.klaidoshka.vehiclecrashes.api.service.IConfigurationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class RequestsConfiguration {

  private final IConfigurationService configurationService;

  public RequestsConfiguration(@NonNull IConfigurationService configurationService) {
    this.configurationService = configurationService;
  }

  @Bean
  public SecurityFilterChain configureRequests(@NonNull HttpSecurity httpSecurity)
      throws Exception {
    return httpSecurity
        .authorizeHttpRequests(registry -> registry
            .requestMatchers("/**").permitAll())
        .cors(Customizer.withDefaults())
        .csrf(AbstractHttpConfigurer::disable)
        .build();
  }

  @Bean
  public WebMvcConfigurer configureCors() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping(configurationService.getApiMapping() + "/**")
            .allowedOrigins(
                configurationService.getClientServerAddress(),
                configurationService.getClientServerDomain())
            .allowedMethods(
                RequestMethod.GET.name(),
                RequestMethod.DELETE.name(),
                RequestMethod.OPTIONS.name(),
                RequestMethod.POST.name(),
                RequestMethod.PUT.name())
            .allowedHeaders(
                HttpHeaders.CONTENT_TYPE,
                HttpHeaders.AUTHORIZATION,
                HttpHeaders.ORIGIN);
      }
    };
  }
}
