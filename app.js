// ============================================
// BOOT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  fetch('config.json')
    .then(r => r.json())
    .then(config => init(config))
    .catch(err => {
      console.error('Impossible de charger config.json :', err);
    });

  // Nav testimonial buttons wired up independently of config load
  document.getElementById('testimonial-prev')?.addEventListener('click', () => stepTestimonial(-1));
  document.getElementById('testimonial-next')?.addEventListener('click', () => stepTestimonial(1));
});

function init(c) {
  applyColors(c.colors || {});
  applyContent(c);
  renderStats(c.about?.stats || []);
  renderServices(c.services || []);
  renderGallery(c.images?.gallery || []);
  renderTestimonials(c.testimonials || [], c.google_reviews || null);
  renderSocial(c.social || {});
  renderMaps(c.contact?.maps_embed_url || '');
  initScrollReveal();
  initNav();
  initContactForm(c);
  initLightbox();
  document.getElementById('footer-year').textContent = new Date().getFullYear();
}

// ============================================
// COLORS
// ============================================

function applyColors({ primary = '#E74C3C', secondary = '#2C3E50' }) {
  document.documentElement.style.setProperty('--brand-primary',   primary);
  document.documentElement.style.setProperty('--brand-secondary', secondary);
}

// ============================================
// CONTENT
// ============================================

function applyContent(c) {
  setText('site-name',          c.siteName);
  setText('hero-badge',         c.badge || c.slogan);
  setText('hero-title',         c.hero?.title);
  setText('hero-subtitle',      c.hero?.subtitle);
  setText('hero-cta-primary',   c.hero?.cta_primary   || 'Nous Contacter');
  setText('hero-cta-secondary', c.hero?.cta_secondary || 'Nos Services');
  setText('about-title',        c.about?.title || c.slogan);
  setText('about-description',  c.description);

  // About image or icon fallback
  if (c.images?.about) {
    applyAboutImage(c.images.about);
  }

  // Hero background image with dark overlay
  if (c.images?.hero) {
    applyHeroImage(c.images.hero);
  }

  // Contact — liens cliquables
  const phone    = c.contact?.phone    || '';
  const phoneRaw = phone.replace(/[\s.]/g, '');
  const email    = c.contact?.email    || '';

  setHTML('contact-phone', phone ? `<a href="tel:${phoneRaw}">${phone}</a>` : '—');
  setHTML('contact-email', email ? `<a href="mailto:${email}">${email}</a>` : '—');
  setText('contact-address', c.contact?.address || '');
  setText('contact-hours',   c.contact?.hours   || '');

  // Footer
  setText('footer-name',        c.siteName);
  setText('footer-description', (c.description || '').slice(0, 120) + '…');
  setText('footer-address',     c.contact?.address || '');
  setHTML('footer-phone', phone ? `<a href="tel:${phoneRaw}">${phone}</a>` : '');
  setHTML('footer-email', email ? `<a href="mailto:${email}">${email}</a>` : '');
  setText('footer-copy-name',   c.siteName);

  document.title = c.siteName;

  // Bouton flottant → WhatsApp ou RDV
  const btn = document.getElementById('float-btn');
  if (!btn) return;
  if (c.contact?.whatsapp) {
    btn.href = `https://wa.me/${c.contact.whatsapp}?text=Bonjour%2C%20je%20souhaite%20prendre%20rendez-vous.`;
    btn.target = '_blank';
    btn.rel    = 'noopener';
    btn.querySelector('i').className    = 'fab fa-whatsapp';
    btn.querySelector('span').textContent = 'WhatsApp';
  } else {
    btn.href = '#contact';
    btn.removeAttribute('target');
    btn.removeAttribute('rel');
    btn.querySelector('i').className    = 'fas fa-calendar-alt';
    btn.querySelector('span').textContent = 'Rendez-vous';
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || '';
}

function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function applyHeroImage(rawSrc) {
  const src  = rawSrc.startsWith('http') ? rawSrc : `images/${rawSrc}`;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  hero.style.backgroundImage    = `linear-gradient(135deg, rgba(0,0,0,.60) 0%, rgba(0,0,0,.38) 100%), url('${src}')`;
  hero.style.backgroundSize     = 'cover';
  hero.style.backgroundPosition = 'center';
  const bg = hero.querySelector('.hero-bg');
  if (bg) bg.style.display = 'none';
}

function applyAboutImage(rawSrc) {
  const src     = rawSrc.startsWith('http') ? rawSrc : `images/${rawSrc}`;
  const wrapper = document.getElementById('about-image-wrapper');
  if (!wrapper) return;
  wrapper.innerHTML = `<img src="${src}" alt="Notre garage" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`;
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
}

// ============================================
// GALLERY
// ============================================

let galleryImages = [];

function renderGallery(filenames) {
  const el = document.getElementById('gallery-grid');
  if (!el) return;

  if (!filenames.length) {
    el.innerHTML = Array.from({ length: 6 }, (_, i) => `
      <div class="gallery-item reveal">
        <div class="gallery-placeholder">
          <i class="fas fa-camera"></i>
          <span>Photo ${i + 1}</span>
        </div>
      </div>
    `).join('');
    return;
  }

  galleryImages = filenames.map(f => ({
    src: f.startsWith('http') ? f : `images/${f}`,
    alt: f.split('/').pop().replace(/\.[^.]+$/, '').replace(/-/g, ' ')
  }));

  el.innerHTML = galleryImages.map((img, i) => `
    <div class="gallery-item reveal" data-index="${i}">
      <img src="${img.src}" alt="${img.alt}" loading="lazy"
           onerror="this.style.display='none';this.closest('.gallery-item').classList.add('gallery-item--missing')">
      <div class="gallery-item-overlay"><span>${img.alt}</span></div>
      <div class="gallery-item-zoom"><i class="fas fa-expand-alt"></i></div>
    </div>
  `).join('');

  el.querySelectorAll('.gallery-item[data-index]').forEach(item => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('gallery-item--missing')) {
        openLightbox(+item.dataset.index);
      }
    });
  });
}

