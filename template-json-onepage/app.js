// Configuration et données JSON intégrées
const configs = {
  boulangerie: {
    siteName: "Boulangerie Artisanale Dubois",
    slogan: "L'art du pain depuis 1950",
    description: "Une boulangerie familiale qui perpétue la tradition artisanale française avec des produits frais et de qualité. Nos boulangers passionnés travaillent chaque jour pour vous offrir le meilleur du savoir-faire français.",
    colors: {
      primary: "#D4A574",
      secondary: "#8B4513",
      accent: "rgba(212, 165, 116, 0.15)"
    },
    hero: {
      title: "L'authenticité du pain artisanal",
      subtitle: "Découvrez nos créations gourmandes faites avec passion"
    },
    services: [
      {
        title: "Pain Traditionnel",
        description: "Baguettes, pains de campagne et spécialités régionales préparés selon les méthodes ancestrales",
        icon: "fas fa-bread-slice"
      },
      {
        title: "Viennoiseries",
        description: "Croissants, pains au chocolat et brioches maison préparés chaque matin",
        icon: "fas fa-cookie"
      },
      {
        title: "Pâtisseries",
        description: "Gâteaux, tartes et desserts sur commande pour toutes vos occasions spéciales",
        icon: "fas fa-birthday-cake"
      }
    ],
    contact: {
      address: "12 Rue de la Paix, 75001 Paris",
      phone: "01 42 36 58 79",
      email: "contact@boulangerie-dubois.fr",
      hours: "Lun-Sam: 6h30-19h30, Dim: 7h-13h"
    },
    testimonials: [
      {
        text: "Le meilleur pain de Paris ! Une qualité exceptionnelle et un accueil chaleureux. Je recommande vivement cette boulangerie familiale.",
        author: "Marie Dubois",
        role: "Cliente fidèle depuis 2018"
      },
      {
        text: "Des viennoiseries délicieuses et un service impeccable. C'est un plaisir de commencer la journée avec leurs croissants !",
        author: "Pierre Martin",
        role: "Habitant du quartier"
      }
    ]
  },
  agence_voyage: {
    siteName: "Évasion Voyages",
    slogan: "Votre passerelle vers l'aventure",
    description: "Agence de voyage spécialisée dans les destinations exotiques et les expériences authentiques. Nous créons des voyages sur mesure qui marquent une vie et créent des souvenirs inoubliables.",
    colors: {
      primary: "#2E86AB",
      secondary: "#A23B72",
      accent: "rgba(46, 134, 171, 0.15)"
    },
    hero: {
      title: "Explorez le monde avec nous",
      subtitle: "Des voyages sur mesure pour des souvenirs inoubliables"
    },
    services: [
      {
        title: "Voyages Sur Mesure",
        description: "Créons ensemble votre voyage idéal selon vos envies et votre budget personnalisé",
        icon: "fas fa-map-marked-alt"
      },
      {
        title: "Circuits Organisés",
        description: "Découvrez nos circuits accompagnés vers les plus belles destinations du monde",
        icon: "fas fa-users"
      },
      {
        title: "Réservations",
        description: "Hôtels, vols et activités au meilleur prix avec notre réseau de partenaires",
        icon: "fas fa-plane"
      }
    ],
    contact: {
      address: "45 Avenue des Champs-Élysées, 75008 Paris",
      phone: "01 53 75 42 18",
      email: "info@evasion-voyages.com",
      hours: "Lun-Ven: 9h-18h, Sam: 9h-17h"
    },
    testimonials: [
      {
        text: "Un voyage de rêve en Thaïlande organisé parfaitement ! L'équipe a su répondre à toutes nos attentes avec professionnalisme.",
        author: "Sophie Leroy",
        role: "Voyage en Asie - 2023"
      },
      {
        text: "Service exceptionnel et conseils personnalisés. Notre lune de miel aux Maldives était absolument parfaite grâce à eux !",
        author: "Antoine Dubois",
        role: "Voyage de noces - 2024"
      }
    ]
  },
  garage: {
    siteName: "Garage Martin Auto",
    slogan: "Votre expert automobile de confiance",
    description: "Spécialistes en réparation et entretien automobile depuis plus de 20 ans. Notre équipe de mécaniciens qualifiés prend soin de votre véhicule avec expertise et transparence.",
    colors: {
      primary: "#2C3E50",
      secondary: "#E74C3C",
      accent: "rgba(44, 62, 80, 0.15)"
    },
    hero: {
      title: "Expertise et fiabilité automobile",
      subtitle: "Prenez soin de votre véhicule avec nos services professionnels"
    },
    services: [
      {
        title: "Mécanique Générale",
        description: "Diagnostic, réparation moteur, transmission et suspensions par des experts qualifiés",
        icon: "fas fa-cogs"
      },
      {
        title: "Entretien Périodique",
        description: "Vidanges, révisions et contrôles préventifs pour la longévité de votre véhicule",
        icon: "fas fa-wrench"
      },
      {
        title: "Carrosserie",
        description: "Réparation de carrosserie et peinture automobile avec garantie qualité",
        icon: "fas fa-car"
      }
    ],
    contact: {
      address: "28 Boulevard de l'Industrie, 69200 Vénissieux",
      phone: "04 72 51 83 92",
      email: "contact@garage-martin.fr",
      hours: "Lun-Ven: 8h-18h, Sam: 8h-12h"
    },
    testimonials: [
      {
        text: "Travail impeccable et tarifs honnêtes. L'équipe a diagnostiqué et réparé ma voiture en temps record. Je recommande !",
        author: "Jean-Claude Petit",
        role: "Client depuis 2019"
      },
      {
        text: "Professionnalisme et transparence. Ils m'expliquent toujours ce qui doit être fait et pourquoi. Un garage de confiance !",
        author: "Isabelle Moreau",
        role: "Cliente fidèle"
      }
    ]
  }
};

