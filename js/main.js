/* Nao - Things in Life */

// YouTube thumbnail fallback (maxres → hq)
document.querySelectorAll('.video-card .thumb img').forEach((img) => {
  img.addEventListener('error', function handleErr() {
    if (this.src.includes('maxresdefault')) {
      this.src = this.src.replace('maxresdefault', 'hqdefault');
    } else {
      this.removeEventListener('error', handleErr);
    }
  });
});

// Nav scroll
const nav = document.getElementById('globalNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Tabs
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.works-panel');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach((t) => t.classList.toggle('active', t === tab));
    panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === target));
  });
});

// Video Modal
const modal = document.getElementById('videoModal');
const modalFrame = document.getElementById('modalFrame');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.video-card').forEach((card) => {
  card.addEventListener('click', () => {
    const id = card.dataset.video;
    modalFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('open');
  modalFrame.innerHTML = '';
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Music embed (click to play)
const musicEmbed = document.getElementById('musicEmbed');
if (musicEmbed) {
  musicEmbed.addEventListener('click', () => {
    const id = musicEmbed.dataset.video;
    musicEmbed.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    musicEmbed.style.cursor = 'default';
  });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');
const photoItems = Array.from(document.querySelectorAll('.photo-item img'));
let lbIndex = 0;

function openLightbox(i) {
  lbIndex = i;
  const img = photoItems[lbIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCounter.textContent = `${String(lbIndex + 1).padStart(2, '0')} / ${String(photoItems.length).padStart(2, '0')}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
function showPrev() { openLightbox((lbIndex - 1 + photoItems.length) % photoItems.length); }
function showNext() { openLightbox((lbIndex + 1) % photoItems.length); }

photoItems.forEach((img, i) => img.parentElement.addEventListener('click', () => openLightbox(i)));
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

// Smooth nav offset for fixed header (links)
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
      }
    }
  });
});
