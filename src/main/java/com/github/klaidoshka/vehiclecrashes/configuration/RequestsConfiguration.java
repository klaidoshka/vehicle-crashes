package com.github.klaidoshka.vehiclecrashes.configuration;

import com.github.klaidoshka.vehiclecrashes.api.service.IConfigurationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class RequestsConfiguration {

  private final AuthenticationProvider authenticationProvider;
  private final IConfigurationService configurationService;
  private final JwtAuthFilter jwtAuthFilter;

  public RequestsConfiguration(@NonNull AuthenticationProvider authenticationProvider,
      @NonNull IConfigurationService configurationService, @NonNull JwtAuthFilter jwtAuthFilter) {
    this.authenticationProvider = authenticationProvider;
    this.configurationService = configurationService;
    this.jwtAuthFilter = jwtAuthFilter;
  }

  @Bean
  public SecurityFilterChain configureRequests(@NonNull HttpSecurity httpSecurity)
      throws Exception {
    return httpSecurity
        .authenticationProvider(authenticationProvider)
        .cors(Customizer.withDefaults())
        .csrf(AbstractHttpConfigurer::disable)
        .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(c -> c
            .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/register").permitAll()
            .anyRequest().authenticated())
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  public WebMvcConfigurer configureCors() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping(configurationService.getApiMapping() + "/**")
            .allowCredentials(true)
            .allowedHeaders(
                HttpHeaders.CONTENT_TYPE,
                HttpHeaders.AUTHORIZATION,
                HttpHeaders.ORIGIN,
                HttpHeaders.ACCEPT)
            .allowedOrigins(
                configurationService.getClientServerAddress(),
                configurationService.getClientServerDomain())
            .allowedMethods(
                RequestMethod.GET.name(),
                RequestMethod.DELETE.name(),
                RequestMethod.OPTIONS.name(),
                RequestMethod.POST.name(),
                RequestMethod.PUT.name())
            .maxAge(3600);
      }
    };
  }
}
