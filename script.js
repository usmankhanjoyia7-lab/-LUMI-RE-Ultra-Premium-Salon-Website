
// ── Nav scroll
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 60);
  document.getElementById('back-top').classList.toggle('show', scrollY > 500);
}, { passive: true });

// ── Mobile menu
function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  const h = document.getElementById('hamburger');
  const open = m.classList.toggle('open');
  h.classList.toggle('open', open);
  h.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// ── Gallery filter
function filterGallery(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // All items always visible; real implementation would filter data-category attributes
}

// ── Modal
function openModal() {
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-form').style.display = 'block';
  document.getElementById('modal-success').style.display = 'none';
  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('f-date').min = today;
  setTimeout(() => document.getElementById('f-name').focus(), 100);
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
// Close modal on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Booking submit
function submitBooking() {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const service = document.getElementById('f-service').value;
  if (!name || !email) { showToast('Please enter your name and email'); return; }
  if (!email.includes('@')) { showToast('Please enter a valid email address'); return; }
  document.getElementById('modal-form').style.display = 'none';
  document.getElementById('modal-success').style.display = 'block';
  setTimeout(closeModal, 5000);
}

// ── Membership tier
function selectTier(el) {
  document.querySelectorAll('.tier-btn').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-pressed', 'false');
  });
  el.classList.add('active');
  el.setAttribute('aria-pressed', 'true');
}

// ── Membership submit
function handleMembership() {
  const name = document.getElementById('m-name').value.trim();
  const email = document.getElementById('m-email').value.trim();
  if (!name || !email) { showToast('Please complete all required fields'); return; }
  document.getElementById('m-name').value = '';
  document.getElementById('m-email').value = '';
  document.getElementById('m-phone').value = '';
  showToast('Welcome to the Lumière Inner Circle! ✦');
}

// ── Toast
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3500);
}

// ── Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Smooth anchor scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('nav').offsetHeight + 16;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});




 