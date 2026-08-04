#!/usr/bin/env python3
"""
build-pages.py — Génère les pages secondaires d'un site à partir de son config.json.

Pourquoi pré-générer au lieu de rendre en JavaScript comme la page d'accueil :
ces pages existent pour être trouvées sur Google. Un moteur qui doit exécuter du
JavaScript pour voir le contenu l'indexe plus tard et moins bien. Ici le contenu
est écrit en dur dans le fichier : il n'y a rien à exécuter pour le lire.

Usage :
    python3 scripts/build-pages.py [dossier-du-site]

Sans argument, travaille sur le dossier courant. Idempotent : on peut le relancer
autant de fois qu'on veut, il réécrit les pages et la navigation.
"""

import json
import os
import re
import sys
import html
from datetime import date

TEMPLATE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

NAV_START = "<!-- NAV:START -->"
NAV_END = "<!-- NAV:END -->"


# --------------------------------------------------------------------------
# utilitaires
# --------------------------------------------------------------------------

def e(txt):
    """Échappe le texte destiné au HTML."""
    return html.escape(str(txt or ""), quote=True)


def slugify(txt):
    txt = str(txt or "").lower()
    for a, b in [("à", "a"), ("â", "a"), ("ä", "a"), ("é", "e"), ("è", "e"),
                 ("ê", "e"), ("ë", "e"), ("î", "i"), ("ï", "i"), ("ô", "o"),
                 ("ö", "o"), ("ù", "u"), ("û", "u"), ("ü", "u"), ("ç", "c")]:
        txt = txt.replace(a, b)
    txt = re.sub(r"[^a-z0-9]+", "-", txt)
    return txt.strip("-")


def die(msg):
    print("ERREUR : " + msg)
    sys.exit(1)


# --------------------------------------------------------------------------
# navigation : une seule source, réécrite partout
# --------------------------------------------------------------------------

def base_of(cfg):
    """
    Chemin sous lequel le site est servi. Vide pour un vrai site client (servi à la
    racine de son domaine), non vide pour les démos rangées dans un sous-dossier.
    Déduit du domaine : https://exemple.fr/demos/x → /demos/x
    """
    dom = (cfg.get("seo", {}) or {}).get("domain", "") or ""
    m = re.match(r"https?://[^/]+(/.*)$", dom)
    return m.group(1).rstrip("/") if m else ""


def nav_html(pages, depth, base=""):
    """
    depth=0 : page d'accueil        → ancres locales (#contact)
    depth=1 : page secondaire       → ancres remontant à l'accueil (…/#contact)
    """
    home = (base + "/") if base else "/"
    # préfixe des ancres : vide sur l'accueil (#contact), chemin de l'accueil ailleurs
    anc = "" if depth == 0 else home
    accueil = "#accueil" if depth == 0 else home

    links = [f'<a href="{accueil}" class="nav-link">Accueil</a>']
    for p in pages:
        label = e(p.get("nav") or p.get("h1") or p["slug"])
        links.append(f'<a href="{base}/{p["slug"]}/" class="nav-link">{label}</a>')
    links.append(f'<a href="{anc}#a-propos" class="nav-link">À propos</a>')
    links.append(f'<a href="{anc}#galerie" class="nav-link">Galerie</a>')
    links.append(f'<a href="{anc}#contact" class="nav-link nav-link--cta">Contact</a>')

    pad = " " * 24
    return "\n".join(pad + l for l in links)


def rewrite_nav(path, pages, depth, base=""):
    """Remplace le bloc de navigation entre les marqueurs. Pose les marqueurs si absents."""
    if not os.path.isfile(path):
        return False
    src = open(path, encoding="utf-8").read()
    block = f"{NAV_START}\n{nav_html(pages, depth, base)}\n" + " " * 20 + NAV_END

    if NAV_START in src and NAV_END in src:
        new = re.sub(re.escape(NAV_START) + r".*?" + re.escape(NAV_END),
                     lambda _: block, src, flags=re.S)
    else:
        # première fois : on encadre le contenu existant de .navbar-menu
        m = re.search(r'(<div class="navbar-menu" id="navbar-menu">)(.*?)(</div>)', src, re.S)
        if not m:
            return False
        new = src[:m.start()] + m.group(1) + "\n" + block + "\n" + " " * 20 + m.group(3) + src[m.end():]

    if new != src:
        open(path, "w", encoding="utf-8").write(new)
        return True
    return False


# --------------------------------------------------------------------------
# gabarit d'une page secondaire
# --------------------------------------------------------------------------

