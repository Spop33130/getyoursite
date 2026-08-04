# Ambiances de métier

Une ambiance est une feuille de style chargée **après** `style.css`. Elle ne
réécrit pas le socle : elle redéfinit des variables (polices, angles, matières)
et retouche quelques composants.

| Fichier | Pour qui | Ce qui change |
|---|---|---|
| `artisan.css` | Bâtiment, mécanique, métiers manuels | Bricolage Grotesque, angles nets, filets marqués, aucune ombre molle |
| `restaurant.css` | Bistrot, traiteur, cave | Fraunces serif, accroche en italique, fond crème, boutons pilule |
| `salon.css` | Coiffure, esthétique, bien-être | Graisses fines, capitales très espacées, angles droits, presque pas d'ombre |
| `commerce.css` | Épicerie, boutique, métiers de bouche | Fraunces serrée, fond crème, surtitres encadrés comme des étiquettes |

## Choisir une ambiance

Dans le `config.json` du site :

```json
{ "ambiance": "restaurant" }
```

Valeurs acceptées : `artisan`, `restaurant`, `salon`, `commerce`. Absente ou vide,
le site garde le socle neutre. Le choix se fait dans le **configurateur**,
étape « Les couleurs ».

## Pourquoi c'est important

Sans ce mécanisme, tous les sites produits par le moteur se ressemblent. Un client
qui reconnaît le site de son concurrent dans le sien ne signe pas. L'ambiance est
ce qui permet de vendre « un site à votre image » sans refaire un moteur par client.

⚠️ Une ambiance **ne doit pas** reprendre la charte du Marchand de Sites : le site
d'un couvreur doit ressembler à un couvreur, pas à son prestataire web.

## Les polices

Elles sont **hébergées en local** dans `vendor/fonts/`, jamais chargées depuis le
CDN de Google. Charger une police depuis Google transmet l'adresse IP du visiteur
à un serveur américain, ce qui a déjà valu des condamnations en Europe — sur des
sites français avec une page « Confidentialité », c'est un risque inutile.

Pour ajouter une police : la télécharger, ne garder que les sous-ensembles `latin`
et `latin-ext`, et poser le `@font-face` dans `vendor/fonts/<nom>.css`.
