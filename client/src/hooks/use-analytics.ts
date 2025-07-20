
import { useCallback } from 'react';

// Generate a session ID for the user
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics-session');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('analytics-session', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  const sessionId = getSessionId();

  const trackPageView = useCallback(async (page: string) => {
    try {
      await fetch('/api/analytics/page-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          userAgent: navigator.userAgent,
          sessionId
        }),
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }, [sessionId]);

  const trackInteraction = useCallback(async (
    type: string, 
    element?: string, 
    page?: string, 
    data?: any
  ) => {
    try {
      await fetch('/api/analytics/interaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          element,
          page: page || window.location.pathname,
          data,
          sessionId
        }),
      });
    } catch (error) {
      console.error('Failed to track interaction:', error);
    }
  }, [sessionId]);

  return {
    trackPageView,
    trackInteraction,
    sessionId
  };
};
