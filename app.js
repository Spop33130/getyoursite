// ============================================
// CONFIGURATIONS
// ============================================

const configs = {
  boulangerie: {
    siteName:    "Boulangerie Artisanale Dubois",
    slogan:      "L'art du pain depuis 1950",
    badge:       "Artisan Boulanger · Paris depuis 1950",
    description: "Une boulangerie familiale qui perpétue la tradition artisanale française avec des produits frais et de qualité. Nos boulangers passionnés travaillent chaque nuit pour vous offrir le meilleur du savoir-faire français chaque matin.",
    colors: { primary: "#C8945A", secondary: "#7A3B1E" },
    hero: {
      title:         "L'authenticité du pain artisanal",
      subtitle:      "Chaque matin, des créations gourmandes préparées avec passion et tradition",
      cta_primary:   "Nous Contacter",
      cta_secondary: "Nos Créations"
    },
    about: {
      title: "Notre Histoire",
      icon:  "fas fa-bread-slice",
      stats: [
        { number: "70+",  label: "Années d'expérience" },
        { number: "500+", label: "Clients fidèles" },
        { number: "100%", label: "Fait maison" }
      ]
    },
    services: [
      { title: "Pain Traditionnel",  description: "Baguettes, pains de campagne et spécialités régionales préparés selon les méthodes ancestrales", icon: "fas fa-bread-slice" },
      { title: "Viennoiseries",      description: "Croissants, pains au chocolat et brioches maison préparés chaque matin avec du beurre AOP",     icon: "fas fa-cookie" },
      { title: "Pâtisseries",        description: "Gâteaux, tartes et desserts sur commande pour toutes vos occasions spéciales",                    icon: "fas fa-birthday-cake" }
    ],
    gallery: [
      { src: "https://picsum.photos/seed/bread1/800/500",  alt: "Notre boulangerie" },
      { src: "https://picsum.photos/seed/bread2/600/400",  alt: "Pains artisanaux" },
      { src: "https://picsum.photos/seed/bread3/600/400",  alt: "Croissants frais" },
      { src: "https://picsum.photos/seed/bread4/600/400",  alt: "Pâtisseries" },
      { src: "https://picsum.photos/seed/bread5/600/400",  alt: "Gâteaux de fête" },
      { src: "https://picsum.photos/seed/bread6/600/400",  alt: "Boulangerie artisanale" }
    ],
    testimonials: [
      { text: "Le meilleur pain de Paris ! Une qualité exceptionnelle et un accueil chaleureux. Je recommande vivement cette boulangerie familiale.", author: "Marie Dubois",  role: "Cliente fidèle depuis 2018",  rating: 5 },
      { text: "Des viennoiseries délicieuses et un service impeccable. C'est un plaisir de commencer la journée avec leurs croissants !",             author: "Pierre Martin", role: "Habitant du quartier",          rating: 5 }
    ],
    contact: {
      address:  "12 Rue de la Paix, 75001 Paris",
      phone:    "01 42 36 58 79",
      whatsapp: "33142365879",
      email:    "contact@boulangerie-dubois.fr",
      hours:    "Lun–Sam : 6h30–19h30 · Dim : 7h–13h"
    },
    social: { facebook: "#", instagram: "#", linkedin: "" }
  },

  agence_voyage: {
    siteName:    "Évasion Voyages",
    slogan:      "Votre passerelle vers l'aventure",
    badge:       "Agence de voyage certifiée IATA",
    description: "Agence de voyage spécialisée dans les destinations exotiques et les expériences authentiques. Nous créons des voyages sur mesure qui marquent une vie et créent des souvenirs inoubliables.",
    colors: { primary: "#2E86AB", secondary: "#1a5a7a" },
    hero: {
      title:         "Explorez le monde avec nous",
      subtitle:      "Des voyages sur mesure pour des souvenirs inoubliables",
      cta_primary:   "Demander un devis",
      cta_secondary: "Nos destinations"
    },
    about: {
      title: "Notre Savoir-Faire",
      icon:  "fas fa-globe",
      stats: [
        { number: "15+",  label: "Années d'expérience" },
        { number: "50+",  label: "Destinations" },
        { number: "2k+",  label: "Voyageurs ravis" }
      ]
    },
    services: [
      { title: "Voyages Sur Mesure",  description: "Créons ensemble votre voyage idéal selon vos envies, votre budget et vos passions",              icon: "fas fa-map-marked-alt" },
      { title: "Circuits Organisés",  description: "Découvrez nos circuits accompagnés vers les plus belles destinations du monde",                   icon: "fas fa-users" },
      { title: "Réservations",        description: "Hôtels, vols et activités au meilleur prix grâce à notre réseau de partenaires internationaux",  icon: "fas fa-plane" }
    ],
    gallery: [
      { src: "https://picsum.photos/seed/travel1/800/500", alt: "Paysage montagne" },
      { src: "https://picsum.photos/seed/travel2/600/400", alt: "Voyage en groupe" },
      { src: "https://picsum.photos/seed/travel3/600/400", alt: "Coucher de soleil" },
      { src: "https://picsum.photos/seed/travel4/600/400", alt: "Paris" },
      { src: "https://picsum.photos/seed/travel5/600/400", alt: "Asie" },
      { src: "https://picsum.photos/seed/travel6/600/400", alt: "Plage tropicale" }
    ],
    testimonials: [
      { text: "Un voyage de rêve en Thaïlande organisé parfaitement ! L'équipe a su répondre à toutes nos attentes avec un professionnalisme remarquable.", author: "Sophie Leroy",          role: "Voyage en Asie · 2024",    rating: 5 },
      { text: "Service exceptionnel et conseils personnalisés. Notre lune de miel aux Maldives était absolument parfaite grâce à eux !",                    author: "Antoine & Camille D.", role: "Voyage de noces · 2024",   rating: 5 }
    ],
    contact: {
      address:  "45 Avenue des Champs-Élysées, 75008 Paris",
      phone:    "01 53 75 42 18",
      whatsapp: "33153754218",
      email:    "info@evasion-voyages.com",
      hours:    "Lun–Ven : 9h–18h · Sam : 9h–17h"
    },
    social: { facebook: "#", instagram: "#", linkedin: "#" }
  },

  garage: {
    siteName:    "Garage Martin Auto",
    slogan:      "Votre expert automobile de confiance",
    badge:       "Mécanicien certifié · 20 ans d'expérience",
    description: "Spécialistes en réparation et entretien automobile depuis plus de 20 ans. Notre équipe de mécaniciens qualifiés prend soin de votre véhicule avec expertise, transparence et des prix honnêtes.",
    colors: { primary: "#E74C3C", secondary: "#2C3E50" },
    hero: {
      title:         "Expertise et fiabilité automobile",
      subtitle:      "Votre véhicule mérite le meilleur soin. Diagnostic, entretien, réparation — on s'occupe de tout.",
      cta_primary:   "Prendre rendez-vous",
      cta_secondary: "Nos services"
    },
    about: {
      title: "Notre Expertise",
      icon:  "fas fa-car",
      stats: [
        { number: "20+",   label: "Années d'expérience" },
        { number: "1500+", label: "Véhicules réparés" },
        { number: "98%",   label: "Clients satisfaits" }
      ]
    },
    services: [
      { title: "Mécanique Générale",    description: "Diagnostic, réparation moteur, transmission et suspensions par des experts qualifiés",               icon: "fas fa-cogs" },
      { title: "Entretien Périodique",  description: "Vidanges, révisions et contrôles préventifs pour la longévité de votre véhicule",                    icon: "fas fa-wrench" },
      { title: "Carrosserie & Peinture",description: "Réparation de carrosserie et peinture automobile avec garantie qualité sur toutes les interventions", icon: "fas fa-car" }
    ],
    gallery: [
      { src: "https://picsum.photos/seed/car1/800/500", alt: "Atelier automobile" },
      { src: "https://picsum.photos/seed/car2/600/400", alt: "Mécanique" },
      { src: "https://picsum.photos/seed/car3/600/400", alt: "Voiture en réparation" },
      { src: "https://picsum.photos/seed/car4/600/400", alt: "Carrosserie" },
      { src: "https://picsum.photos/seed/car5/600/400", alt: "Diagnostic" },
      { src: "https://picsum.photos/seed/car6/600/400", alt: "Inspection" }
    ],
    testimonials: [
      { text: "Travail impeccable et tarifs honnêtes. L'équipe a diagnostiqué et réparé ma voiture en temps record. Je recommande vivement !",    author: "Jean-Claude Petit", role: "Client depuis 2019", rating: 5 },
      { text: "Professionnalisme et transparence. Ils m'expliquent toujours ce qui doit être fait et pourquoi. Un garage de confiance absolu !", author: "Isabelle Moreau",   role: "Cliente fidèle",     rating: 5 }
    ],
    contact: {
      address:  "28 Boulevard de l'Industrie, 69200 Vénissieux",
      phone:    "04 72 51 83 92",
      whatsapp: "33472518392",
      email:    "contact@garage-martin.fr",
      hours:    "Lun–Ven : 8h–18h · Sam : 8h–12h"
    },
    social: { facebook: "#", instagram: "#", linkedin: "" }
  }
};

