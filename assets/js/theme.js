// Site theme script: fade-up on scroll for elements with class="reveal-up"
// (styles in assets/css/theme.css), the footer "back to top" button and the
// navbar call menus. Load in <head> so the class is set before first paint.
document.documentElement.classList.add('cps-js');

document.addEventListener('click', function (event) {
  var link = event.target.closest('[data-back-to-top]');
  if (!link) return;
  event.preventDefault();
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
});

// Navbar call menus: the phone icon opens a list of both numbers (styles in navbar.css)
function closeCallMenus(except) {
  document.querySelectorAll('.call-menu.is-open').forEach(function (menu) {
    if (menu === except) return;
    menu.classList.remove('is-open');
    var toggle = menu.querySelector('.call-menu-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });
}

document.addEventListener('click', function (event) {
  var toggle = event.target.closest('.call-menu-toggle');
  if (toggle) {
    var menu = toggle.closest('.call-menu');
    var open = !menu.classList.contains('is-open');
    closeCallMenus(menu);
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    return;
  }
  // Clicking a number dials it (tel: link) and closes the list; clicking elsewhere closes it too
  if (event.target.closest('.call-option') || !event.target.closest('.call-dropdown')) closeCallMenus();
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape') return;
  var open = document.querySelector('.call-menu.is-open');
  if (!open) return;
  closeCallMenus();
  var toggle = open.querySelector('.call-menu-toggle');
  if (toggle) toggle.focus();
});

document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.reveal-up');

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  items.forEach(function (el) {
    observer.observe(el);
  });
});