// ============================================
// TESTIMONIALS
// ============================================

let testimonialIndex = 0;
let testimonialTimer = null;

const GOOGLE_LOGO_SVG = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="14" height="14" aria-hidden="true">
  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
</svg>`;

function renderTestimonials(testimonials, googleReviews) {
  const carousel = document.getElementById('testimonials-carousel');
  const dots     = document.getElementById('testimonial-dots');
  if (!carousel || !dots) return;

  testimonialIndex = 0;
  clearInterval(testimonialTimer);

  // Badge Google Reviews
  const badgeEl = document.getElementById('google-reviews-badge');
  if (badgeEl) {
    if (googleReviews?.url) {
      const full    = Math.floor(googleReviews.rating || 0);
      const hasHalf = (googleReviews.rating || 0) - full >= 0.5;
      const starsHtml = Array.from({ length: 5 }, (_, i) => {
        if (i < full)              return '<i class="fas fa-star"></i>';
        if (i === full && hasHalf) return '<i class="fas fa-star-half-alt"></i>';
        return '<i class="far fa-star"></i>';
      }).join('');

      badgeEl.innerHTML = `
        <a href="${googleReviews.url}" target="_blank" rel="noopener" class="google-badge">
          ${GOOGLE_LOGO_SVG}
          <span class="google-badge-stars">${starsHtml}</span>
          <span class="google-badge-score">${googleReviews.rating}</span>
          <span class="google-badge-sep">·</span>
          <span class="google-badge-count">${googleReviews.count} avis Google</span>
          <i class="fas fa-arrow-right google-badge-arrow"></i>
        </a>
      `;
      badgeEl.style.display = 'flex';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  // Slides
  carousel.innerHTML = testimonials.map((t, i) => {
    const isGoogle = t.source === 'google';
    return `
      <div class="testimonial-item ${i === 0 ? 'active' : ''}">
        <div class="testimonial-card">
          <div class="testimonial-card-header">
            <div class="testimonial-stars">${stars(t.rating || 5)}</div>
            ${isGoogle ? `<span class="testimonial-google-badge">${GOOGLE_LOGO_SVG} Google</span>` : ''}
          </div>
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
    `;
  }).join('');

  // Dots
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
  resetTestimonialTimer();
}

function goToTestimonial(i) {
  const items = document.querySelectorAll('.testimonial-item');
  if (!items.length) return;
  items[testimonialIndex].classList.remove('active');
  document.querySelectorAll('.dot')[testimonialIndex]?.classList.remove('active');
  testimonialIndex = i;
  items[i].classList.add('active');
  document.querySelectorAll('.dot')[i]?.classList.add('active');
  resetTestimonialTimer();
}

function resetTestimonialTimer() {
  if (!testimonialTimer) return;
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => stepTestimonial(1), 5000);
}

// ============================================
// SOCIAL LINKS
// ============================================

const SOCIAL_META = {
  facebook:  { icon: 'fab fa-facebook-f', label: 'Facebook' },
  instagram: { icon: 'fab fa-instagram',   label: 'Instagram' },
  linkedin:  { icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  twitter:   { icon: 'fab fa-x-twitter',  label: 'X' },
  youtube:   { icon: 'fab fa-youtube',     label: 'YouTube' },
  tiktok:    { icon: 'fab fa-tiktok',      label: 'TikTok' }
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
// GOOGLE MAPS
// ============================================

function renderMaps(embedUrl) {
  const el = document.getElementById('contact-map');
  if (!el) return;
  if (!embedUrl) {
    el.style.display = 'none';
    return;
  }
  el.style.display = 'block';
  el.innerHTML = `
    <iframe
      src="${embedUrl}"
      width="100%" height="100%"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="Localisation du garage"
    ></iframe>
  `;
}

// ============================================
// LIGHTBOX
// ============================================

let lightboxIndex = 0;

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
  document.getElementById('lightbox-prev')?.addEventListener('click',  () => navLightbox(-1));
  document.getElementById('lightbox-next')?.addEventListener('click',  () => navLightbox(1));
  document.getElementById('lightbox-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox-modal')?.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
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
    toggle.setAttribute('aria-label',
      menu.classList.contains('active') ? 'Fermer le menu' : 'Ouvrir le menu'
    );
  });

  menu?.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
    })
  );

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('header')?.offsetHeight || 72;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', () => {
    document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

// ============================================
// SCROLL REVEAL
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

function initContactForm(c) {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const ejs = c.emailjs;
  if (ejs?.public_key) {
    emailjs.init({ publicKey: ejs.public_key });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      notify('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notify('Adresse email invalide.', 'error');
      return;
    }

    // Mode démo si pas de config EmailJS
    if (!ejs?.service_id) {
      notify('Message envoyé ! Nous vous répondrons rapidement.', 'success');
      form.reset();
      return;
    }

    const btn = form.querySelector('button[type=submit]');
    const btnOriginal = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours…';

    try {
      await emailjs.send(ejs.service_id, ejs.template_id, {
        site_name:  c.siteName,
        from_name:  name,
        from_email: email,
        phone:      phone || '—',
        message:    message
      });

      notify('Message envoyé ! Nous vous répondrons dans les plus brefs délais.', 'success');
      form.reset();
    } catch {
      notify('Erreur lors de l\'envoi. Appelez-nous directement.', 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = btnOriginal;
    }
  });
}

// ============================================
// NOTIFICATIONS
// ============================================

function notify(message, type = 'info') {
  document.querySelectorAll('.notification').forEach(n => n.remove());
  const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
  const el   = document.createElement('div');
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
