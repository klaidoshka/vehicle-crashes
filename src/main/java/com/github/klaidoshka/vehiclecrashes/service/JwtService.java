package com.github.klaidoshka.vehiclecrashes.service;

import com.github.klaidoshka.vehiclecrashes.api.service.IJwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public final class JwtService implements IJwtService {

  private static final long VALIDITY_MINUTES = 1440;
  private static final String SECRET_KEY = "6e9f045c834995d8a936947b4fac450ad7c52978cc1b6a1f41a3009965e20e99";

  @Override
  public String generateToken(UserDetails details) {
    return generateToken(Map.of(), details);
  }

  @Override
  public String generateToken(Map<String, Object> claims, UserDetails details) {
    return Jwts.builder()
        .claims(claims)
        .subject(details.getUsername())
        .issuedAt(Date.from(Instant.now()))
        .expiration(Date.from(Instant.now().plus(VALIDITY_MINUTES, ChronoUnit.MINUTES)))
        .signWith(getSignInKey(), SignatureAlgorithm.HS256) // get SecurityKey
        .compact();
  }

  @Override
  public Key getSignInKey() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
  }

  public boolean isTokenExpired(String token) {
    return resolveExpirationDate(token).before(new Date());
  }

  @Override
  public boolean isTokenValid(String token, UserDetails details) {
    return resolveUsername(token).equals(details.getUsername()) && !isTokenExpired(token);
  }

  @Override
  public <T> T resolveClaim(String token, Function<Claims, T> mapper) throws JwtException {
    return mapper.apply(resolveClaims(token));
  }

  @Override
  public Claims resolveClaims(String token) throws JwtException {
    try {
      return Jwts.parser()
          .keyLocator(x -> getSignInKey())
          .build()
          .parseSignedClaims(token)
          .getPayload();
    } catch (ExpiredJwtException e) {
      return e.getClaims();
    }
  }

  @Override
  public Date resolveExpirationDate(String token) throws JwtException {
    return resolveClaim(token, Claims::getExpiration);
  }

  public String resolveUsername(String token) throws JwtException {
    return resolveClaim(token, Claims::getSubject);
  }
}
