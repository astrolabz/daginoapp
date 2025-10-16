import React, { useEffect } from 'react';
import { hasAnalyticsConsent } from './CookieConsent';

// Environment variable for Google Analytics ID
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// GDPR/Privacy compliant Google Analytics configuration
const ANALYTICS_CONFIG = {
  // Disable data sharing with Google for advertising purposes
  allow_google_signals: false,
  // Disable advertising features
  allow_ad_personalization_signals: false,
  // Set cookie expiration to 2 months instead of default 2 years
  cookie_expires: 63072000, // 2 months in seconds
  // Send anonymized IP addresses
  anonymize_ip: true,
  // Disable automatic cross-site tracking
  linker: false,
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId = GA_MEASUREMENT_ID }) => {
  useEffect(() => {
    // Only initialize analytics if we have a valid measurement ID
    // and we're not in development mode (unless explicitly enabled)
    const isDevelopment = import.meta.env.DEV;
    const enableInDev = import.meta.env.VITE_GA_ENABLE_IN_DEV === 'true';

    if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
      console.warn('Google Analytics: No valid measurement ID provided');
      return;
    }

    if (isDevelopment && !enableInDev) {
      console.log('Google Analytics: Disabled in development mode');
      return;
    }

    // Check for user consent
    if (!hasAnalyticsConsent()) {
      console.log('Google Analytics: User has not given consent');
      return;
    }

    // Initialize dataLayer if it doesn't exist
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    // Define gtag function
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    // Make gtag available globally
    window.gtag = gtag;

    // Configure gtag
    gtag('js', new Date());
    gtag('config', measurementId, ANALYTICS_CONFIG);

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      const existingScript = document.querySelector(`script[src*="${measurementId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [measurementId]);

  return null; // This component doesn't render anything
};

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Predefined tracking functions for common restaurant events
export const trackReservation = (method: 'thefork' | 'google' | 'phone') => {
  trackEvent('reservation_attempt', {
    event_category: 'engagement',
    event_label: method,
    value: 1,
  });
};

export const trackMenuView = (category: string) => {
  trackEvent('menu_view', {
    event_category: 'engagement',
    event_label: category,
    value: 1,
  });
};

export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', {
    event_category: 'user_preference',
    event_label: language,
    value: 1,
  });
};

export const trackThemeChange = (theme: 'light' | 'dark') => {
  trackEvent('theme_change', {
    event_category: 'user_preference',
    event_label: theme,
    value: 1,
  });
};

export const trackSocialClick = (platform: 'instagram' | 'facebook' | 'tripadvisor') => {
  trackEvent('social_click', {
    event_category: 'engagement',
    event_label: platform,
    value: 1,
  });
};

export const trackContactClick = (method: 'phone' | 'maps' | 'email') => {
  trackEvent('contact_click', {
    event_category: 'engagement',
    event_label: method,
    value: 1,
  });
};

export default GoogleAnalytics;
