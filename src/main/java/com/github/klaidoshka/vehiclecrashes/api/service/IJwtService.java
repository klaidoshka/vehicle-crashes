package com.github.klaidoshka.vehiclecrashes.api.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
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

  <T> T resolveClaim(String token, Function<Claims, T> mapper) throws JwtException;

  Claims resolveClaims(String token) throws JwtException;

  Date resolveExpirationDate(String token) throws JwtException;

  String resolveUsername(String token) throws JwtException;
}
