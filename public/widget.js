(function() {
  'use strict';

  // Strict singleton check
  if (window.__ASKR_LOADED__) return;
  window.__ASKR_LOADED__ = true;

  // Get script and project ID
  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];
  var projectId = currentScript.getAttribute('data-project-id');

  if (!projectId) {
    console.warn('[Askr] Missing data-project-id attribute');
    return;
  }

  // Determine origin
  var origin = 'https://askr.vercel.app';
  try {
    if (currentScript.src) {
      origin = new URL(currentScript.src).origin;
    }
  } catch (e) {
    origin = window.location.origin;
  }

  // Ping server
  function ping() {
    try {
      fetch(origin + '/api/v1/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId })
      }).catch(function() {});
    } catch (e) {}
  }
  ping();
  setInterval(ping, 300000);

  // Styles
  var css = document.createElement('style');
  css.textContent = [
    '#askr-popup-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:99998;opacity:0;visibility:hidden;transition:all 0.3s ease}',
    '#askr-popup-overlay.askr-visible{opacity:1;visibility:visible}',
    '#askr-popup{position:fixed;bottom:20px;right:20px;width:380px;max-width:calc(100vw - 40px);background:#fff;border-radius:20px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);z-index:99999;transform:translateY(20px) scale(0.95);opacity:0;visibility:hidden;transition:all 0.3s ease;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}',
    '#askr-popup.askr-visible{transform:translateY(0) scale(1);opacity:1;visibility:visible}',
    '#askr-popup *{box-sizing:border-box;margin:0;padding:0}',
    '.askr-header{padding:24px 24px 16px;text-align:center;border-bottom:1px solid #f1f1f1}',
    '.askr-icon{width:56px;height:56px;margin:0 auto 16px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border-radius:16px;display:flex;align-items:center;justify-content:center}',
    '.askr-icon svg{width:28px;height:28px;color:#fff}',
    '.askr-title{font-size:18px;font-weight:600;color:#111;margin-bottom:4px}',
    '.askr-subtitle{font-size:14px;color:#666}',
    '.askr-close{position:absolute;top:16px;right:16px;width:32px;height:32px;border:none;background:#f5f5f5;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s}',
    '.askr-close:hover{background:#e5e5e5}',
    '.askr-close svg{width:16px;height:16px;color:#666}',
    '.askr-body{padding:20px 24px}',
    '.askr-stars{display:flex;justify-content:center;gap:8px;margin-bottom:20px}',
    '.askr-star{width:44px;height:44px;border:none;background:none;cursor:pointer;padding:0;transition:transform 0.15s}',
    '.askr-star:hover{transform:scale(1.15)}',
    '.askr-star svg{width:44px;height:44px;fill:#e5e5e5;transition:fill 0.15s}',
    '.askr-star.active svg,.askr-star:hover svg{fill:#facc15}',
    '.askr-form{display:none}',
    '.askr-form.askr-visible{display:block}',
    '.askr-textarea{width:100%;min-height:100px;padding:12px;border:2px solid #e5e5e5;border-radius:12px;font-size:14px;resize:none;outline:none;transition:border 0.2s;font-family:inherit}',
    '.askr-textarea:focus{border-color:#8b5cf6}',
    '.askr-input{width:100%;padding:12px;border:2px solid #e5e5e5;border-radius:12px;font-size:14px;outline:none;transition:border 0.2s;margin-top:12px;font-family:inherit}',
    '.askr-input:focus{border-color:#8b5cf6}',
    '.askr-submit{width:100%;padding:14px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;margin-top:16px;transition:opacity 0.2s,transform 0.2s}',
    '.askr-submit:hover{opacity:0.9;transform:translateY(-1px)}',
    '.askr-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none}',
    '.askr-success{text-align:center;padding:40px 24px}',
    '.askr-success-icon{width:64px;height:64px;margin:0 auto 16px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center}',
    '.askr-success-icon svg{width:32px;height:32px;color:#22c55e}',
    '.askr-success-title{font-size:20px;font-weight:600;color:#111;margin-bottom:8px}',
    '.askr-success-msg{font-size:14px;color:#666}',
    '.askr-branding{padding:12px;text-align:center;font-size:11px;color:#999;border-top:1px solid #f1f1f1}',
    '.askr-branding a{color:#8b5cf6;text-decoration:none;font-weight:500}',
    '@media(max-width:440px){#askr-popup{bottom:10px;right:10px;left:10px;width:auto;max-width:none}}'
  ].join('');
  document.head.appendChild(css);

  // Build popup HTML
  var overlay = document.createElement('div');
  overlay.id = 'askr-popup-overlay';

  var popup = document.createElement('div');
  popup.id = 'askr-popup';
  popup.innerHTML = [
    '<button class="askr-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>',
    '<div class="askr-content">',
      '<div class="askr-header">',
        '<div class="askr-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>',
        '<h2 class="askr-title">How was your experience?</h2>',
        '<p class="askr-subtitle">Your feedback helps us improve</p>',
      '</div>',
      '<div class="askr-body">',
        '<div class="askr-stars">',
          '<button class="askr-star" data-rating="1"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></button>',
          '<button class="askr-star" data-rating="2"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></button>',
          '<button class="askr-star" data-rating="3"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></button>',
          '<button class="askr-star" data-rating="4"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></button>',
          '<button class="askr-star" data-rating="5"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></button>',
        '</div>',
        '<div class="askr-form">',
          '<textarea class="askr-textarea" placeholder="Tell us about your experience (optional)"></textarea>',
          '<input type="text" class="askr-input" placeholder="Your name (optional)">',
          '<button class="askr-submit">Submit Feedback</button>',
        '</div>',
      '</div>',
      '<div class="askr-success" style="display:none">',
        '<div class="askr-success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></div>',
        '<h3 class="askr-success-title">Thank you!</h3>',
        '<p class="askr-success-msg">Your feedback helps us grow.</p>',
      '</div>',
      '<div class="askr-branding">Powered by <a href="https://askr.vercel.app" target="_blank">Askr</a></div>',
    '</div>'
  ].join('');

  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  // State
  var rating = 0;
  var isOpen = false;
  var hasShown = false;

  // Elements
  var closeBtn = popup.querySelector('.askr-close');
  var stars = popup.querySelectorAll('.askr-star');
  var form = popup.querySelector('.askr-form');
  var textarea = popup.querySelector('.askr-textarea');
  var input = popup.querySelector('.askr-input');
  var submitBtn = popup.querySelector('.askr-submit');
  var successEl = popup.querySelector('.askr-success');
  var bodyEl = popup.querySelector('.askr-body');
  var headerEl = popup.querySelector('.askr-header');

  function show() {
    if (hasShown) return;
    hasShown = true;
    isOpen = true;
    overlay.classList.add('askr-visible');
    popup.classList.add('askr-visible');
  }

  function hide() {
    isOpen = false;
    overlay.classList.remove('askr-visible');
    popup.classList.remove('askr-visible');
  }

  function updateStars() {
    stars.forEach(function(star, i) {
      if (i < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  // Events
  closeBtn.addEventListener('click', hide);
  overlay.addEventListener('click', hide);

  stars.forEach(function(star) {
    star.addEventListener('click', function() {
      rating = parseInt(this.getAttribute('data-rating'));
      updateStars();
      form.classList.add('askr-visible');
    });
  });

  submitBtn.addEventListener('click', function() {
    if (rating === 0) return;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(origin + '/api/v1/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: projectId,
        rating: rating,
        content: textarea.value,
        customer_name: input.value
      })
    })
    .then(function(res) {
      if (res.ok) {
        headerEl.style.display = 'none';
        bodyEl.style.display = 'none';
        successEl.style.display = 'block';
        setTimeout(hide, 3000);
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Feedback';
        alert('Something went wrong. Please try again.');
      }
    })
    .catch(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Feedback';
      alert('Something went wrong. Please try again.');
    });
  });

  // Auto show after 5 seconds
  setTimeout(show, 5000);

  // Or show on 50% scroll
  function checkScroll() {
    if (hasShown) return;
    var scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    if (scrolled > 0.5) {
      show();
      window.removeEventListener('scroll', checkScroll);
    }
  }
  window.addEventListener('scroll', checkScroll);

})();
