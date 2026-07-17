// Countdown
(function () {
  const el = document.getElementById('countdown');
  if (!el) return;
  let total = 23 * 3600 + 59 * 60 + 59;
  const key = 'photocards_countdown_end';
  let end = parseInt(localStorage.getItem(key));
  if (!end || end < Date.now()) {
    end = Date.now() + total * 1000;
    localStorage.setItem(key, end);
  }
  function tick() {
    let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    el.textContent = `${h}:${m}:${sec}`;
  }
  tick();
  setInterval(tick, 1000);
})();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Marquee é 100% CSS agora, sem JS
