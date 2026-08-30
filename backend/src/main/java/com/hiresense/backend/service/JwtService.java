package com.hiresense.backend.service;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import com.hiresense.backend.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(
                    "HireSenseSecretKeyForJWTAuthentication2026"
                            .getBytes()
            );

    public String generateToken(User user) {

        Date issuedAt = new Date();

        Date expiration = new Date(
                issuedAt.getTime() + (24 * 60 * 60 * 1000)
        );

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("id", user.getId())
                .claim("name", user.getName())
                .issuedAt(issuedAt)
                .expiration(expiration)
                .signWith(secretKey)
                .compact();
    }

    public SecretKey getSecretKey() {
        return secretKey;
    }
}