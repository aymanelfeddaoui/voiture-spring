package org.cours.ai;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/ai")
@Tag(name = "IA", description = "Assistant Spring AI (Anthropic)")
@ConditionalOnExpression("!'${spring.ai.anthropic.api-key:}'.isBlank()")
public class AiController {

    private final ChatClient chatClient;

    @Autowired
    private VoitureRepo voitureRepo;

    public AiController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public record ChatRequest(String message) {}

    @PostMapping("/chat")
    @Operation(summary = "Discuter avec l'assistant voitures")
    public ResponseEntity<?> chat(@RequestBody ChatRequest request) {
        if (request.message() == null || request.message().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Le message est requis"));
        }

        String catalogue = StreamSupport.stream(voitureRepo.findAll().spliterator(), false)
                .map(v -> String.format("- %s %s (%s, %d, %d MAD)", v.getMarque(), v.getModele(),
                        v.getCouleur(), v.getAnnee(), v.getPrix()))
                .collect(Collectors.joining("\n"));

        String systemPrompt = """
                Tu es l'assistant du magasin en ligne de voitures (atelier ENSIAS).
                Réponds en français de façon concise et professionnelle.
                Catalogue actuel :
                %s
                """.formatted(catalogue.isEmpty() ? "(aucune voiture)" : catalogue);

        try {
            String reply = chatClient.prompt()
                    .system(systemPrompt)
                    .user(request.message())
                    .call()
                    .content();
            return ResponseEntity.ok(Map.of("reply", reply));
        } catch (Exception e) {
            return ResponseEntity.status(503).body(Map.of(
                    "error", "Service IA indisponible. Vérifiez ANTHROPIC_API_KEY dans .env",
                    "detail", e.getMessage()
            ));
        }
    }

    @GetMapping("/recommend")
    @Operation(summary = "Recommandation rapide selon un budget")
    public ResponseEntity<?> recommend(@RequestParam(defaultValue = "100000") int budgetMax) {
        var matches = StreamSupport.stream(voitureRepo.findAll().spliterator(), false)
                .filter(v -> v.getPrix() <= budgetMax)
                .map(Voiture::getModele)
                .toList();
        return ResponseEntity.ok(Map.of("budgetMax", budgetMax, "modeles", matches));
    }
}