// Variables globales
let currentConfig = 'boulangerie';
let currentTestimonialIndex = 0;

// Initialisation de l'application
$(document).ready(function() {
  console.log('Application en cours de chargement...');
  initializeApp();
  setupEventListeners();
  setupScrollReveal();
  
  // Charger la configuration par défaut
  setTimeout(function() {
    loadConfiguration(currentConfig);
    console.log('Configuration par défaut chargée');
  }, 100);
});

// Initialisation des fonctionnalités de base
function initializeApp() {
  // Configuration du smooth scroll pour les liens de navigation
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 70
      }, 800);
    }
  });

  // Gestion du menu mobile
  $('#navbar-toggle').on('click', function() {
    $('#navbar-menu').toggleClass('active');
    $(this).toggleClass('active');
  });

  // Fermer le menu mobile lors du clic sur un lien
  $('.nav-link').on('click', function() {
    $('#navbar-menu').removeClass('active');
    $('#navbar-toggle').removeClass('active');
  });

  // Gestion du scroll pour le header
  $(window).on('scroll', function() {
    const scrollTop = $(window).scrollTop();
    if (scrollTop > 100) {
      $('.header').addClass('scrolled');
    } else {
      $('.header').removeClass('scrolled');
    }
  });
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
  // Sélecteur de configuration
  $('#config-selector').on('change', function() {
    const selectedConfig = $(this).val();
    console.log('Configuration sélectionnée:', selectedConfig);
    loadConfiguration(selectedConfig);
  });

  // Formulaire de contact
  $('#contact-form').on('submit', function(e) {
    e.preventDefault();
    handleContactForm();
  });

  // Galerie lightbox
  $('.gallery-item').on('click', function() {
    openLightbox();
  });

  // Fermeture du modal
  $('.modal-close, .modal').on('click', function(e) {
    if (e.target === this) {
      closeLightbox();
    }
  });
}

// Chargement d'une configuration
function loadConfiguration(configName) {
  currentConfig = configName;
  const config = configs[configName];
  
  if (!config) {
    console.error('Configuration non trouvée:', configName);
    return;
  }

  console.log('Chargement de la configuration:', configName);

  // Mise à jour des couleurs CSS
  updateThemeColors(config.colors);
  
  // Mise à jour du contenu
  updateContent(config);
  
  // Mise à jour des services
  updateServices(config.services);
  
  // Mise à jour des témoignages
  updateTestimonials(config.testimonials);
  
  // Mettre à jour le sélecteur
  $('#config-selector').val(configName);
  
  console.log('Configuration chargée avec succès:', configName);
}

