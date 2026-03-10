document.addEventListener('DOMContentLoaded', function () {
  // Accordion
  const accordions = Array.from(document.querySelectorAll('.accordion-button'));
  accordions.forEach((btn, idx) => {
    btn.addEventListener('click', () => toggleAccordion(btn));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAccordion(btn); }
      if (e.key === 'ArrowDown') { e.preventDefault(); const next = accordions[idx + 1] || accordions[0]; next.focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); const prev = accordions[idx - 1] || accordions[accordions.length - 1]; prev.focus(); }
    });
  });

  function toggleAccordion(btn) {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const panelId = btn.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
      const willOpen = !expanded;
      btn.setAttribute('aria-expanded', String(willOpen));
      if (panel) {
        panel.setAttribute('aria-hidden', String(!willOpen));
        // toggle parent class; CSS will control visibility
        const item = btn.closest('.accordion-item');
        if (item) item.classList.toggle('is-open', willOpen);
        // clear inline display fallback so CSS can take effect
        panel.style.display = '';
      }
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox ? lightbox.querySelector('img') : null;
  const lbCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
  const lbClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  let lastFocused = null;

  const targets = Array.from(document.querySelectorAll('.lightbox-img'));
  targets.forEach(img => {
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(img); } });
  });

  function openLightbox(img) {
    if (!lightbox || !lbImg) return;
    lastFocused = document.activeElement;
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = img.getAttribute('data-caption') || img.alt || '';
    lightbox.setAttribute('aria-hidden', 'false');
    lbClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    lbCaption.textContent = '';
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      // close if clicking outside image
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox) return;
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      closeLightbox();
    }
  });

});

// Open/Close all accordion controls
document.addEventListener('DOMContentLoaded', function () {
  const openAllBtn = document.getElementById('open-all-acc');
  const closeAllBtn = document.getElementById('close-all-acc');
  const accButtons = Array.from(document.querySelectorAll('.accordion-button'));
  function setAll(open) {
    accButtons.forEach(btn => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      btn.setAttribute('aria-expanded', String(open));
      if (panel) {
        panel.setAttribute('aria-hidden', String(!open));
        const item = btn.closest('.accordion-item');
        if (item) item.classList.toggle('is-open', open);
        panel.style.display = '';
      }
    });
  }
  if (openAllBtn) openAllBtn.addEventListener('click', () => setAll(true));
  if (closeAllBtn) closeAllBtn.addEventListener('click', () => setAll(false));
});

// Fallback for external/random images: if the external src fails to load, switch to the local original
document.addEventListener('DOMContentLoaded', function () {
  const imgs = Array.from(document.querySelectorAll('img[data-original-src]'));
  imgs.forEach(img => {
    // ensure visible by default
    img.style.display = img.style.display || 'block';

    // try to load the current src (which may be an external random image)
    const test = new Image();
    test.onload = function () {
      // good, do nothing (image will show)
    };
    test.onerror = function () {
      const fallback = img.getAttribute('data-original-src');
      if (fallback) img.src = fallback;
    };
    // Start test load (this will trigger onload or onerror)
    try {
      test.src = img.src;
    } catch (e) {
      const fallback = img.getAttribute('data-original-src');
      if (fallback) img.src = fallback;
    }
  });
});
