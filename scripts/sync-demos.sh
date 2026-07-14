#!/usr/bin/env bash
# Synchronise les pages du site racine vers chaque démo.
# Les pages utilisent des chemins absolus (/app.js, /style.css, /vendor/…)
# et des liens relatifs data-nav : elles sont identiques pour tous les sites,
# seul le config.json (et images/) diffère par site.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEMOS=(restaurant salon artisan commerce)

for demo in "${DEMOS[@]}"; do
  dest="$ROOT/demos/$demo"
  [ -d "$dest" ] || { echo "⚠️  $dest introuvable, ignoré"; continue; }

  cp "$ROOT/index.html" "$dest/index.html"
  for page in services galerie contact; do
    mkdir -p "$dest/$page"
    cp "$ROOT/$page/index.html" "$dest/$page/index.html"
  done
  echo "✓ $demo synchronisé"
done