// Mise à jour des couleurs du thème
function updateThemeColors(colors) {
  const root = document.documentElement;
  root.style.setProperty('--template-primary', colors.primary);
  root.style.setProperty('--template-secondary', colors.secondary);
  root.style.setProperty('--template-accent', colors.accent);
  console.log('Couleurs mises à jour:', colors);
}

// Mise à jour du contenu textuel
function updateContent(config) {
  // Header et navigation
  $('#site-name').text(config.siteName);
  document.title = config.siteName;
  
  // Section Hero
  $('#hero-title').text(config.hero.title);
  $('#hero-subtitle').text(config.hero.subtitle);
  
  // Section À propos
  $('#about-title').text(config.slogan);
  $('#about-description').text(config.description);
  
  // Section Contact
  $('#contact-address').text(config.contact.address);
  $('#contact-phone').text(config.contact.phone);
  $('#contact-email').text(config.contact.email);
  $('#contact-hours').text(config.contact.hours);
  
  // Footer
  $('#footer-name').text(config.siteName);
  $('#footer-description').text(config.description.substring(0, 100) + '...');
  $('#footer-address').text(config.contact.address);
  $('#footer-phone').text(config.contact.phone);
  $('#footer-email').text(config.contact.email);
  $('#footer-copy-name').text(config.siteName);
  
  console.log('Contenu textuel mis à jour');
}

// Mise à jour des services
function updateServices(services) {
  const servicesGrid = $('#services-grid');
  servicesGrid.empty();
  
  services.forEach(service => {
    const serviceCard = $(`
      <div class="service-card reveal">
        <div class="service-icon">
          <i class="${service.icon}"></i>
        </div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </div>
    `);
    servicesGrid.append(serviceCard);
  });
  
  console.log('Services mis à jour:', services.length + ' services ajoutés');
  
  // Réinitialiser le scroll reveal pour les nouveaux éléments
  setTimeout(setupScrollReveal, 100);
}

// Mise à jour des témoignages
function updateTestimonials(testimonials) {
  const carousel = $('#testimonials-carousel');
  const dots = $('.testimonial-dots');
  
  carousel.empty();
  dots.empty();
  
  testimonials.forEach((testimonial, index) => {
    const testimonialItem = $(`
      <div class="testimonial-item ${index === 0 ? 'active' : ''}">
        <div class="testimonial-content">
          <div class="testimonial-text">
            <p>"${testimonial.text}"</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">
              <i class="fas fa-user"></i>
            </div>
            <div class="author-info">
              <h4>${testimonial.author}</h4>
              <p>${testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    `);
    carousel.append(testimonialItem);
    
    const dot = $(`<span class="dot ${index === 0 ? 'active' : ''}" data-testimonial="${index}"></span>`);
    dots.append(dot);
  });
  
  // Réinitialiser l'index
  currentTestimonialIndex = 0;
  
  // Ajouter les événements pour les dots
  $('.dot').on('click', function() {
    const index = parseInt($(this).attr('data-testimonial'));
    goToTestimonial(index);
  });
  
  console.log('Témoignages mis à jour:', testimonials.length + ' témoignages ajoutés');
}

// Navigation des témoignages
function changeTestimonial(direction) {
  const testimonials = $('.testimonial-item');
  const totalTestimonials = testimonials.length;
  
  if (totalTestimonials === 0) return;
  
  // Masquer le témoignage actuel
  testimonials.eq(currentTestimonialIndex).removeClass('active');
  $('.dot').eq(currentTestimonialIndex).removeClass('active');
  
  // Calculer le nouvel index
  currentTestimonialIndex += direction;
  if (currentTestimonialIndex >= totalTestimonials) {
    currentTestimonialIndex = 0;
  } else if (currentTestimonialIndex < 0) {
    currentTestimonialIndex = totalTestimonials - 1;
  }
  
  // Afficher le nouveau témoignage
  testimonials.eq(currentTestimonialIndex).addClass('active');
  $('.dot').eq(currentTestimonialIndex).addClass('active');
}

