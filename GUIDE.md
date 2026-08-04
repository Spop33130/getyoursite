# Configurer un site client — mode d'emploi

Ce guide s'adresse à la personne qui prépare les sites. **Aucune connaissance en
informatique n'est nécessaire pour les étapes 1 à 3.** Les étapes 4 et 5 sont
techniques et se font avec Théo.

---

## Ce qu'il faut avoir sous la main

Avant de commencer, réunir auprès du client :

| Élément | Détail |
|---|---|
| Le nom exact | Avec les majuscules et les accents |
| Le métier en une phrase | « Couvreur-zingueur depuis 1998 » |
| Le téléphone et l'e-mail | Ceux qu'il veut voir affichés |
| L'adresse | Rue, code postal, ville |
| Le numéro SIRET | Sur le Kbis ou l'avis Insee |
| 8 photos | Voir plus bas |
| Les prestations | 3 à 6, avec une phrase chacune |
| 2 ou 3 avis clients | Le texte, le prénom, la ville |

**Les photos.** Il en faut huit, en `.jpg` :

- `hero.jpg` — la grande photo du haut. C'est la plus importante : elle doit
  montrer le métier en action, pas un logo.
- `about.jpg` — le portrait, l'équipe ou l'atelier.
- `gallery-1.jpg` à `gallery-6.jpg` — des réalisations terminées.

Si le client n'a que des photos de téléphone, c'est suffisant : il faut qu'elles
soient nettes et prises en plein jour. Une photo floue fait plus de mal que pas
de photo.

---

## 1. Remplir le configurateur

Ouvrir **`/configurateur/`** dans le navigateur.

- **Nouveau site** pour un client qui démarre.
- **Ouvrir un site existant** pour reprendre un site déjà commencé : choisir son
  fichier `config.json`.

Le menu de gauche liste dix étapes. Une **pastille verte** signifie que l'étape
est remplie, une **pastille orange** qu'il y manque quelque chose. La barre du bas
indique en permanence ce qui reste à faire.

Chaque champ est expliqué sous son titre : ce qu'il faut y mettre et où ça
apparaît sur le site. En cas de doute, laisser la valeur proposée.

> **Rien n'est enregistré automatiquement.** Ne pas fermer l'onglet sans avoir
> cliqué sur **Enregistrer le fichier**.

---

## 2. Le cas des pages supplémentaires

C'est la différence entre les deux forfaits vendus :

- **Forfait une page** — on ne touche pas à l'étape « Pages du site ». Tout tient
  sur l'accueil.
- **Forfait cinq pages** — on crée **une page par prestation**.

### Pourquoi c'est ce qui coûte le plus cher

Quelqu'un qui tape « couvreur Bordeaux » sur Google doit tomber sur une page qui
parle **de la couverture, à Bordeaux** — pas sur un accueil qui parle de tout.
Une page = une prestation = une recherche. C'est tout l'intérêt du forfait.

### Comment bien remplir une page

Pour chaque page, trois champs comptent plus que les autres :

1. **Titre de la page** — c'est la ligne bleue que Google affiche. Elle doit
   contenir **le métier et la ville** :
   *« Couvreur à Bordeaux — réfection et pose de toiture »*
   et non *« Nos services »*.

2. **Villes couvertes** — lister les communes où le client intervient vraiment.
   Ne pas gonfler la liste : mettre une ville où il ne va jamais ne sert à rien
   et fait perdre en crédibilité.

3. **Le contenu** — au moins deux paragraphes qui répondent à ce que les gens
   demandent au téléphone. Écrire comme le client parle. Une page qui répond
   vraiment à une question est mieux placée qu'une page qui répète des mots-clés.

Ajouter aussi deux ou trois **questions fréquentes** par page : ce sont elles qui
peuvent apparaître directement dans les résultats de Google.

---

## 3. Transmettre

À la fin, cliquer sur **Enregistrer le fichier**. Un fichier
`config-nom-du-client.json` est téléchargé.

Transmettre à Théo :

- ce fichier `config-…json`,
- le dossier contenant les 8 photos, nommées exactement comme indiqué plus haut.

> ⚠️ **Ne jamais ouvrir le fichier `.json` dans Word, Excel ou le Bloc-notes pour
> le corriger.** Ces logiciels abîment les accents et le fichier devient
> inutilisable. Pour le modifier, le rouvrir dans le configurateur.

---

## 4. Générer le site (technique)

```bash
cd ~/Developer/getyoursite
scripts/new-site.sh <nom-du-dossier> <chemin/config.json> <dossier-photos> <domaine>
```

Exemple :

```bash
scripts/new-site.sh couverture-lefevre ~/Downloads/config-couverture-lefevre.json ~/Desktop/photos couverture-lefevre.fr
```

Le script crée `~/Developer/couverture-lefevre/`, y copie le moteur, les photos et
le config, génère les pages supplémentaires s'il y en a, et initialise le dépôt git.

Pour voir le résultat avant de publier :

```bash
cd ~/Developer/couverture-lefevre && python3 -m http.server 8080
```

puis ouvrir <http://localhost:8080>.

---

## 5. Mettre en ligne (technique)

```bash
cd ~/Developer/couverture-lefevre
gh repo create couverture-lefevre --private --source=. --push
vercel --prod
```

Relier ensuite le domaine dans le tableau de bord Vercel.

---

## Modifier un site déjà en ligne

1. Ouvrir `config.json` du site dans le **configurateur**, modifier, enregistrer.
2. Remplacer le `config.json` du dossier du site par le nouveau.
3. Régénérer les pages **si le site a des pages supplémentaires** :

```bash
python3 ~/Developer/getyoursite/scripts/build-pages.py ~/Developer/couverture-lefevre
```

4. Publier :

```bash
cd ~/Developer/couverture-lefevre && git add -A && git commit -m "maj contenu" && git push
```

La mise en ligne est automatique après le `git push`.

---

## Questions courantes

**Le client n'a pas de logo, ni de couleurs.**
Garder les couleurs proposées par défaut : elles fonctionnent avec tous les
métiers. On pourra les changer plus tard sans refaire le site.

**Le client n'a que 3 photos.**
Mieux vaut 3 bonnes photos que 8 mauvaises. Mettre les 3 dans la galerie et
retirer les autres de la liste. La galerie s'adapte toute seule.

**Le client veut modifier son texte tous les mois.**
C'est ce que couvre l'entretien à 30 €/mois. Sans entretien, chaque modification
est annoncée et facturée avant d'être faite.

**Combien de pages au maximum ?**
Cinq. Au-delà, ce n'est plus le forfait : c'est un devis sur mesure.

**Où sont les pages internes (fiches, kit commercial) ?**
Elles ne sont pas en ligne, volontairement. Elles s'ouvrent en local :

```bash
cd ~/Developer/getyoursite && python3 -m http.server 8080
```

puis <http://localhost:8080/interne/>.
