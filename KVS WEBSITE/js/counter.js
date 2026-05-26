/* === js/counter.js === */
/* ================================================
   KVS COCONUT TRADERS — STATS COUNTER JAVASCRIPT
   Animates numeric values when the statistics section
   scrolls into view using requestAnimationFrame.
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initStatsCounter();
});

/**
 * Initializes the observer to watch stats section and triggers counters.
 */
function initStatsCounter() {
  const statsSection = document.getElementById('stats');
  const counterElements = document.querySelectorAll('.counter-number');

  if (!statsSection || !counterElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of section is visible
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger animation for all counter elements
        counterElements.forEach(counter => {
          animateCounter(counter);
        });
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statsObserver.observe(statsSection);
}

/**
 * Animates a single counter element from 0 to its target value.
 * Uses performance.now() and requestAnimationFrame for high-precision,
 * lag-free updates.
 *
 * @param {HTMLElement} element - The DOM element containing counter attributes
 */
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'), 10);
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000; // Duration of counting in milliseconds (2 seconds)
  let startTime = null;

  if (isNaN(target)) return;

  function updateCounter(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = currentTime - startTime;

    // Calculate fraction of completion (capped at 1)
    const percentage = Math.min(progress / duration, 1);

    // Easing function (easeOutQuad) for premium fluid feel
    const easeProgress = percentage * (2 - percentage);

    // Calculate current frame value
    const currentValue = Math.floor(easeProgress * target);

    // Update display content
    element.textContent = currentValue + suffix;

    if (progress < duration) {
      requestAnimationFrame(updateCounter);
    } else {
      // Ensure exact final target is printed
      element.textContent = target + suffix;
    }
  }

  requestAnimationFrame(updateCounter);
}