def render_page(cfg, page, pages, base=""):
    site = cfg.get("siteName", "")
    contact = cfg.get("contact", {}) or {}
    colors = cfg.get("colors", {}) or {}
    theme = cfg.get("theme") or "light"
    domain = (cfg.get("seo", {}) or {}).get("domain", "").rstrip("/")
    slug = page["slug"]
    url = f"{domain}/{slug}/" if domain else f"{base}/{slug}/"
    home = (base + "/") if base else "/"

    title = page.get("title") or f'{page.get("h1", slug)} — {site}'
    desc = page.get("description") or page.get("intro", "")[:155]

    # -- contenu
    parts = []

    if page.get("intro"):
        parts.append(f'<p class="page-lead">{e(page["intro"])}</p>')

    for b in page.get("blocks", []) or []:
        parts.append('<div class="page-block">')
        if b.get("titre"):
            parts.append(f'<h2>{e(b["titre"])}</h2>')
        if b.get("texte"):
            for para in str(b["texte"]).split("\n\n"):
                if para.strip():
                    parts.append(f"<p>{e(para.strip())}</p>")
        parts.append("</div>")

    if page.get("puces"):
        parts.append('<ul class="page-puces">')
        for p in page["puces"]:
            parts.append(f"<li>{e(p)}</li>")
        parts.append("</ul>")

    if page.get("gallery"):
        parts.append('<div class="page-gallery">')
        for img in page["gallery"]:
            alt = e(f'{page.get("h1", "")} — {site}')
            parts.append(f'<img src="{base}/images/{e(img)}" alt="{alt}" loading="lazy" width="800" height="600">')
        parts.append("</div>")

    if page.get("zones"):
        zones = " · ".join(e(z) for z in page["zones"])
        parts.append(
            '<div class="page-zones"><span class="page-zones-lbl">Zone d’intervention</span>'
            f"<p>{zones}</p></div>"
        )

    faq_ld = ""
    if page.get("faq"):
        parts.append('<div class="page-faq"><h2>Questions fréquentes</h2>')
        for q in page["faq"]:
            parts.append(
                f'<details class="page-faq-item"><summary>{e(q.get("question",""))}</summary>'
                f'<div>{e(q.get("reponse",""))}</div></details>'
            )
        parts.append("</div>")
        faq_items = ",".join(
            json.dumps({
                "@type": "Question",
                "name": q.get("question", ""),
                "acceptedAnswer": {"@type": "Answer", "text": q.get("reponse", "")},
            }, ensure_ascii=False)
            for q in page["faq"]
        )
        faq_ld = (
            '<script type="application/ld+json">'
            '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[' + faq_items + "]}"
            "</script>"
        )

    contenu = "\n        ".join(parts)

    # -- données structurées : c'est ce qui fait remonter le métier + la ville
    seo = cfg.get("seo", {}) or {}
    service_ld = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": page.get("h1") or page.get("nav") or slug,
        "description": desc,
        "provider": {
            "@type": seo.get("schema_type") or "LocalBusiness",
            "name": site,
            "telephone": contact.get("phone", ""),
            "address": {
                "@type": "PostalAddress",
                "streetAddress": seo.get("street") or contact.get("address", ""),
                "postalCode": seo.get("zip", ""),
                "addressLocality": seo.get("city") or contact.get("city", ""),
                "addressCountry": "FR",
            },
        },
    }
    if page.get("zones"):
        service_ld["areaServed"] = [{"@type": "City", "name": z} for z in page["zones"]]
    if url:
        service_ld["url"] = url

    fil = (
        f'<nav class="fil" aria-label="Fil d’Ariane"><a href="{home}">Accueil</a>'
        f'<span aria-hidden="true">›</span><span>{e(page.get("nav") or page.get("h1") or slug)}</span></nav>'
    )

    autres = [p for p in pages if p["slug"] != slug]
    liens = ""
    if autres:
        items = "".join(
            f'<a class="page-autre" href="{base}/{p["slug"]}/">{e(p.get("nav") or p.get("h1") or p["slug"])}</a>'
            for p in autres
        )
        liens = f'<div class="page-autres"><span class="page-autres-lbl">Autres prestations</span><div>{items}</div></div>'

    tel = e(contact.get("phone", ""))
    tel_href = re.sub(r"[^0-9+]", "", contact.get("phone", "") or "")

    return f"""<!DOCTYPE html>
<html lang="fr" data-theme="{e(theme)}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
{'<link rel="canonical" href="' + e(url) + '">' if domain else ''}
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/vendor/fonts/outfit.css">
<link rel="stylesheet" href="/vendor/fontawesome/css/all.min.css">
<link rel="stylesheet" href="/style.css">
<style>:root{{--brand-primary:{e(colors.get('primary','#2E86AB'))};--brand-secondary:{e(colors.get('secondary','#1a5a7a'))};}}</style>
<script type="application/ld+json">{json.dumps(service_ld, ensure_ascii=False)}</script>
{faq_ld}
</head>
<body>

<header class="header" id="header">
    <nav class="navbar">
        <div class="container">
            <div class="navbar-content">
                <a href="{home}" class="navbar-brand">{e(site)}</a>
                <div class="navbar-menu" id="navbar-menu">
{NAV_START}
{nav_html(pages, 1, base)}
                    {NAV_END}
                </div>
                <a href="tel:{tel_href}" class="navbar-phone"><i class="fas fa-phone"></i><span>{tel}</span></a>
                <button class="navbar-toggle" id="navbar-toggle" aria-label="Ouvrir le menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </nav>
</header>

<main class="page-main">
    <div class="container">
        {fil}
        <h1 class="page-title">{e(page.get("h1") or page.get("nav") or slug)}</h1>
        {contenu}

        <div class="page-cta">
            <div>
                <h2>Un projet, une question ?</h2>
                <p>{e(page.get("cta") or "Dites-moi ce dont vous avez besoin, je vous réponds avec un prix et un délai.")}</p>
            </div>
            <div class="page-cta-actions">
                <a class="btn btn--primary" href="{home}#contact">Demander un devis</a>
                {'<a class="btn btn--hero-outline" href="tel:' + tel_href + '">' + tel + '</a>' if tel else ''}
            </div>
        </div>

        {liens}
    </div>
</main>

<footer class="footer">
    <div class="container">
        <div class="footer-bottom">
            <span>© <span id="footer-year">{date.today().year}</span> {e(site)}</span>
            <a href="{home}mentions/">Mentions légales</a>
        </div>
    </div>
</footer>

<script src="/page.js"></script>
</body>
</html>
"""