// ============================================
// STATE
// ============================================

let currentConfig         = 'boulangerie';
let testimonialIndex      = 0;
let testimonialTimer      = null;
let galleryImages         = [];
let lightboxIndex         = 0;

// ============================================
// BOOT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  loadConfiguration(currentConfig);
  initNav();
  initScrollReveal();
  initContactForm();
  initLightbox();
  initDemoSelector();
  document.getElementById('footer-year').textContent = new Date().getFullYear();
});

// ============================================
// LOAD CONFIG
// ============================================

function loadConfiguration(name) {
  currentConfig = name;
  const c = configs[name];
  if (!c) return;

  applyColors(c.colors);
  applyContent(c);
  renderStats(c.about?.stats || []);
  renderServices(c.services);
  renderGallery(c.gallery || []);
  renderTestimonials(c.testimonials);
  renderSocial(c.social || {});

  document.getElementById('config-selector').value = name;
}

function applyColors({ primary, secondary }) {
  document.documentElement.style.setProperty('--brand-primary',   primary);
  document.documentElement.style.setProperty('--brand-secondary', secondary);
}

function applyContent(c) {
  setText('site-name',        c.siteName);
  setText('hero-badge',       c.badge || c.slogan);
  setText('hero-title',       c.hero.title);
  setText('hero-subtitle',    c.hero.subtitle);
  setText('hero-cta-primary', c.hero.cta_primary   || 'Nous Contacter');
  setText('hero-cta-secondary', c.hero.cta_secondary || 'Nos Services');

  setText('about-title',       c.about?.title || c.slogan);
  setText('about-description', c.description);

  // About icon
  const iconEl = document.getElementById('about-icon');
  if (iconEl) iconEl.className = c.about?.icon || 'fas fa-store';

  setText('contact-address', c.contact.address);
  setText('contact-phone',   c.contact.phone);
  setText('contact-email',   c.contact.email);
  setText('contact-hours',   c.contact.hours);

  setText('footer-name',        c.siteName);
  setText('footer-description', c.description.slice(0, 120) + '…');
  setText('footer-address',     c.contact.address);
  setText('footer-phone',       c.contact.phone);
  setText('footer-email',       c.contact.email);
  setText('footer-copy-name',   c.siteName);

  document.title = c.siteName;

  // Floating button → WhatsApp if available
  const btn = document.getElementById('float-btn');
  if (c.contact.whatsapp) {
    btn.href = `https://wa.me/${c.contact.whatsapp}?text=Bonjour%2C%20je%20souhaite%20obtenir%20un%20devis.`;
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.querySelector('i').className = 'fab fa-whatsapp';
    btn.querySelector('span').textContent = 'WhatsApp';
  } else {
    btn.href = '#contact';
    btn.removeAttribute('target');
    btn.querySelector('i').className = 'fas fa-comment-dots';
    btn.querySelector('span').textContent = 'Devis gratuit';
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || '';
}

// ============================================
// STATS
// ============================================

function renderStats(stats) {
  const el = document.getElementById('about-stats');
  if (!el) return;
  el.innerHTML = stats.map(s => `
    <div class="stat-item reveal">
      <div class="stat-number">${s.number}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
  initScrollReveal();
}

// ============================================
// SERVICES
// ============================================

function renderServices(services) {
  const el = document.getElementById('services-grid');
  if (!el) return;
  el.innerHTML = services.map(s => `
    <div class="service-card reveal">
      <div class="service-icon"><i class="${s.icon}"></i></div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
    </div>
  `).join('');
  initScrollReveal();
}

// ============================================
// GALLERY
// ============================================

function renderGallery(images) {
  const el = document.getElementById('gallery-grid');
  if (!el) return;
  galleryImages = images;

  if (!images.length) {
    el.innerHTML = Array.from({ length: 6 }, (_, i) => `
      <div class="gallery-item reveal">
        <div class="gallery-placeholder">
          <i class="fas fa-camera"></i>
          <span>Photo ${i + 1}</span>
        </div>
      </div>
    `).join('');
    initScrollReveal();
    return;
  }

  el.innerHTML = images.map((img, i) => `
    <div class="gallery-item reveal" data-index="${i}">
      <img src="${img.src}" alt="${img.alt}" loading="lazy">
      <div class="gallery-item-overlay"><span>${img.alt}</span></div>
      <div class="gallery-item-zoom"><i class="fas fa-expand-alt"></i></div>
    </div>
  `).join('');

  el.querySelectorAll('.gallery-item[data-index]').forEach(item => {
    item.addEventListener('click', () => openLightbox(+item.dataset.index));
  });

  initScrollReveal();
}

// ============================================
// TESTIMONIALS
// ============================================

function renderTestimonials(testimonials) {
  const carousel = document.getElementById('testimonials-carousel');
  const dots     = document.getElementById('testimonial-dots');
  if (!carousel || !dots) return;

  testimonialIndex = 0;
  clearInterval(testimonialTimer);

  carousel.innerHTML = testimonials.map((t, i) => `
    <div class="testimonial-item ${i === 0 ? 'active' : ''}">
      <div class="testimonial-card">
        <div class="testimonial-stars">${stars(t.rating || 5)}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="author-avatar"><i class="fas fa-user"></i></div>
          <div class="author-info">
            <h4>${t.author}</h4>
            <p>${t.role}</p>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  dots.innerHTML = testimonials.map((_, i) =>
    `<span class="dot ${i === 0 ? 'active' : ''}" data-i="${i}"></span>`
  ).join('');

  dots.querySelectorAll('.dot').forEach(d =>
    d.addEventListener('click', () => goToTestimonial(+d.dataset.i))
  );

  if (testimonials.length > 1) {
    testimonialTimer = setInterval(() => stepTestimonial(1), 5000);
  }
}

function stars(n) {
  return Array.from({ length: 5 }, (_, i) =>
    `<i class="${i < n ? 'fas' : 'far'} fa-star"></i>`
  ).join('');
}

function stepTestimonial(dir) {
  const items = document.querySelectorAll('.testimonial-item');
  const total = items.length;
  if (!total) return;
  items[testimonialIndex].classList.remove('active');
  document.querySelectorAll('.dot')[testimonialIndex]?.classList.remove('active');
  testimonialIndex = (testimonialIndex + dir + total) % total;
  items[testimonialIndex].classList.add('active');
  document.querySelectorAll('.dot')[testimonialIndex]?.classList.add('active');
}

function goToTestimonial(i) {
  const items = document.querySelectorAll('.testimonial-item');
  if (!items.length) return;
  items[testimonialIndex].classList.remove('active');
  document.querySelectorAll('.dot')[testimonialIndex]?.classList.remove('active');
  testimonialIndex = i;
  items[i].classList.add('active');
  document.querySelectorAll('.dot')[i]?.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('testimonial-prev')?.addEventListener('click', () => stepTestimonial(-1));
  document.getElementById('testimonial-next')?.addEventListener('click', () => stepTestimonial(1));
});

// ============================================
// SOCIAL LINKS
// ============================================

const SOCIAL_META = {
  facebook:  { icon: 'fab fa-facebook-f',  label: 'Facebook' },
  instagram: { icon: 'fab fa-instagram',    label: 'Instagram' },
  linkedin:  { icon: 'fab fa-linkedin-in',  label: 'LinkedIn' },
  twitter:   { icon: 'fab fa-x-twitter',   label: 'X' },
  youtube:   { icon: 'fab fa-youtube',      label: 'YouTube' },
  tiktok:    { icon: 'fab fa-tiktok',       label: 'TikTok' }
};

function renderSocial(social) {
  const el = document.getElementById('social-links');
  if (!el) return;
  el.innerHTML = Object.entries(social)
    .filter(([, url]) => url)
    .map(([net, url]) => {
      const m = SOCIAL_META[net] || { icon: 'fas fa-link', label: net };
      return `<a href="${url}" class="social-link" target="_blank" rel="noopener" aria-label="${m.label}">
        <i class="${m.icon}"></i>
      </a>`;
    }).join('');
}

// ============================================
// LIGHTBOX
// ============================================

function openLightbox(index) {
  lightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  const img   = document.getElementById('lightbox-img');
  if (galleryImages[index]) {
    img.src = galleryImages[index].src;
    img.alt = galleryImages[index].alt;
  }
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.getElementById('lightbox-img').src = '';
}

function navLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('lightbox-img');
  if (galleryImages[lightboxIndex]) {
    img.src = galleryImages[lightboxIndex].src;
    img.alt = galleryImages[lightboxIndex].alt;
  }
}

