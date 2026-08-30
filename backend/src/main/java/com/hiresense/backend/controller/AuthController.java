package com.hiresense.backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hiresense.backend.entity.User;
import com.hiresense.backend.repository.UserRepository;
import com.hiresense.backend.service.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {

        User user = userRepository
                .findByEmail(loginUser.getEmail())
                .orElse(null);

        if (user == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message", "Invalid email or password"
                    ));
        }

        if (!passwordEncoder.matches(
                loginUser.getPassword(),
                user.getPassword())) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message", "Invalid email or password"
                    ));
        }

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Login successful",
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "token", token
                )
        );
    }
}