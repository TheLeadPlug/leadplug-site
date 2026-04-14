/* ============================================
   THE LEAD PLUG — script.js
   ============================================ */

(function () {
  'use strict';

  // ——— STICKY NAV ———
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  // ——— HAMBURGER / MOBILE MENU ———
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on any link click inside the mobile menu
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close on ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // ——— SMOOTH SCROLL FOR ANCHOR LINKS ———
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();

      const navHeight = nav ? nav.offsetHeight : 0;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

  // ——— INTERSECTION OBSERVER: FADE-IN ———
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach(el => observer.observe(el));
  }

  // ——— STAGGERED CARD ANIMATIONS ———
  const staggerSets = document.querySelectorAll('.problem-grid, .services-grid, .testimonials-grid, .pricing-grid');

  if (staggerSets.length > 0) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.problem-card, .service-card, .testimonial-card, .pricing-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, i * 100);
            });
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    staggerSets.forEach(set => {
      // Set initial hidden state
      set.querySelectorAll('.problem-card, .service-card, .testimonial-card, .pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = 'opacity 0.55s ease, transform 0.55s ease, border-color 0.3s, background 0.3s, border-left-color 0.3s, border-top-color 0.3s';
      });
      cardObserver.observe(set);
    });
  }

  // ——— PRICING CARD HOVER GLOW ———
  const featuredCard = document.querySelector('.pricing-card.featured');
  if (featuredCard) {
    featuredCard.addEventListener('mouseenter', () => {
      featuredCard.style.boxShadow = '0 0 60px rgba(245, 91, 0, 0.18)';
    });
    featuredCard.addEventListener('mouseleave', () => {
      featuredCard.style.boxShadow = '';
    });
  }

})();
