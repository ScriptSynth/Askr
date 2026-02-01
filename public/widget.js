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
    '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");',
    '#askr-popup-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:99998;opacity:0;visibility:hidden;transition:all 0.4s cubic-bezier(0.4,0,0.2,1)}',
    '#askr-popup-overlay.askr-visible{opacity:1;visibility:visible}',
    '#askr-popup{position:fixed;bottom:24px;right:24px;width:420px;max-width:calc(100vw - 48px);min-height:480px;background:linear-gradient(180deg,#ffffff 0%,#fafafa 100%);border-radius:24px;box-shadow:0 32px 64px -12px rgba(0,0,0,0.25),0 0 0 1px rgba(0,0,0,0.05);z-index:99999;transform:translateY(30px) scale(0.9);opacity:0;visibility:hidden;transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;overflow:hidden}',
    '#askr-popup.askr-visible{transform:translateY(0) scale(1);opacity:1;visibility:visible}',
    '#askr-popup *{box-sizing:border-box;margin:0;padding:0}',
    '.askr-header{padding:32px 28px 24px;text-align:center;background:linear-gradient(135deg,rgba(139,92,246,0.08) 0%,rgba(59,130,246,0.08) 100%);position:relative;overflow:hidden}',
    '.askr-header::before{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 60%);animation:askr-pulse 4s ease-in-out infinite}',
    '@keyframes askr-pulse{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.1);opacity:0.8}}',
    '.askr-icon{width:72px;height:72px;margin:0 auto 20px;background:linear-gradient(135deg,#8b5cf6 0%,#6366f1 50%,#3b82f6 100%);border-radius:20px;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 24px -4px rgba(139,92,246,0.4);position:relative;z-index:1}',
    '.askr-icon svg{width:36px;height:36px;color:#fff;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.2))}',
    '.askr-title{font-size:22px;font-weight:700;color:#0f172a;margin-bottom:8px;letter-spacing:-0.5px;position:relative;z-index:1}',
    '.askr-subtitle{font-size:15px;color:#64748b;font-weight:500;position:relative;z-index:1}',
    '.askr-close{position:absolute;top:16px;right:16px;width:36px;height:36px;border:none;background:rgba(255,255,255,0.9);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;box-shadow:0 2px 8px rgba(0,0,0,0.1);z-index:10}',
    '.askr-close:hover{background:#fff;transform:scale(1.1);box-shadow:0 4px 12px rgba(0,0,0,0.15)}',
    '.askr-close svg{width:18px;height:18px;color:#64748b}',
    '.askr-body{padding:28px 28px 24px}',
    '.askr-stars{display:flex;justify-content:center;gap:12px;margin-bottom:28px}',
    '.askr-star{width:52px;height:52px;border:none;background:linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%);border-radius:14px;cursor:pointer;padding:0;transition:all 0.2s cubic-bezier(0.4,0,0.2,1);box-shadow:0 2px 4px rgba(0,0,0,0.05)}',
    '.askr-star:hover{transform:scale(1.15) translateY(-4px);box-shadow:0 8px 16px rgba(250,204,21,0.3)}',
    '.askr-star svg{width:32px;height:32px;fill:#cbd5e1;transition:all 0.2s ease}',
    '.askr-star.active svg,.askr-star:hover svg{fill:#facc15;filter:drop-shadow(0 2px 8px rgba(250,204,21,0.5))}',
    '.askr-star.active{background:linear-gradient(180deg,#fefce8 0%,#fef9c3 100%);box-shadow:0 4px 12px rgba(250,204,21,0.25)}',
    '.askr-form{display:none;animation:askr-slideUp 0.3s ease}',
    '.askr-form.askr-visible{display:block}',
    '@keyframes askr-slideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}',
    '.askr-textarea{width:100%;min-height:120px;padding:16px;border:2px solid #e2e8f0;border-radius:16px;font-size:15px;resize:none;outline:none;transition:all 0.2s ease;font-family:inherit;background:#f8fafc;color:#0f172a;line-height:1.6}',
    '.askr-textarea::placeholder{color:#94a3b8}',
    '.askr-textarea:focus{border-color:#8b5cf6;background:#fff;box-shadow:0 0 0 4px rgba(139,92,246,0.1)}',
    '.askr-input{width:100%;padding:16px;border:2px solid #e2e8f0;border-radius:16px;font-size:15px;outline:none;transition:all 0.2s ease;margin-top:16px;font-family:inherit;background:#f8fafc;color:#0f172a}',
    '.askr-input::placeholder{color:#94a3b8}',
    '.askr-input:focus{border-color:#8b5cf6;background:#fff;box-shadow:0 0 0 4px rgba(139,92,246,0.1)}',
    '.askr-submit{width:100%;padding:18px 24px;background:linear-gradient(135deg,#8b5cf6 0%,#6366f1 50%,#3b82f6 100%);color:#fff;border:none;border-radius:16px;font-size:16px;font-weight:600;cursor:pointer;margin-top:20px;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);box-shadow:0 8px 16px -4px rgba(139,92,246,0.4);letter-spacing:-0.2px}',
    '.askr-submit:hover{transform:translateY(-2px);box-shadow:0 12px 24px -4px rgba(139,92,246,0.5)}',
    '.askr-submit:active{transform:translateY(0)}',
    '.askr-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none;box-shadow:none}',
    '.askr-success{text-align:center;padding:48px 28px}',
    '.askr-success-icon{width:80px;height:80px;margin:0 auto 24px;background:linear-gradient(135deg,#dcfce7 0%,#bbf7d0 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;animation:askr-bounce 0.6s ease}',
    '@keyframes askr-bounce{0%{transform:scale(0)}50%{transform:scale(1.2)}100%{transform:scale(1)}}',
    '.askr-success-icon svg{width:40px;height:40px;color:#22c55e}',
    '.askr-success-title{font-size:24px;font-weight:700;color:#0f172a;margin-bottom:12px;letter-spacing:-0.5px}',
    '.askr-success-msg{font-size:16px;color:#64748b;font-weight:500}',
    '.askr-branding{padding:16px 28px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #f1f5f9;background:#fafafa;font-weight:500}',
    '.askr-branding a{color:#8b5cf6;text-decoration:none;font-weight:600;transition:color 0.2s}',
    '.askr-branding a:hover{color:#7c3aed}',
    '@media(max-width:480px){#askr-popup{bottom:16px;right:16px;left:16px;width:auto;max-width:none;min-height:420px}.askr-header{padding:28px 24px 20px}.askr-body{padding:24px}.askr-star{width:44px;height:44px}.askr-star svg{width:26px;height:26px}}'
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
