/* script.js — Vanilla JS for reveal animations, header scroll state, and library search */

// Scroll-triggered reveals using IntersectionObserver
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
})();

// Header scroll-state: add .site-header--scrolled class when scrolled past threshold
(function() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let ticking = false;
  const threshold = 10;

  function updateHeaderState() {
    const scrolled = window.scrollY > threshold;
    if (scrolled) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeaderState);
      ticking = true;
    }
  }, { passive: true });
})();

// Library search filtering: client-side filter on .card elements
(function() {
  const searchInput = document.querySelector('.search-input');
  const searchForm = document.querySelector('.search-form');
  if (!searchInput) return;

  // Prevent form submission for client-side filtering
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const matches = query === '' || text.includes(query);

      if (matches) {
        card.classList.remove('search-hidden');
      } else {
        card.classList.add('search-hidden');
      }
    });
  });
})();


