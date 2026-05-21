package org.cours.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@NoArgsConstructor
public class Voiture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String marque;

    @NonNull
    private String modele;

    @NonNull
    private String couleur;

    @NonNull
    private String immatricule;

    @NonNull
    private int annee;

    @NonNull
    private int prix;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietaire_id")
    @JsonIgnore
    private Proprietaire proprietaire;

    public Voiture(String marque, String modele, String couleur, String immatricule, int annee, int prix) {
        this.marque = marque;
        this.modele = modele;
        this.couleur = couleur;
        this.immatricule = immatricule;
        this.annee = annee;
        this.prix = prix;
    }

    public Voiture(String marque, String modele, String couleur, String immatricule, int annee, int prix,
                   Proprietaire proprietaire) {
        this(marque, modele, couleur, immatricule, annee, prix);
        this.proprietaire = proprietaire;
    }
}
