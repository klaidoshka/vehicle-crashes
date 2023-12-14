package com.github.klaidoshka.vehiclecrashes.configuration;

import com.github.klaidoshka.vehiclecrashes.api.service.IJwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

@Configuration
public class JwtAuthFilter extends OncePerRequestFilter {

  private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthFilter.class);

  private final IJwtService jwtService;
  private final UserDetailsService userDetailsService;

  public JwtAuthFilter(IJwtService jwtService, UserDetailsService userDetailsService) {
    this.jwtService = jwtService;
    this.userDetailsService = userDetailsService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    final String header = request.getHeader(HttpHeaders.AUTHORIZATION);

    if (header == null || !header.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);

      LOGGER.info("Authentication failed because of empty header");

      return;
    }

    final String token = header.substring(7);

    try {
      final String userName = jwtService.resolveUsername(token);

      if (userName == null) {
        filterChain.doFilter(request, response);

        LOGGER.info("Authentication failed because of empty username");

        return;
      }

      final UserDetails userDetails = userDetailsService.loadUserByUsername(userName);

      if (!jwtService.isTokenValid(token, userDetails)) {
        filterChain.doFilter(request, response);

        LOGGER.info("Authentication failed because of invalid token for {}", userName);

        return;
      }

      final UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
          userDetails, null, userDetails.getAuthorities());

      authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

      SecurityContextHolder.getContext().setAuthentication(authenticationToken);

      LOGGER.info("Authentication successful for {}", userName);
    } catch (Exception e) {
      LOGGER.info("Authentication failed: {}", e.getMessage());
    }

    filterChain.doFilter(request, response);
  }
}
