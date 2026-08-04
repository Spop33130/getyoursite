# GetYourSite — le moteur de sites

Outil de production interne du **Marchand de Sites**. Il fabrique les sites
clients à partir d'un seul fichier de contenu, sans écrire de code par client.

C'est lui qui rend l'offre tenable : un site une page est livré en 3 jours parce
qu'il n'est pas codé à la main, mais rempli.

**En ligne :** [demos.lemarchanddesites.fr](https://demos.lemarchanddesites.fr) —
outil interne, pas une marque montrée aux clients.

```
config.json  ──▶  moteur  ──▶  site autonome (repo + Vercel + domaine)
```

---

## Ce que ça produit

**Un site une page** — hero, à propos, prestations, galerie avec agrandissement,
avis en carrousel, avis Google, questions, horaires avec statut ouvert/fermé en
direct, formulaire de contact, carte, barre d'appel sur mobile.

**Ou un site multi-pages** — la même page d'accueil, plus **une page par
prestation**. Ces pages sont l'intérêt du forfait cinq pages : quelqu'un qui
cherche « couvreur Bordeaux » doit tomber sur la page *Couverture*, pas sur
l'accueil.

> Les pages secondaires sont **pré-générées en HTML**, contenu écrit dans le
> fichier. C'est délibéré : elles existent pour être indexées, et un moteur de
> recherche ne doit rien avoir à exécuter pour les lire. Chacune porte son titre,
> sa description, ses données structurées `Service` avec les villes couvertes,
> et sa `FAQPage`.

---

## Les ambiances

Sans ambiance, tous les sites produits se ressemblent — et un client qui
reconnaît le site de son concurrent dans le sien ne signe pas.

Une ambiance est une feuille de style posée **par-dessus** le socle. Elle
redéfinit polices, angles et matières, sans toucher au moteur.

| Ambiance | Pour qui | Ce qui change |
|---|---|---|
| `artisan` | Bâtiment, mécanique, métiers manuels | Bricolage Grotesque, angles courts, filets francs |
| `restaurant` | Bistrot, traiteur, cave | Fraunces serif, accroche en italique, crème le jour / espresso la nuit |
| `salon` | Coiffure, esthétique, bien-être | Graisses fines, capitales espacées, beaucoup d'air |
| `commerce` | Épicerie, boutique, métiers de bouche | Fraunces serrée, crème, surtitres encadrés comme des étiquettes |

Absente du config, le site garde le socle neutre.

⚠️ **Une ambiance ne doit jamais reprendre la charte du Marchand de Sites.** Le
site d'un couvreur doit ressembler à un couvreur, pas à son prestataire web.

### Les polices

Hébergées **en local** dans `vendor/fonts/`, jamais chargées depuis Google.
Charger une police depuis le CDN de Google transmet l'adresse IP du visiteur à un
serveur américain — condamné plusieurs fois en Europe, et inutile à risquer sur
des sites français qui affichent une page « Confidentialité ».

---

## Fabriquer un site

### 1 — Réunir le contenu

| Élément | Détail |
|---|---|
| Nom exact | Avec majuscules et accents |
| Métier en une phrase | « Couvreur-zingueur depuis 1998 » |
| Téléphone, e-mail, adresse | Ceux qui seront affichés |
| SIRET | Sur le Kbis ou l'avis Insee |
| 3 à 6 prestations | Une phrase concrète chacune |
| 2 ou 3 avis clients | Texte, prénom, ville |
| 8 photos | `hero.jpg`, `about.jpg`, `gallery-1.jpg` … `gallery-6.jpg` |

Des photos de téléphone suffisent si elles sont nettes et prises de jour. Trois
bonnes photos valent mieux que huit mauvaises : la galerie s'adapte.

### 2 — Remplir le configurateur

Ouvrir **`/configurateur/`**. Dix étapes, chaque champ expliqué par ce qu'il
produit sur le site. Une pastille verte signale une étape complète, orange ce
qu'il reste à faire.

- **Nouveau site** pour partir de zéro.
- **Ouvrir un site existant** pour reprendre un `config.json` déjà rempli.

Rien n'est enregistré automatiquement : cliquer sur **Enregistrer le fichier**
avant de fermer.

> Ne jamais rouvrir un `.json` dans Word, Excel ou le Bloc-notes pour le
> corriger : ces logiciels cassent les accents et le fichier devient
> inutilisable. Pour le modifier, le rouvrir dans le configurateur.

### 3 — Générer

```bash
scripts/new-site.sh <slug> <config.json> [dossier-photos] [domaine]
```

```bash
scripts/new-site.sh couverture-lefevre ~/Downloads/config-couverture-lefevre.json ~/Desktop/photos couverture-lefevre.fr
```

Crée `~/Developer/couverture-lefevre/` : moteur, photos, config, pages
secondaires s'il y en a, et dépôt git initialisé. Sans dossier de photos, des
images provisoires sont posées.

Vérifier avant de publier :

```bash
cd ~/Developer/couverture-lefevre && python3 -m http.server 8080
```

### 4 — Mettre en ligne

```bash
cd ~/Developer/couverture-lefevre
gh repo create couverture-lefevre --private --source=. --push
vercel --prod
```

Relier le domaine dans le tableau de bord Vercel.

---

## Modifier un site déjà en ligne

1. Ouvrir son `config.json` dans le configurateur, modifier, enregistrer.
2. Remplacer le `config.json` du dossier du site.
3. Si le site a des pages secondaires, les régénérer :

```bash
python3 ~/Developer/getyoursite/scripts/build-pages.py ~/Developer/couverture-lefevre
```

4. Publier :

```bash
git add -A && git commit -m "maj contenu" && git push
```

La mise en ligne est automatique après le `git push`.

---

## Contrôler avant de livrer

```bash
python3 scripts/verif-demos.py
```

Vérifie que chaque ambiance reste lisible dans les **quatre** situations
d'affichage : clair par défaut, sombre selon l'appareil, et les deux thèmes
forcés par le config.

Ce contrôle existe à cause d'une régression réelle : une ambiance ne redéfinissait
les couleurs que pour le mode clair, et sur un appareil en mode sombre les titres
devenaient blancs sur fond crème. **Le bug était invisible tant qu'on ne testait
qu'en mode clair.**

---

## Les démos

| Adresse | Métier | Ambiance |
|---|---|---|
| `/demos/artisan/` | Couvreur-zingueur | artisan |
| `/demos/artisan-multipages/` | Le même en forfait cinq pages | artisan |
| `/demos/restaurant/` | Bistrot | restaurant |
| `/demos/salon/` | Coiffure & beauté | salon |
| `/demos/commerce/` | Épicerie fine | commerce |

Montrer la démo une page, puis la multi-pages : la différence entre les deux
forfaits se voit immédiatement.

---

## Le dépôt

```
index.html          page d'accueil (rendue depuis config.json)
app.js              moteur de la page d'accueil
page.js             pages secondaires : menu et apparitions seulement
style.css           socle commun
themes/             une ambiance par métier
configurateur/      remplir un config.json sans écrire de code
demos/              cinq démos à montrer aux clients
scripts/
  new-site.sh       crée un site autonome depuis un config
  build-pages.py    génère les pages secondaires et la navigation
  verif-demos.py    contrôle la lisibilité des ambiances
vendor/fonts/       polices hébergées localement
```

`scripts/` ne part pas en ligne (`.vercelignore`).

---

## Ce qu'il faut savoir avant de toucher au code

- **Le config est la seule source.** Pour changer un site, on modifie son
  `config.json`, pas son HTML.
- **`build-pages.py` est idempotent.** Il réécrit les pages, la navigation de
  toutes les pages et le `sitemap.xml`. On peut le relancer sans risque.
- **Une modification du socle ne touche pas les sites déjà livrés** : chaque site
  généré embarque sa propre copie de `style.css` et `app.js`.
- **Cinq pages est le maximum.** Au-delà, ce n'est plus le forfait, c'est un devis.