function initLightbox() {
  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => navLightbox(-1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => navLightbox(1));
  document.getElementById('lightbox-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox-modal')?.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navLightbox(-1);
    if (e.key === 'ArrowRight')  navLightbox(1);
  });
}

// ============================================
// NAVIGATION
// ============================================

function initNav() {
  const toggle = document.getElementById('navbar-toggle');
  const menu   = document.getElementById('navbar-menu');

  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    toggle.setAttribute('aria-label', menu.classList.contains('active') ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  menu?.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
    })
  );

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('header')?.offsetHeight || 72;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  // Scrolled class on header
  window.addEventListener('scroll', () => {
    document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

// ============================================
// SCROLL REVEAL (Intersection Observer)
// ============================================

function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
  document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      notify('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notify('Adresse email invalide.', 'error');
      return;
    }

    notify('Message envoyé ! Nous vous répondrons rapidement.', 'success');
    e.target.reset();
  });
}

// ============================================
// NOTIFICATIONS
// ============================================

function notify(message, type = 'info') {
  document.querySelectorAll('.notification').forEach(n => n.remove());
  const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
  const el = document.createElement('div');
  el.className = `notification notification--${type}`;
  el.innerHTML = `
    <i class="${icon}"></i>
    <p>${message}</p>
    <button class="notification-close" aria-label="Fermer"><i class="fas fa-times"></i></button>
  `;
  document.body.appendChild(el);

  const dismiss = () => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 300);
  };
  el.querySelector('.notification-close').addEventListener('click', dismiss);
  setTimeout(dismiss, 5000);
}

// ============================================
// DEMO SELECTOR
// ============================================

function initDemoSelector() {
  document.getElementById('config-selector')?.addEventListener('change', e => {
    loadConfiguration(e.target.value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
