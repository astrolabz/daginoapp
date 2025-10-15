import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Shield, Cookie } from '@/components/icons';
import { getTranslation, Language } from '@/translations';

interface CookieConsentProps {
  language: Language;
}

const CONSENT_STORAGE_KEY = 'dagino-cookie-consent';
const CONSENT_TIMESTAMP_KEY = 'dagino-cookie-consent-timestamp';
const CONSENT_EXPIRY_DAYS = 365; // 1 year

interface ConsentData {
  analytics: boolean;
  functional: boolean;
  timestamp: number;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ language }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentData>({
    analytics: false,
    functional: true, // Always true for essential cookies
    timestamp: Date.now()
  });

  useEffect(() => {
    checkConsentStatus();
  }, []);

  const checkConsentStatus = () => {
    try {
      const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
      const savedTimestamp = localStorage.getItem(CONSENT_TIMESTAMP_KEY);
      
      if (savedConsent && savedTimestamp) {
        const consentData = JSON.parse(savedConsent) as ConsentData;
        const timestamp = parseInt(savedTimestamp);
        const now = Date.now();
        const daysSinceConsent = (now - timestamp) / (1000 * 60 * 60 * 24);
        
        if (daysSinceConsent < CONSENT_EXPIRY_DAYS) {
          // Consent is still valid
          setConsent(consentData);
          return;
        }
      }
      
      // Show banner if no valid consent found
      setShowBanner(true);
    } catch (error) {
      console.error('Error checking cookie consent:', error);
      setShowBanner(true);
    }
  };

  const saveConsent = (consentData: ConsentData) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
      localStorage.setItem(CONSENT_TIMESTAMP_KEY, consentData.timestamp.toString());
      setConsent(consentData);
      setShowBanner(false);
      
      // Reload page to initialize analytics if consented
      if (consentData.analytics) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  };

  const acceptAll = () => {
    const consentData: ConsentData = {
      analytics: true,
      functional: true,
      timestamp: Date.now()
    };
    saveConsent(consentData);
  };

  const acceptEssential = () => {
    const consentData: ConsentData = {
      analytics: false,
      functional: true,
      timestamp: Date.now()
    };
    saveConsent(consentData);
  };

  const toggleConsent = (type: 'analytics' | 'functional') => {
    if (type === 'functional') return; // Functional cookies are required
    
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const saveCustomConsent = () => {
    const consentData: ConsentData = {
      ...consent,
      timestamp: Date.now()
    };
    saveConsent(consentData);
  };

  const getText = (key: string): string => {
    const translations: Record<string, Partial<Record<Language, string>>> = {
      title: {
        it: 'Rispettiamo la tua privacy',
        nl: 'We respecteren je privacy',
        en: 'We respect your privacy',
        es: 'Respetamos tu privacidad',
        fr: 'Nous respectons votre vie privée',
        de: 'Wir respektieren Ihre Privatsphäre',
        pt: 'Respeitamos sua privacidade'
      },
      description: {
        it: 'Utilizziamo i cookie per migliorare la tua esperienza e comprendere come i visitatori utilizzano il nostro sito.',
        nl: 'We gebruiken cookies om je ervaring te verbeteren en te begrijpen hoe bezoekers onze site gebruiken.',
        en: 'We use cookies to improve your experience and understand how visitors use our site.',
        es: 'Utilizamos cookies para mejorar tu experiencia y entender cómo los visitantes usan nuestro sitio.',
        fr: 'Nous utilisons des cookies pour améliorer votre expérience et comprendre comment les visiteurs utilisent notre site.',
        de: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und zu verstehen, wie Besucher unsere Seite nutzen.',
        pt: 'Usamos cookies para melhorar sua experiência e entender como os visitantes usam nosso site.'
      },
      acceptAll: {
        it: 'Accetta tutti',
        nl: 'Accepteer alle',
        en: 'Accept all',
        es: 'Aceptar todo',
        fr: 'Accepter tout',
        de: 'Alle akzeptieren',
        pt: 'Aceitar tudo'
      },
      essential: {
        it: 'Solo essenziali',
        nl: 'Alleen essentieel',
        en: 'Essential only',
        es: 'Solo esenciales',
        fr: 'Essentiels uniquement',
        de: 'Nur wesentliche',
        pt: 'Apenas essenciais'
      },
      customize: {
        it: 'Personalizza',
        nl: 'Aanpassen',
        en: 'Customize',
        es: 'Personalizar',
        fr: 'Personnaliser',
        de: 'Anpassen',
        pt: 'Personalizar'
      },
      save: {
        it: 'Salva preferenze',
        nl: 'Voorkeuren opslaan',
        en: 'Save preferences',
        es: 'Guardar preferencias',
        fr: 'Sauvegarder les préférences',
        de: 'Einstellungen speichern',
        pt: 'Salvar preferências'
      },
      functional: {
        it: 'Cookie funzionali',
        nl: 'Functionele cookies',
        en: 'Functional cookies',
        es: 'Cookies funcionales',
        fr: 'Cookies fonctionnels',
        de: 'Funktionale Cookies',
        pt: 'Cookies funcionais'
      },
      analytics: {
        it: 'Cookie di analisi',
        nl: 'Analyse cookies',
        en: 'Analytics cookies',
        es: 'Cookies de análisis',
        fr: 'Cookies d\'analyse',
        de: 'Analyse-Cookies',
        pt: 'Cookies de análise'
      },
      functionalDesc: {
        it: 'Necessari per il funzionamento del sito (tema, lingua)',
        nl: 'Nodig voor de werking van de site (thema, taal)',
        en: 'Required for site functionality (theme, language)',
        es: 'Requeridos para el funcionamiento del sitio (tema, idioma)',
        fr: 'Requis pour le fonctionnement du site (thème, langue)',
        de: 'Erforderlich für die Funktionalität der Website (Theme, Sprache)',
        pt: 'Necessários para o funcionamento do site (tema, idioma)'
      },
      analyticsDesc: {
        it: 'Ci aiutano a migliorare il sito analizzando come lo utilizzi',
        nl: 'Helpen ons de site te verbeteren door te analyseren hoe je deze gebruikt',
        en: 'Help us improve the site by analyzing how you use it',
        es: 'Nos ayudan a mejorar el sitio analizando cómo lo usas',
        fr: 'Nous aident à améliorer le site en analysant votre utilisation',
        de: 'Helfen uns, die Website zu verbessern, indem sie analysieren, wie Sie sie nutzen',
        pt: 'Nos ajudam a melhorar o site analisando como você o usa'
      }
    };

    return translations[key]?.[language] || translations[key]?.it || key;
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <Card className="max-w-2xl mx-auto border-border/50 bg-background/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{getText('title')}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={acceptEssential}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {getText('description')}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          {showDetails ? (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{getText('functional')}</span>
                      <Badge variant="secondary" className="text-xs">
                        {language === 'it' ? 'Richiesti' : language === 'nl' ? 'Vereist' : 'Required'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getText('functionalDesc')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.functional}
                    disabled
                    className="w-4 h-4"
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Cookie className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{getText('analytics')}</span>
                      <Badge variant="outline" className="text-xs">
                        {language === 'it' ? 'Opzionale' : language === 'nl' ? 'Optioneel' : 'Optional'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getText('analyticsDesc')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={() => toggleConsent('analytics')}
                    className="w-4 h-4"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={saveCustomConsent} className="flex-1">
                  {getText('save')}
                </Button>
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  {language === 'it' ? 'Indietro' : language === 'nl' ? 'Terug' : 'Back'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button onClick={acceptAll} className="flex-1 min-w-[120px]">
                {getText('acceptAll')}
              </Button>
              <Button variant="outline" onClick={acceptEssential} className="flex-1 min-w-[120px]">
                {getText('essential')}
              </Button>
              <Button variant="ghost" onClick={() => setShowDetails(true)} className="flex-1 min-w-[120px]">
                {getText('customize')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Utility function to check if analytics consent is given
export const hasAnalyticsConsent = (): boolean => {
  try {
    const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    const savedTimestamp = localStorage.getItem(CONSENT_TIMESTAMP_KEY);
    
    if (savedConsent && savedTimestamp) {
      const consentData = JSON.parse(savedConsent) as ConsentData;
      const timestamp = parseInt(savedTimestamp);
      const now = Date.now();
      const daysSinceConsent = (now - timestamp) / (1000 * 60 * 60 * 24);
      
      return daysSinceConsent < CONSENT_EXPIRY_DAYS && consentData.analytics;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking analytics consent:', error);
    return false;
  }
};

export default CookieConsent;