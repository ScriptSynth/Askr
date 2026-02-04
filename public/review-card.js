(function() {
  'use strict';

  if (window.__ASKR_REVIEW_CARD_LOADED__) return;
  window.__ASKR_REVIEW_CARD_LOADED__ = true;

  function injectStyles() {
    if (document.getElementById('askr-review-card-styles')) return;
    var style = document.createElement('style');
    style.id = 'askr-review-card-styles';
    style.textContent = [
      '.askr-review-card{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial,sans-serif;border:1px solid rgba(124,58,237,.2);border-radius:16px;padding:20px;box-shadow:0 10px 30px rgba(15,23,42,.12);max-width:420px;background:#fff;position:relative;overflow:hidden}',
      '.askr-review-card__badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:#6d28d9;background:rgba(124,58,237,.12);padding:4px 8px;border-radius:999px}',
      '.askr-review-card__rating{display:flex;align-items:center;gap:4px;color:#f59e0b;margin-top:12px}',
      '.askr-review-card__content{margin-top:10px;font-size:15px;line-height:1.5;color:#0f172a}',
      '.askr-review-card__footer{margin-top:16px;display:flex;justify-content:space-between;align-items:center;color:#475569;font-size:12px}',
      '.askr-review-card__name{font-weight:600;color:#111827}',
      '.askr-review-card__verified{display:inline-flex;align-items:center;gap:6px;color:#16a34a;font-weight:600}',
      '.askr-review-card__brand{position:absolute;right:-40px;top:-40px;width:120px;height:120px;background:radial-gradient(circle at 30% 30%, rgba(124,58,237,.25), rgba(59,130,246,.05));filter:blur(6px);border-radius:999px}',
      '.askr-review-card__star{width:16px;height:16px;fill:currentColor}'
    ].join('');
    document.head.appendChild(style);
  }

  function getOrigin(scriptTag) {
    if (scriptTag && scriptTag.src) {
      try { return new URL(scriptTag.src).origin; } catch (e) {}
    }
    return window.location.origin;
  }

  function renderStars(rating) {
    var stars = '';
    for (var i = 1; i <= 5; i++) {
      stars += '<svg class="askr-review-card__star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.2 6.8.6-5.1 4.4 1.5 6.6L12 16.8 5.9 19.8 7.4 13.2 2.3 8.8l6.8-.6L12 2z" fill="' + (i <= rating ? 'currentColor' : 'rgba(148,163,184,.5)') + '"/></svg>';
    }
    return stars;
  }

  function formatDate(dateStr) {
    try {
      var date = new Date(dateStr);
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return '';
    }
  }

  function renderCard(el, data) {
    el.innerHTML = [
      '<div class="askr-review-card">',
      '  <div class="askr-review-card__brand"></div>',
      '  <div class="askr-review-card__badge">',
      '    Askr Review',
      '  </div>',
      '  <div class="askr-review-card__rating">',
      '    ' + renderStars(data.rating || 0),
      '  </div>',
      '  <div class="askr-review-card__content">' + (data.content || '') + '</div>',
      '  <div class="askr-review-card__footer">',
      '    <span class="askr-review-card__name">' + (data.customerName || 'Anonymous') + '</span>',
      '    <span class="askr-review-card__verified">',
      '      ✓ Verified by Askr',
      '    </span>',
      '  </div>',
      '  <div class="askr-review-card__footer">',
      '    <span>' + (data.projectName || 'Askr Customer') + '</span>',
      '    <span>' + formatDate(data.createdAt) + '</span>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function init() {
    injectStyles();

    var scriptTag = document.currentScript;
    var origin = getOrigin(scriptTag);

    var targets = document.querySelectorAll('[data-askr-review-id]');
    if (!targets.length) return;

    Array.prototype.forEach.call(targets, function(el) {
      var reviewId = el.getAttribute('data-askr-review-id');
      if (!reviewId) return;

      fetch(origin + '/api/v1/reviews/' + reviewId + '/card')
        .then(function(res) { return res.json(); })
        .then(function(data) {
          if (data && !data.error) {
            renderCard(el, data);
          } else {
            el.innerHTML = '<div class="askr-review-card">Review unavailable</div>';
          }
        })
        .catch(function() {
          el.innerHTML = '<div class="askr-review-card">Review unavailable</div>';
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
