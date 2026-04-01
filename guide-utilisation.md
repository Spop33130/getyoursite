# Guide d'utilisation - Template One-Page Configurable par JSON

## Vue d'ensemble

Ce template professionnel one-page permet de créer facilement des sites web pour différents types d'entreprises en modifiant simplement un fichier de configuration JSON. Il est particulièrement adapté aux entreprises souhaitant effectuer leur transition numérique rapidement et facilement.

## Structure des fichiers

```
template-json-onepage/
├── index.html          # Structure HTML principale
├── style.css           # Feuille de styles responsive
├── app.js             # Logic JavaScript et configurations
└── config.json        # Fichier de configuration (à créer)
```

## Fonctionnalités incluses

### 🎨 Design Responsive
- Adaptation automatique sur tous les appareils (mobile, tablette, desktop)
- Navigation fixe avec menu hamburger sur mobile
- Animations CSS fluides au scroll
- Transitions douces et effets de hover

### 📱 Sections incluses
1. **Header** - Navigation fixe avec logo/nom de l'entreprise
2. **Hero** - Section d'accueil avec titre et sous-titre impactants
3. **À propos** - Présentation de l'entreprise
4. **Services** - Grille de services avec icônes
5. **Galerie** - Portfolio d'images avec lightbox
6. **Témoignages** - Carousel des avis clients
7. **Contact** - Formulaire et informations de contact
8. **Footer** - Liens et informations complémentaires

### ⚙️ Personnalisation via JSON
- Couleurs du thème (primaire, secondaire, accent)
- Contenu textuel complet
- Images et icônes
- Informations de contact
- Services proposés
- Témoignages clients

## Configuration JSON

### Structure complète du fichier config.json

```json
{
  "siteName": "Nom de votre entreprise",
  "slogan": "Votre slogan accrocheur",
  "description": "Description détaillée de votre entreprise...",
  "colors": {
    "primary": "#D4A574",
    "secondary": "#8B4513",
    "accent": "rgba(212, 165, 116, 0.15)"
  },
  "hero": {
    "title": "Titre principal de votre page d'accueil",
    "subtitle": "Sous-titre explicatif de vos services"
  },
  "services": [
    {
      "title": "Nom du service",
      "description": "Description détaillée du service",
      "icon": "fas fa-icon-name"
    }
  ],
  "contact": {
    "address": "Votre adresse complète",
    "phone": "Votre numéro de téléphone",
    "email": "votre@email.com",
    "hours": "Vos horaires d'ouverture"
  },
  "testimonials": [
    {
      "text": "Témoignage client",
      "author": "Nom du client",
      "role": "Description du client"
    }
  ]
}
```

## Exemples de configuration prêts à l'emploi

### 🥖 Configuration Boulangerie
Parfait pour une boulangerie artisanale avec des couleurs chaudes (tons dorés et bruns).

### ✈️ Configuration Agence de Voyage
Idéal pour une agence de voyage avec des couleurs évoquant l'évasion (bleus et oranges).

### 🔧 Configuration Garage Automobile
Adapté pour un garage avec des couleurs professionnelles (gris foncés et rouge).

## Instructions d'installation

1. **Téléchargez** tous les fichiers du template
2. **Créez** un fichier `config.json` à la racine
3. **Copiez** l'une des configurations d'exemple ou créez la vôtre
4. **Personnalisez** le contenu selon vos besoins
5. **Ouvrez** `index.html` dans votre navigateur

## Personnalisation avancée

### Modification des couleurs
```json
"colors": {
  "primary": "#VotreCouleurPrimaire",
  "secondary": "#VotreCouleurSecondaire", 
  "accent": "rgba(r, g, b, 0.15)"
}
```

### Ajout de services
```json
"services": [
  {
    "title": "Nouveau Service",
    "description": "Description du nouveau service",
    "icon": "fas fa-nouvelle-icone"
  }
]
```

### Icônes disponibles
Utilisez les icônes Font Awesome 6.0 :
- `fas fa-bread-slice` (pain)
- `fas fa-plane` (avion)
- `fas fa-car` (voiture)
- `fas fa-cogs` (mécaniques)
- `fas fa-users` (équipe)
- Et bien d'autres sur [fontawesome.com](https://fontawesome.com/icons)

## Conseils d'utilisation

### 📝 Contenu textuel
- Gardez les titres courts et impactants
- Utilisez des descriptions claires et concises
- Adaptez le vocabulaire à votre secteur d'activité

### 🎨 Choix des couleurs
- Utilisez des couleurs cohérentes avec votre marque
- Respectez le contraste pour la lisibilité
- Testez sur différents appareils

### 📸 Images
- Utilisez des images de haute qualité
- Respectez les formats recommandés (JPG/PNG)
- Optimisez la taille pour le web

## Support technique

### Problèmes courants
1. **Le JSON ne se charge pas** : Vérifiez la syntaxe JSON avec un validateur en ligne
2. **Les couleurs ne s'appliquent pas** : Assurez-vous d'utiliser des codes couleur valides
3. **Les icônes ne s'affichent pas** : Vérifiez les noms d'icônes Font Awesome

### Ressources utiles
- [Validateur JSON](https://jsonlint.com/)
- [Sélecteur de couleurs](https://htmlcolorcodes.com/)
- [Icônes Font Awesome](https://fontawesome.com/icons)

## Conclusion

Ce template vous permet de créer rapidement un site web professionnel sans connaissances techniques approfondies. Il suffit de modifier le fichier JSON pour adapter complètement l'apparence et le contenu à votre entreprise.

Pour toute personnalisation avancée ou support technique, n'hésitez pas à consulter la documentation ou à faire appel à un développeur web.