package org.cours.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Voitures", description = "API REST magasin de voitures")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @GetMapping("/voitures")
    @Operation(summary = "Liste toutes les voitures")
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }

    @GetMapping("/voitures/{id}")
    public ResponseEntity<Voiture> getVoiture(@PathVariable Long id) {
        return voitureRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/voitures")
    public Voiture createVoiture(@RequestBody Voiture voiture) {
        return voitureRepo.save(voiture);
    }

    @PutMapping("/voitures/{id}")
    public ResponseEntity<Voiture> updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        return voitureRepo.findById(id)
                .map(existing -> {
                    voiture.setId(id);
                    return ResponseEntity.ok(voitureRepo.save(voiture));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/voitures/{id}")
    public ResponseEntity<Void> deleteVoiture(@PathVariable Long id) {
        if (!voitureRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        voitureRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
