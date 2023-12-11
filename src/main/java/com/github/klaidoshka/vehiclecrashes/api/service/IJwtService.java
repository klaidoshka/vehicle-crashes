package com.github.klaidoshka.vehiclecrashes.api.service;

import io.jsonwebtoken.Claims;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;

public interface IJwtService {

  String generateToken(UserDetails details);

  String generateToken(Map<String, Object> claims, UserDetails details);

  Key getSignInKey();

  boolean isTokenExpired(String token);

  boolean isTokenValid(String token, UserDetails details);

  <T> T resolveClaim(String token, Function<Claims, T> mapper);

  Claims resolveClaims(String token);

  Date resolveExpirationDate(String token);

  String resolveUsername(String token);
}
