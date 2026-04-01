# Créer des fichiers de configuration JSON d'exemple pour les 3 types d'entreprises

import json

# Configuration Boulangerie
boulangerie_config = {
    "siteName": "Boulangerie Artisanale Dubois",
    "slogan": "L'art du pain depuis 1950",
    "description": "Une boulangerie familiale qui perpétue la tradition artisanale française avec des produits frais et de qualité. Nos boulangers passionnés travaillent chaque jour pour vous offrir le meilleur du savoir-faire français.",
    "colors": {
        "primary": "#D4A574",
        "secondary": "#8B4513",
        "accent": "rgba(212, 165, 116, 0.15)"
    },
    "hero": {
        "title": "L'authenticité du pain artisanal",
        "subtitle": "Découvrez nos créations gourmandes faites avec passion"
    },
    "services": [
        {
            "title": "Pain Traditionnel",
            "description": "Baguettes, pains de campagne et spécialités régionales préparés selon les méthodes ancestrales",
            "icon": "fas fa-bread-slice"
        },
        {
            "title": "Viennoiseries",
            "description": "Croissants, pains au chocolat et brioches maison préparés chaque matin",
            "icon": "fas fa-cookie"
        },
        {
            "title": "Pâtisseries",
            "description": "Gâteaux, tartes et desserts sur commande pour toutes vos occasions spéciales",
            "icon": "fas fa-birthday-cake"
        }
    ],
    "contact": {
        "address": "12 Rue de la Paix, 75001 Paris",
        "phone": "01 42 36 58 79",
        "email": "contact@boulangerie-dubois.fr",
        "hours": "Lun-Sam: 6h30-19h30, Dim: 7h-13h"
    },
    "testimonials": [
        {
            "text": "Le meilleur pain de Paris ! Une qualité exceptionnelle et un accueil chaleureux. Je recommande vivement cette boulangerie familiale.",
            "author": "Marie Dubois",
            "role": "Cliente fidèle depuis 2018"
        },
        {
            "text": "Des viennoiseries délicieuses et un service impeccable. C'est un plaisir de commencer la journée avec leurs croissants !",
            "author": "Pierre Martin",
            "role": "Habitant du quartier"
        }
    ]
}

# Configuration Agence de Voyage
agence_voyage_config = {
    "siteName": "Évasion Voyages",
    "slogan": "Votre passerelle vers l'aventure",
    "description": "Agence de voyage spécialisée dans les destinations exotiques et les expériences authentiques. Nous créons des voyages sur mesure pour réaliser vos rêves d'évasion.",
    "colors": {
        "primary": "#2E86AB",
        "secondary": "#A23B72",
        "accent": "rgba(46, 134, 171, 0.15)"
    },
    "hero": {
        "title": "Explorez le monde avec nous",
        "subtitle": "Des voyages sur mesure pour des souvenirs inoubliables"
    },
    "services": [
        {
            "title": "Voyages Sur Mesure",
            "description": "Créons ensemble votre voyage idéal selon vos envies et votre budget",
            "icon": "fas fa-map-marked-alt"
        },
        {
            "title": "Circuits Organisés",
            "description": "Découvrez nos circuits accompagnés vers les plus belles destinations du monde",
            "icon": "fas fa-users"
        },
        {
            "title": "Réservations",
            "description": "Hôtels, vols et activités au meilleur prix garantis",
            "icon": "fas fa-plane"
        }
    ],
    "contact": {
        "address": "45 Avenue des Champs-Élysées, 75008 Paris",
        "phone": "01 53 75 42 18",
        "email": "info@evasion-voyages.com",
        "hours": "Lun-Ven: 9h-18h, Sam: 9h-17h"
    },
    "testimonials": [
        {
            "text": "Un voyage de rêve en Thaïlande ! L'équipe d'Évasion Voyages a su créer un itinéraire parfait adapté à nos envies. Service exceptionnel du début à la fin.",
            "author": "Sophie et Laurent Moreau",
            "role": "Voyage Thaïlande 2023"
        },
        {
            "text": "Professionnalisme et écoute au rendez-vous. Notre lune de miel aux Maldives était magique grâce à leurs conseils avisés.",
            "author": "Julie Bertrand",
            "role": "Lune de miel 2023"
        }
    ]
}

# Configuration Garage Automobile
garage_config = {
    "siteName": "Garage Martin Auto",
    "slogan": "Votre expert automobile de confiance",
    "description": "Spécialistes en réparation et entretien automobile depuis plus de 20 ans. Notre équipe de mécaniciens qualifiés prend soin de votre véhicule avec professionnalisme et transparence.",
    "colors": {
        "primary": "#2C3E50",
        "secondary": "#E74C3C",
        "accent": "rgba(44, 62, 80, 0.15)"
    },
    "hero": {
        "title": "Expertise et fiabilité automobile",
        "subtitle": "Prenez soin de votre véhicule avec nos services professionnels"
    },
    "services": [
        {
            "title": "Mécanique Générale",
            "description": "Diagnostic, réparation moteur, transmission et suspensions par nos mécaniciens experts",
            "icon": "fas fa-cogs"
        },
        {
            "title": "Entretien Périodique",
            "description": "Vidanges, révisions et contrôles préventifs pour préserver votre véhicule",
            "icon": "fas fa-wrench"
        },
        {
            "title": "Carrosserie",
            "description": "Réparation de carrosserie et peinture automobile avec garantie qualité",
            "icon": "fas fa-car"
        }
    ],
    "contact": {
        "address": "28 Boulevard de l'Industrie, 69200 Vénissieux",
        "phone": "04 72 51 83 92",
        "email": "contact@garage-martin.fr",
        "hours": "Lun-Ven: 8h-18h, Sam: 8h-12h"
    },
    "testimonials": [
        {
            "text": "Service rapide et efficace ! Mon problème de moteur a été diagnostiqué et réparé en une journée. Tarifs transparents et équipe compétente.",
            "author": "Jean-Claude Renault",
            "role": "Client depuis 2019"
        },
        {
            "text": "Enfin un garage de confiance ! Ils ont redonné une seconde jeunesse à ma voiture. Je recommande sans hésitation.",
            "author": "Nathalie Durand",
            "role": "Réparation carrosserie"
        }
    ]
}

# Sauvegarde des fichiers JSON
with open("config-boulangerie.json", "w", encoding="utf-8") as f:
    json.dump(boulangerie_config, f, indent=2, ensure_ascii=False)

with open("config-agence-voyage.json", "w", encoding="utf-8") as f:
    json.dump(agence_voyage_config, f, indent=2, ensure_ascii=False)

with open("config-garage.json", "w", encoding="utf-8") as f:
    json.dump(garage_config, f, indent=2, ensure_ascii=False)

print("✅ Fichiers de configuration créés avec succès :")
print("- config-boulangerie.json")
print("- config-agence-voyage.json") 
print("- config-garage.json")
print("\nCes fichiers peuvent être utilisés comme config.json pour personnaliser le template.")