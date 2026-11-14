(function () {
  function $(id) { return document.getElementById(id); }

  /* ---------- Nav: mobile menu and active section ---------- */
  var menuBtn = $('menuBtn'), navLinks = $('navLinks');
  function setMenu(open) { navLinks.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', String(open)); }
  menuBtn.addEventListener('click', function () { setMenu(!navLinks.classList.contains('open')); });
  navLinks.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  if ('IntersectionObserver' in window) {
    var links = navLinks.querySelectorAll('li:not(.nav-cta-item) a[href^="#"]');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        for (var j = 0; j < links.length; j++) links[j].classList.toggle('active', links[j].getAttribute('href') === '#' + en.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    var secs = document.querySelectorAll('section[id]');
    for (var s2 = 0; s2 < secs.length; s2++) io.observe(secs[s2]);
  }

  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Copy buttons ---------- */
  var copies = document.querySelectorAll('.copy[data-copy]');
  for (var c = 0; c < copies.length; c++) (function (btn) {
    btn.addEventListener('click', function () {
      var target = $(btn.getAttribute('data-copy')), text = target.textContent;
      function done() { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1500); }
      function fallback() {
        var range = document.createRange(); range.selectNodeContents(target);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    });
  })(copies[c]);
})();
