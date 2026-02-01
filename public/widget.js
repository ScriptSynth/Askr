(function() {
    // Prevent multiple injections
    if (window.AskrWidgetInitialized) return;
    window.AskrWidgetInitialized = true;
  
    // Get configuration
    const scriptTag = document.currentScript;
    const projectId = scriptTag.getAttribute('data-project-id');
  
    if (!projectId) {
      console.error('Askr: data-project-id is required.');
      return;
    }

    // Get the origin from script source
    const origin = scriptTag.src ? new URL(scriptTag.src).origin : 'http://localhost:3000';
  
    // Ping the server to mark widget as connected
    const pingServer = () => {
      fetch(`${origin}/api/v1/ping`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId })
      }).catch(() => {});
    };
    
    // Initial ping
    pingServer();
    
    // Ping every 5 minutes to keep status active
    setInterval(pingServer, 5 * 60 * 1000);
  
    // Create container
    const container = document.createElement('div');
    container.id = 'askr-widget-container';
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '400px',
      height: '600px',
      zIndex: '9999',
      border: 'none',
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 0.5s ease',
    });
  
    // Create iframe
    const iframe = document.createElement('iframe');
    
    iframe.src = `${origin}/embed/${projectId}`;
    Object.assign(iframe.style, {
      width: '100%',
      height: '100%',
      border: 'none',
      background: 'transparent',
      pointerEvents: 'auto',
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
      if (event.data.type === 'askr-widget-close') {
        container.style.opacity = '0';
        setTimeout(() => {
          container.style.display = 'none';
        }, 500);
      }
    });
  })();