# --------------------------------------------------------------------------
# sitemap
# --------------------------------------------------------------------------

def write_sitemap(dest, cfg, pages):
    domain = (cfg.get("seo", {}) or {}).get("domain", "").rstrip("/")
    if not domain:
        return False
    today = date.today().isoformat()
    urls = [(domain + "/", "1.0")] + [(f"{domain}/{p['slug']}/", "0.8") for p in pages]
    urls.append((domain + "/mentions/", "0.3"))
    body = "\n".join(
        f"  <url><loc>{u}</loc><lastmod>{today}</lastmod><priority>{pr}</priority></url>"
        for u, pr in urls
    )
    out = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           f"{body}\n</urlset>\n")
    open(os.path.join(dest, "sitemap.xml"), "w", encoding="utf-8").write(out)
    return True


# --------------------------------------------------------------------------

def main():
    dest = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else ".")
    cfg_path = os.path.join(dest, "config.json")
    if not os.path.isfile(cfg_path):
        die(f"pas de config.json dans {dest}")

    try:
        cfg = json.load(open(cfg_path, encoding="utf-8"))
    except Exception as exc:
        die(f"config.json illisible → {exc}")

    pages = cfg.get("pages") or []
    base = base_of(cfg)

    # normalise et contrôle
    seen = set()
    for i, p in enumerate(pages):
        if not p.get("slug"):
            p["slug"] = slugify(p.get("nav") or p.get("h1") or f"page-{i+1}")
        p["slug"] = slugify(p["slug"])
        if p["slug"] in seen:
            die(f'deux pages portent la même adresse « {p["slug"]} » — chaque page doit être unique')
        seen.add(p["slug"])
        if not (p.get("h1") or p.get("nav")):
            die(f'la page n°{i+1} n\'a ni titre ni libellé de menu')

    if not pages:
        print("Aucune page secondaire dans le config (clé « pages » vide) — rien à générer.")
        # on remet quand même la nav d'origine
        rewrite_nav(os.path.join(dest, "index.html"), [], 0, base_of(cfg))
        return

    # 1. les pages
    for p in pages:
        folder = os.path.join(dest, p["slug"])
        os.makedirs(folder, exist_ok=True)
        open(os.path.join(folder, "index.html"), "w", encoding="utf-8").write(
            render_page(cfg, p, pages, base)
        )
        print(f'  page   /{p["slug"]}/')

    # 2. la navigation, partout
    if rewrite_nav(os.path.join(dest, "index.html"), pages, 0, base):
        print("  nav    index.html")
    for p in pages:
        rewrite_nav(os.path.join(dest, p["slug"], "index.html"), pages, 1, base)

    # 3. le moteur des pages secondaires
    # un site client autonome embarque son page.js ; une démo utilise celui de la racine
    src_js = os.path.join(TEMPLATE_DIR, "page.js")
    if os.path.isfile(src_js) and not dest.startswith(TEMPLATE_DIR):
        open(os.path.join(dest, "page.js"), "w", encoding="utf-8").write(
            open(src_js, encoding="utf-8").read()
        )

    # 4. sitemap
    if write_sitemap(dest, cfg, pages):
        print("  sitemap.xml mis à jour")

    print(f"\n{len(pages)} page(s) générée(s) dans {dest}")


if __name__ == "__main__":
    main()
