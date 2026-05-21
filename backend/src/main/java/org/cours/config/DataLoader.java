package org.cours.config;

import org.cours.modele.Proprietaire;
import org.cours.modele.ProprietaireRepo;
import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("!test")
public class DataLoader {

    @Bean
    CommandLineRunner runner(VoitureRepo voitureRepo, ProprietaireRepo proprietaireRepo) {
        return args -> {
            if (voitureRepo.count() > 0) {
                return;
            }
            Proprietaire proprietaire1 = new Proprietaire("Ali", "Hassan");
            Proprietaire proprietaire2 = new Proprietaire("Najat", "Bani");
            proprietaireRepo.save(proprietaire1);
            proprietaireRepo.save(proprietaire2);

            voitureRepo.save(new Voiture("Toyota", "Corolla", "Grise", "A-1-9090", 2018, 95000, proprietaire1));
            voitureRepo.save(new Voiture("Ford", "Fiesta", "Rouge", "A-2-8090", 2015, 90000, proprietaire1));
            voitureRepo.save(new Voiture("Honda", "CRV", "Bleu", "A-3-7090", 2016, 140000, proprietaire2));
        };
    }
}
