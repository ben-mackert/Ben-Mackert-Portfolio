(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  /* ---------- phone menu ---------- */
  var mast = $('#mast'), menuBtn = $('#menu-btn');
  if (mast && menuBtn) {
    var setMenu = function (open) {
      mast.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', function () { setMenu(!mast.classList.contains('open')); });
    mast.querySelectorAll('nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', function (e) { if (!mast.contains(e.target)) setMenu(false); });
  }

  /* ---------- videos play while on screen ---------- */
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !reduce) { var p = e.target.play(); if (p && p.catch) p.catch(function () {}); }
        else e.target.pause();
      });
    }, { rootMargin: '80px' });
    $$('video[data-auto]').forEach(function (v) { vio.observe(v); });
  }
  if (reduce) $$('video[data-auto]').forEach(function (v) { v.controls = true; });

  /* ---------- simulator replays: pick one ---------- */
  var sim = $('#sim-video'), cap = $('#sim-cap');
  $$('#sim-pick button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('#sim-pick button').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
      sim.poster = b.getAttribute('data-poster');
      sim.src = b.getAttribute('data-video');
      sim.setAttribute('aria-label', 'Simulator replay: ' + b.getAttribute('data-cap'));
      cap.textContent = b.getAttribute('data-cap');
      sim.load();
      if (!reduce) { var p = sim.play(); if (p && p.catch) p.catch(function () {}); }
    });
  });

  /* ---------- project filters ---------- */
  var chips = $$('.chip'), cards = $$('.card');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) {
        c.classList.toggle('is-active', c === chip);
        c.setAttribute('aria-pressed', String(c === chip));
      });
      cards.forEach(function (card) {
        card.hidden = !(f === 'all' || card.getAttribute('data-cat') === f);
        card.classList.toggle('is-filtered', f !== 'all');
        card.classList.add('in');
      });
    });
  });

  /* ---------- fade up on scroll ---------- */
  var rise = $$('.rise');
  if ('IntersectionObserver' in window && !reduce) {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px' });
    rise.forEach(function (t) { rio.observe(t); });
  } else {
    rise.forEach(function (t) { t.classList.add('in'); });
  }
})();
