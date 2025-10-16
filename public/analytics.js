// Simple analytics tracker - no personal data collected
(function() {
  'use strict';

  // Configuration
  const ANALYTICS_ENDPOINT = '/analytics.php';

  // Send analytics event
  function track(event, page = '') {
    // Only track if endpoint is available
    if (!ANALYTICS_ENDPOINT) return;

    try {
      fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: event,
          page: page
        }),
        // Don't wait for response
        keepalive: true
      }).catch(() => {
        // Silently fail - analytics shouldn't break the site
      });
    } catch (e) {
      // Silently fail
    }
  }

  // Track page view on load
  function trackPageView() {
    const page = window.location.pathname;
    track('page', page);
  }

  // Track link clicks
  function trackLinkClick(event) {
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Track external links
    if (href.startsWith('http://') || href.startsWith('https://')) {
      const url = new URL(href);
      if (url.hostname !== window.location.hostname) {
        track('link', url.hostname);
      }
    }
  }

  // Initialize tracking
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageView);
  } else {
    trackPageView();
  }

  // Add click tracking to all links
  document.addEventListener('click', trackLinkClick);

})();
