#!/usr/bin/env python3
"""
verif-demos.py — Contrôle que chaque démo reste lisible dans les deux modes.

Existe à cause d'une régression réelle : les ambiances ne redéfinissaient les
couleurs que pour le mode clair. Sur un appareil en mode sombre, le fond passait
en crème pendant que le texte restait clair — titres blancs sur blanc. Le bug
était invisible tant qu'on ne testait qu'en mode clair.

    python3 scripts/verif-demos.py

Sort en erreur si une paire texte/fond descend sous le seuil lisible.
"""

import glob
import json
import os
import re
import sys

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEUIL_TEXTE = 4.5      # WCAG AA, texte courant
SEUIL_SECOND = 3.0     # texte secondaire, plus petit mais toujours lisible

REQUIS = ["--color-bg", "--color-bg-alt", "--color-surface",
          "--color-text", "--color-muted", "--color-border"]


def luminance(hexa):
    h = hexa.lstrip("#")
    r, g, b = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def contraste(a, b):
    la, lb = luminance(a), luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def contextes(css):
    """Les quatre situations dans lesquelles un site peut être affiché."""
    roots = re.findall(r":root \{([^}]*)\}", css)
    media = re.search(r"@media \(prefers-color-scheme: dark\)\s*\{(.*?)\n\}", css, re.S)
    clair = re.search(r':root\[data-theme="light"\] \{([^}]*)\}', css)
    sombre = re.search(r':root\[data-theme="dark"\] \{([^}]*)\}', css)
    return {
        "clair (défaut)": roots[1] if len(roots) > 1 else "",
        "sombre (appareil)": media.group(1) if media else "",
        "clair (forcé)": clair.group(1) if clair else "",
        "sombre (forcé)": sombre.group(1) if sombre else "",
    }


def main():
    erreurs = []
    themes = sorted(glob.glob(os.path.join(RACINE, "themes", "*.css")))
    if not themes:
        print("Aucune ambiance trouvée.")
        sys.exit(1)

    for chemin in themes:
        nom = os.path.basename(chemin)
        css = open(chemin, encoding="utf-8").read()
        print(f"\n{nom}")

        for ctx, bloc in contextes(chemin and css).items():
            vals = dict(re.findall(r"(--[\w-]+):\s*(#[0-9A-Fa-f]{6})", bloc))

            manquants = [v for v in REQUIS if v not in vals]
            if manquants:
                erreurs.append(f"{nom} — {ctx} : palette incomplète, manque {', '.join(manquants)}")
                print(f"   ✗ {ctx:20} palette incomplète")
                continue

            paires = [
                ("--color-text", "--color-bg", "texte sur fond", SEUIL_TEXTE),
                ("--color-text", "--color-bg-alt", "texte sur fond alt", SEUIL_TEXTE),
                ("--color-text", "--color-surface", "texte sur carte", SEUIL_TEXTE),
                ("--color-muted", "--color-bg", "secondaire sur fond", SEUIL_SECOND),
            ]
            pire = min(contraste(vals[a], vals[b]) for a, b, _, _ in paires)
            mauvais = [(lbl, contraste(vals[a], vals[b]), s)
                       for a, b, lbl, s in paires if contraste(vals[a], vals[b]) < s]
            if mauvais:
                for lbl, r, s in mauvais:
                    erreurs.append(f"{nom} — {ctx} : {lbl} à {r:.2f}:1 (minimum {s})")
                print(f"   ✗ {ctx:20} " + " · ".join(f"{l} {r:.2f}:1" for l, r, _ in mauvais))
            else:
                print(f"   ✓ {ctx:20} le plus faible contraste : {pire:.2f}:1")

    # les démos déclarent-elles une ambiance connue ?
    connues = {os.path.basename(t)[:-4] for t in themes}
    print()
    for cfg in sorted(glob.glob(os.path.join(RACINE, "demos", "*", "config.json"))):
        demo = os.path.basename(os.path.dirname(cfg))
        amb = (json.load(open(cfg, encoding="utf-8")) or {}).get("ambiance")
        if not amb:
            print(f"   · {demo:22} aucune ambiance (socle neutre)")
        elif amb not in connues:
            erreurs.append(f"{demo} : ambiance « {amb} » inexistante")
            print(f"   ✗ {demo:22} ambiance « {amb} » inexistante")
        else:
            print(f"   ✓ {demo:22} ambiance « {amb} »")

    print()
    if erreurs:
        print(f"{len(erreurs)} problème(s) :")
        for e in erreurs:
            print("  - " + e)
        sys.exit(1)
    print("Tout est lisible dans les quatre situations d'affichage.")


if __name__ == "__main__":
    main()
