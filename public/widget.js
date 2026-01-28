(function() {
    // Prevent multiple injections
    if (window.FactoWidgetInitialized) return;
    window.FactoWidgetInitialized = true;
  
    // Get configuration
    const scriptTag = document.currentScript;
    const projectId = scriptTag.getAttribute('data-project-id');
  
    if (!projectId) {
      console.error('Facto: data-project-id is required.');
      return;
    }
  
    // Create container
    const container = document.createElement('div');
    container.id = 'facto-widget-container';
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '400px',
      height: '600px', // Large enough to hold the popover
      zIndex: '9999',
      border: 'none',
      overflow: 'hidden',
      pointerEvents: 'none', // Allow clicking through the transparent parts
      opacity: '0',
      transition: 'opacity 0.5s ease',
    });
  
    // Create iframe
    const iframe = document.createElement('iframe');
    // In production, this would be https://facto.me/embed/...
    // For now, we assume the script is loaded from the same origin or we hardcode localhost for dev
    const origin = scriptTag.src ? new URL(scriptTag.src).origin : 'http://localhost:3000';
    
    iframe.src = `${origin}/embed/${projectId}`;
    Object.assign(iframe.style, {
      width: '100%',
      height: '100%',
      border: 'none',
      background: 'transparent',
      pointerEvents: 'auto', // Enable clicking inside iframe
    });
  
    container.appendChild(iframe);
    document.body.appendChild(container);
  
    // Trigger Logic
    let isVisible = false;
  
    const showWidget = () => {
      if (isVisible) return;
      isVisible = true;
      container.style.opacity = '1';
    };
  
    // 1. Delay Trigger (5 seconds)
    setTimeout(showWidget, 5000);
  
    // 2. Scroll Trigger (50%)
    const handleScroll = () => {
      if (isVisible) return;
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent > 0.5) {
        showWidget();
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
  
    // Handle messages from iframe (e.g. close)
    window.addEventListener('message', (event) => {
      if (event.data.type === 'facto-widget-close') {
        container.style.opacity = '0';
        setTimeout(() => {
          container.style.display = 'none';
        }, 500);
      }
    });
  })();
