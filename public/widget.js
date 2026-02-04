(function() {
  'use strict';
  
  // ============================================
  // STRICT SINGLETON - Prevent ALL duplicates
  // ============================================
  
  // Check 1: Global window flag
  if (window.__FACTO_WIDGET_LOADED__) {
    return;
  }
  
  // Check 2: DOM element already exists
  if (document.getElementById('facto-widget-container')) {
    return;
  }
  
  // IMMEDIATELY lock - before any async operation
  window.__FACTO_WIDGET_LOADED__ = true;
  
  // Find script tag
  var scriptTag = document.currentScript;
  if (!scriptTag) {
    var scripts = document.querySelectorAll('script[data-project-id][src*="widget"]');
    scriptTag = scripts.length > 0 ? scripts[0] : null;
  }
  
  // Check 3: Script already processed
  if (scriptTag && scriptTag.getAttribute('data-facto-init') === 'true') {
    return;
  }
  
  // Mark script as processed
  if (scriptTag) {
    scriptTag.setAttribute('data-facto-init', 'true');
  }
  
  // Get project ID
  var projectId = scriptTag ? scriptTag.getAttribute('data-project-id') : null;
  if (!projectId) {
    console.error('Facto: data-project-id is required');
    window.__FACTO_WIDGET_LOADED__ = false;
    return;
  }
  
  // ============================================
  // CONFIGURATION (from script attributes)
  // ============================================
  function getAttr(name, defaultVal) {
    return (scriptTag && scriptTag.getAttribute('data-' + name)) || defaultVal;
  }
  
  var origin = getAttr('origin', '') || (scriptTag && scriptTag.src ? new URL(scriptTag.src).origin : window.location.origin);
  
  // Default config (will be overridden by server settings)
  var config = {
    bottom: getAttr('bottom', '20px'),
    right: getAttr('right', '20px'),
    left: getAttr('left', ''),
    width: getAttr('width', '400px'),
    height: getAttr('height', '600px'),
    zIndex: getAttr('z-index', '9999'),
    delay: 5000,
    scroll: 0.5,
    position: 'bottom-right',
    origin: origin,
    openAnimation: 'fade',
    closeAnimation: 'fade',
    showOnceSession: false,
    deviceTarget: 'all'
  };
  
  // ============================================
  // FETCH SETTINGS AND INITIALIZE
  // ============================================
  function applyPosition() {
    var isLeft = config.position === 'bottom-left' || config.position === 'top-left';
    var isTop = config.position === 'top-left' || config.position === 'top-right';

    config.left = isLeft ? '20px' : 'auto';
    config.right = isLeft ? 'auto' : '20px';
    config.top = isTop ? '20px' : 'auto';
    config.bottom = isTop ? 'auto' : '20px';
  }
  
  function getHiddenTransform(animation) {
    switch (animation) {
      case 'slide-up':
        return 'translate3d(0, 20px, 0)';
      case 'slide-left':
        return 'translate3d(20px, 0, 0)';
      case 'zoom':
        return 'scale(0.92)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  }

  function getCloseTransform(animation) {
    switch (animation) {
      case 'slide-down':
        return 'translate3d(0, 20px, 0)';
      case 'slide-right':
        return 'translate3d(20px, 0, 0)';
      case 'zoom':
        return 'scale(0.92)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  }

  function shouldDisplay() {
    var isMobile = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;

    if (config.deviceTarget === 'desktop' && isMobile) return false;
    if (config.deviceTarget === 'mobile' && !isMobile) return false;

    if (config.showOnceSession) {
      try {
        var flag = sessionStorage.getItem('facto_widget_shown_' + projectId);
        if (flag === 'true') return false;
      } catch (e) {}
    }

    return true;
  }

  function markShown() {
    if (config.showOnceSession) {
      try {
        sessionStorage.setItem('facto_widget_shown_' + projectId, 'true');
      } catch (e) {}
    }
  }

  function createWidget() {
    applyPosition();

    if (!shouldDisplay()) {
      return;
    }
    
    var container = document.createElement('div');
    container.id = 'facto-widget-container';
    container.style.cssText = [
      'position: fixed',
      'bottom: ' + config.bottom,
      'top: ' + config.top,
      'right: ' + config.right,
      'left: ' + (config.left || 'auto'),
      'width: ' + config.width,
      'height: ' + config.height,
      'z-index: ' + config.zIndex,
      'border: none',
      'overflow: visible',
      'pointer-events: auto',
      'opacity: 0',
      'visibility: hidden',
      'transform: ' + getHiddenTransform(config.openAnimation),
      'transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease'
    ].join('; ');
    
    var iframe = document.createElement('iframe');
    iframe.src = config.origin + '/embed/' + projectId;
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('title', 'Feedback Widget');
    iframe.style.cssText = 'width: 100%; height: 100%; border: none; background: transparent; pointer-events: auto;';
    
    container.appendChild(iframe);
    document.body.appendChild(container);
    
    // Show/Hide Logic
    var state = { visible: false, triggered: false };
    
    function showWidget() {
      if (state.triggered) return;
      state.triggered = true;
      state.visible = true;
      container.style.visibility = 'visible';
      container.style.opacity = '1';
      container.style.transform = 'translate3d(0, 0, 0) scale(1)';
      markShown();
    }
    
    function hideWidget() {
      state.visible = false;
      container.style.opacity = '0';
      container.style.transform = getCloseTransform(config.closeAnimation);
      setTimeout(function() {
        container.style.visibility = 'hidden';
      }, 400);
    }
    
    // Delay trigger
    if (config.delay > 0) {
      setTimeout(showWidget, config.delay);
    }
    
    // Scroll trigger
    if (config.scroll > 0) {
      var handleScroll = function() {
        if (state.triggered) {
          window.removeEventListener('scroll', handleScroll);
          return;
        }
        var scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
        if (scrollPercent >= config.scroll) {
          showWidget();
          window.removeEventListener('scroll', handleScroll);
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    if (config.delay === 0 && config.scroll === 0) {
      showWidget();
    }
    
    // Message handler for close events
    window.addEventListener('message', function(event) {
      var data = event.data;
      if (!data) return;
      
      var isClose = data === 'facto-widget-close' || 
                    data.type === 'facto-widget-close' ||
                    data === 'askr-widget-close' ||
                    data.type === 'askr-widget-close';
      
      if (isClose) {
        hideWidget();
      }
    });
    
    // Expose API
    window.FactoWidget = {
      show: showWidget,
      hide: hideWidget,
      isVisible: function() { return state.visible; }
    };
  }
  
  // Fetch settings from server
  fetch(config.origin + '/api/v1/settings/' + projectId)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data && !data.error) {
        config.position = data.position || config.position;
        if (typeof data.delay === 'number' && !isNaN(data.delay)) {
          config.delay = data.delay;
        }
        if (typeof data.scroll === 'number' && !isNaN(data.scroll)) {
          config.scroll = data.scroll;
        }
        if (data.width !== undefined && data.width !== null) {
          config.width = parseInt(data.width, 10) + 'px';
        }
        if (data.height !== undefined && data.height !== null) {
          config.height = parseInt(data.height, 10) + 'px';
        }
        config.openAnimation = data.openAnimation || config.openAnimation;
        config.closeAnimation = data.closeAnimation || config.closeAnimation;
        config.showOnceSession = data.showOnceSession === true;
        config.deviceTarget = data.deviceTarget || config.deviceTarget;
      }
      createWidget();
    })
    .catch(function() {
      // Use defaults if fetch fails
      createWidget();
    });
  
})();