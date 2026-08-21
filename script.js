/**
 * Al Nama Agricultural Landing Page
 * Interactive features: navigation, form, scroll animations
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // DOM references
  // ---------------------------------------------------------------------------
  const navHeader = document.getElementById('nav-header');
  const navHamburger = document.getElementById('nav-hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const form = document.getElementById('consultationForm');
  const formSuccess = document.getElementById('formSuccess');

  const NAV_HEIGHT = 70;

  // ---------------------------------------------------------------------------
  // 1. Navigation scroll effect
  // ---------------------------------------------------------------------------
  function handleNavScroll() {
    navHeader.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---------------------------------------------------------------------------
  // 2. Mobile navigation toggle
  // ---------------------------------------------------------------------------
  function openMenu() {
    navHamburger.classList.add('active');
    navMenu.classList.add('active');
    navHamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    navHamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navHamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  }

  navHamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (
      navMenu.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      !navHamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // ---------------------------------------------------------------------------
  // 3. Smooth scroll for anchor links
  // ---------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Contact form handling
  // ---------------------------------------------------------------------------
  var fields = {
    name:     { el: document.getElementById('form-name'),     error: document.getElementById('form-name-error'),     required: true },
    phone:    { el: document.getElementById('form-phone'),    error: document.getElementById('form-phone-error'),    required: true },
    service:  { el: document.getElementById('form-service'),  error: document.getElementById('form-service-error'),  required: true }
  };

  function showError(field, message) {
    field.el.classList.add('error');
    field.error.textContent = message;
  }

  function clearError(field) {
    field.el.classList.remove('error');
    field.error.textContent = '';
  }

  function validate() {
    var valid = true;

    if (!fields.name.el.value.trim()) {
      showError(fields.name, 'Please enter your full name.');
      valid = false;
    } else {
      clearError(fields.name);
    }

    if (!fields.phone.el.value.trim()) {
      showError(fields.phone, 'Please enter your phone or WhatsApp number.');
      valid = false;
    } else {
      clearError(fields.phone);
    }

    if (!fields.service.el.value) {
      showError(fields.service, 'Please select a service.');
      valid = false;
    } else {
      clearError(fields.service);
    }

    return valid;
  }

  Object.keys(fields).forEach(function (key) {
    fields[key].el.addEventListener('input', function () {
      clearError(fields[key]);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validate()) return;

    form.hidden = true;
    formSuccess.hidden = false;
  });

  // ---------------------------------------------------------------------------
  // 5. Active nav link highlighting on scroll (IntersectionObserver)
  // ---------------------------------------------------------------------------
  var observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  var currentActive = null;

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      var id = entry.target.getAttribute('id');
      var activeLink = document.querySelector('.nav-link[href="#' + id + '"]');

      if (activeLink && activeLink !== currentActive) {
        if (currentActive) currentActive.classList.remove('active');
        activeLink.classList.add('active');
        currentActive = activeLink;
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // Also observe the contact section inside the hero
  var contactSection = document.querySelector('.hero-form-card#contact');
  if (contactSection) {
    sectionObserver.observe(contactSection);
  }

  // ---------------------------------------------------------------------------
  // 6. Animate on scroll (elements with data-animate)
  // ---------------------------------------------------------------------------
  var animateElements = document.querySelectorAll('[data-animate]');

  if (animateElements.length) {
    var animateObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animateElements.forEach(function (el) {
      animateObserver.observe(el);
    });
  }
})();
