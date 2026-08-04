// Moteur des pages secondaires.
//
// Volontairement minimal : sur ces pages le contenu est déjà dans le HTML
// (c'est ce qui les rend lisibles par Google sans exécuter de JavaScript).
// Il ne reste donc à gérer que le menu et les apparitions au défilement.

(function () {
  'use strict';

  // --- menu mobile
  var toggle = document.getElementById('navbar-toggle');
  var menu = document.getElementById('navbar-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('active');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    menu.querySelectorAll('.nav-link').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }

  // --- ombre du header au défilement
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- apparitions (respecte le réglage système « animations réduites »)
  var cibles = document.querySelectorAll('.page-block, .page-gallery, .page-faq, .page-cta, .page-zones');
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!cibles.length) return;

  if (reduit || !('IntersectionObserver' in window)) {
    cibles.forEach(function (el) { el.classList.add('vu'); });
    return;
  }
  cibles.forEach(function (el) { el.classList.add('a-voir'); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('vu');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  cibles.forEach(function (el) { io.observe(el); });
})();
