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

// ── Preço local aproximado por país ──────────────────────────────
// Detecta o país via Cloudflare (/cdn-cgi/trace) — sem API externa.
// Câmbio 1 USD ≈ rate. ATUALIZAR de vez em quando (Argentina muda rápido).
(function () {
  var USD = 8.90;
  var COUNTRIES = {
    AR: { sym: 'AR$', code: 'ARS', loc: 'es-AR', rate: 1250, dec: 0, step: 100 },
    MX: { sym: 'MX$', code: 'MXN', loc: 'es-MX', rate: 20,   dec: 0, step: 1  },
    CL: { sym: 'CLP$', code: 'CLP', loc: 'es-CL', rate: 950,  dec: 0, step: 50 },
    CO: { sym: 'COP$', code: 'COP', loc: 'es-CO', rate: 4100, dec: 0, step: 100 },
    PE: { sym: 'S/',  code: 'PEN', loc: 'es-PE', rate: 3.75, dec: 0, step: 1  },
    UY: { sym: '$U',  code: 'UYU', loc: 'es-UY', rate: 40,   dec: 0, step: 10 },
    ES: { sym: '€',   code: 'EUR', loc: 'es-ES', rate: 0.92, dec: 2, step: 0  },
    BR: { sym: 'R$',  code: 'BRL', loc: 'pt-BR', rate: 5.8,  dec: 2, step: 0  }
  };

  function render(cfg) {
    var raw = USD * cfg.rate;
    var val = cfg.step ? Math.round(raw / cfg.step) * cfg.step : raw;
    var num = new Intl.NumberFormat(cfg.loc, {
      minimumFractionDigits: cfg.dec,
      maximumFractionDigits: cfg.dec
    }).format(val);
    var label = cfg.sym + ' ' + num;

    document.querySelectorAll('.price-hero').forEach(function (box) {
      var usd = box.querySelector('.price-new-big');
      if (usd) usd.classList.add('has-local');
      if (box.querySelector('.price-local')) return;
      var el = document.createElement('span');
      el.className = 'price-local show';
      el.textContent = label;
      box.appendChild(el);
    });
  }

  fetch('/cdn-cgi/trace')
    .then(function (r) { return r.text(); })
    .then(function (t) {
      var m = t.match(/loc=([A-Z]{2})/);
      var cfg = m && COUNTRIES[m[1]];
      if (cfg) render(cfg);
    })
    .catch(function () { /* mantém só USD */ });
})();
