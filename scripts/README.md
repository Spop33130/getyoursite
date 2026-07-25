# Créer un site client autonome à partir d'un config.json

`getyoursite` est le **template**. Chaque site client est un site autonome (son
dossier, son repo git, son projet Vercel, son domaine) — comme `mamalouve-bordeaux.fr`.

Le script `new-site.sh` fabrique ce site à partir du `config.json` généré par la
fiche client (`/onboarding`).

## Workflow complet

1. **Remplir la fiche** sur `/onboarding` avec le client, puis **Valider** (enregistré
   en base) et **télécharger le config.json** (bouton « config.json »).
   > ⚠ Ne pas ouvrir/ré-enregistrer le `.json` dans Notepad ou Excel : ça casse les
   > accents (mojibake). Le fichier brut est déjà correct. Le script refuse un fichier abîmé.

2. **Générer le site** (depuis le dossier `getyoursite`) :
   ```bash
   scripts/new-site.sh <slug> <config.json> [dossier-images | -] [domaine]
   ```
   Exemple :
   ```bash
   scripts/new-site.sh boulangerie-martin ~/Downloads/config-boulangerie-martin.json ~/Desktop/photos boulangerie-martin.fr
   ```
   → crée `~/Developer/boulangerie-martin/` (squelette + config + images + `git init`).
   Sans dossier d'images (`-` ou omis) : des placeholders sont posés (à remplacer).

3. **Mettre en ligne** :
   ```bash
   cd ~/Developer/boulangerie-martin
   gh repo create boulangerie-martin --private --source=. --push
   vercel --prod          # puis relier le domaine dans le dashboard Vercel
   ```

## Ce que contient un site généré
`index.html` `app.js` `style.css` `favicon.svg` `vendor/` `mentions/`
`robots.txt` `sitemap.xml` `vercel.json` + le `config.json` du client + `images/`.

Tout est piloté par `config.json` : pour modifier le site plus tard, on édite ce
seul fichier (ou on regénère la fiche). Les 8 images à fournir :
`hero.jpg`, `about.jpg`, `gallery-1.jpg` … `gallery-6.jpg`.

> `GYS_DEV_DIR` permet de changer le dossier de destination (défaut `~/Developer`).