// Navigation directe vers un témoignage
function goToTestimonial(index) {
  const testimonials = $('.testimonial-item');
  
  if (testimonials.length === 0) return;
  
  // Masquer le témoignage actuel
  testimonials.eq(currentTestimonialIndex).removeClass('active');
  $('.dot').eq(currentTestimonialIndex).removeClass('active');
  
  // Définir le nouveau témoignage
  currentTestimonialIndex = index;
  
  // Afficher le nouveau témoignage
  testimonials.eq(currentTestimonialIndex).addClass('active');
  $('.dot').eq(currentTestimonialIndex).addClass('active');
}

// Fonctions globales pour les boutons de navigation
window.changeTestimonial = changeTestimonial;
window.currentTestimonial = function(n) {
  goToTestimonial(n - 1);
};

// Gestion du formulaire de contact
function handleContactForm() {
  const formData = {
    name: $('#name').val(),
    email: $('#email').val(),
    phone: $('#phone').val(),
    message: $('#message').val()
  };
  
  // Validation basique
  if (!formData.name || !formData.email || !formData.message) {
    showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
    return;
  }
  
  if (!isValidEmail(formData.email)) {
    showNotification('Veuillez entrer une adresse email valide.', 'error');
    return;
  }
  
  // Simulation d'envoi du formulaire
  showNotification('Message envoyé avec succès ! Nous vous répondrons rapidement.', 'success');
  
  // Réinitialiser le formulaire
  $('#contact-form')[0].reset();
  
  console.log('Données du formulaire:', formData);
}

// Validation email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Affichage des notifications
function showNotification(message, type = 'info') {
  // Supprimer les notifications existantes
  $('.notification').remove();
  
  const notification = $(`
    <div class="notification notification--${type}">
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    </div>
  `);
  
  $('body').append(notification);
  
  // Auto-masquer après 5 secondes
  setTimeout(() => {
    notification.fadeOut(() => notification.remove());
  }, 5000);
  
  // Fermeture manuelle
  $('.notification-close').on('click', function() {
    $(this).closest('.notification').fadeOut(() => $(this).remove());
  });
}

// Gestion de la lightbox pour la galerie
function openLightbox() {
  $('#lightbox-modal').removeClass('hidden');
  $('body').css('overflow', 'hidden');
}

function closeLightbox() {
  $('#lightbox-modal').addClass('hidden');
  $('body').css('overflow', 'auto');
}

// Configuration du scroll reveal
function setupScrollReveal() {
  const revealElements = $('.reveal');
  
  function checkReveal() {
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    
    revealElements.each(function() {
      const element = $(this);
      const elementTop = element.offset().top;
      
      if (elementTop < scrollTop + windowHeight - 100) {
        element.addClass('active');
      }
    });
  }
  
  // Vérifier au chargement et au scroll
  checkReveal();
  $(window).off('scroll.reveal').on('scroll.reveal', checkReveal);
}

// Auto-changement des témoignages
function startTestimonialAutoplay() {
  setInterval(() => {
    if ($('.testimonial-item').length > 1) {
      changeTestimonial(1);
    }
  }, 5000);
}

// Démarrer l'autoplay des témoignages après le chargement
$(window).on('load', function() {
  setTimeout(startTestimonialAutoplay, 3000);
});

// Gestion des touches clavier pour la lightbox
$(document).on('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Styles pour les notifications (ajoutés dynamiquement)
$('<style>')
  .prop('type', 'text/css')
  .html(`
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      max-width: 400px;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 3000;
      animation: slideInRight 0.3s ease-out;
    }
    
    .notification--success {
      background-color: rgba(33, 128, 141, 0.1);
      border: 1px solid rgba(33, 128, 141, 0.3);
      color: var(--color-success);
    }
    
    .notification--error {
      background-color: rgba(192, 21, 47, 0.1);
      border: 1px solid rgba(192, 21, 47, 0.3);
      color: var(--color-error);
    }
    
    .notification--info {
      background-color: rgba(98, 108, 113, 0.1);
      border: 1px solid rgba(98, 108, 113, 0.3);
      color: var(--color-info);
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    
    .notification-close {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: inherit;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    
    .notification-close:hover {
      opacity: 1;
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `)
  .appendTo('head');

// Debug: Afficher les configurations disponibles
console.log('Configurations disponibles:', Object.keys(configs));
console.log('Application initialisée avec la configuration:', currentConfig);