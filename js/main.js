/* === js/main.js === */
/* ================================================
   KVS COCONUT TRADERS — MAIN JAVASCRIPT
   Initialisation, scroll entrance animations using
   IntersectionObserver, and smooth scroll handling.
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ─── INITIALISE SCROLL ANIMATIONS ────────────────
  initScrollAnimations();

  // ─── INITIALISE SMOOTH SCROLL ───────────────────
  initSmoothScroll();
});

/**
 * Uses IntersectionObserver to trigger css fade-in-up animations
 * when elements enter the browser viewport.
 */
function initScrollAnimations() {
  // Select all target elements needing fade animation
  const animTargets = document.querySelectorAll('.fade-in-up');

  if (!animTargets.length) return;

  // Options configuration
  const observerOptions = {
    root: null, // relative to viewport
    rootMargin: '0px 0px -60px 0px', // triggers slightly before entry
    threshold: 0.1 // triggers when 10% of element is visible
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add class to trigger CSS transition
        entry.target.classList.add('visible');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Bind target elements to observer
  animTargets.forEach(target => {
    animationObserver.observe(target);
  });
}

/**
 * Intercepts anchor clicks and smoothly animates scrolling
 * to target section IDs.
 */
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // Only handle local hash anchors
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetElement = document.getElementById(targetId.substring(1));

      if (targetElement) {
        e.preventDefault();

        // Calculate offset (e.g. for sticky header)
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
