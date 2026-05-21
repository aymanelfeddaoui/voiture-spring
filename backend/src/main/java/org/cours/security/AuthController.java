package org.cours.security;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentification", description = "JWT login")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public record LoginRequest(@NotBlank String username, @NotBlank String password) {}

    @PostMapping("/login")
    @Operation(summary = "Connexion — retourne un token JWT")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password()));
            String token = jwtService.generateToken(request.username());
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "type", "Bearer",
                    "username", request.username()
            ));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body(Map.of("error", "Identifiants invalides"));
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> demoUsers() {
        return ResponseEntity.ok(Map.of(
                "message", "Comptes de démo pour l'atelier",
                "accounts", new Object[]{
                        Map.of("username", "user", "password", "password"),
                        Map.of("username", "admin", "password", "admin")
                }
        ));
    }
}
