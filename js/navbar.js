/* === js/navbar.js === */
/* ================================================
   KVS COCONUT TRADERS — NAVBAR JAVASCRIPT
   Handles sticky header styles, mobile drawer toggle,
   outside clicks/backdrops, and scrollspy navigation.
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initMobileMenu();
  initScrollspy();
});

/**
 * Adds '.scrolled' class to navbar when user scrolls past 50px threshold.
 */
function initStickyNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const checkScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Run on page load in case user refreshed halfway down
  checkScroll();

  window.addEventListener('scroll', checkScroll, { passive: true });
}

/**
 * Orchestrates hamburger toggles, backdrop toggles, and click-away closings.
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const backdrop = document.getElementById('navBackdrop');
  const links = document.querySelectorAll('.nav-link');

  if (!hamburger || !navLinks || !backdrop) return;

  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle('nav-open');
    hamburger.classList.toggle('is-active');
    backdrop.classList.toggle('is-visible');

    // Accessibility attribute update
    hamburger.setAttribute('aria-expanded', isOpen);
  };

  const closeMenu = () => {
    navLinks.classList.remove('nav-open');
    hamburger.classList.remove('is-active');
    backdrop.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  // Event Listeners
  hamburger.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);

  // Close when links are clicked (useful for smooth scrolls)
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * Monitors scroll position and highlights the correct nav link (scrollspy).
 */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const scrollspyHandler = () => {
    const scrollY = window.pageYOffset;
    const headerHeight = 82; // Height of navbar plus offset buffer

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerHeight;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollspyHandler, { passive: true });
}
