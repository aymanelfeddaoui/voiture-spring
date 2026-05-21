package org.cours.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> info = new LinkedHashMap<>();
        info.put("application", "Magasin Voitures API — ENSIAS");
        info.put("message", "API sécurisée par JWT. Utilisez les liens ci-dessous.");
        info.put("swagger", "/swagger-ui.html");
        info.put("api-docs", "/v3/api-docs");
        info.put("login", "POST /api/auth/login  (user/password ou admin/admin)");
        info.put("frontend", "http://localhost:3000");
        return info;
    }
}
