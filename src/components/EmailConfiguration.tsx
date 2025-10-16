import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { EnvelopeSimple, CheckCircle, Phone } from '@/components/icons';
import { getTranslation, Language } from '../translations';

interface EmailConfigurationProps {
  language: Language;
}

const EmailConfiguration = ({ language }: EmailConfigurationProps) => {
  const localizedCopy: Partial<
    Record<
      Language,
      {
        heading: string;
        configuredTitle: string;
        configuredSubtitle: string;
        templateTitle: string;
        templateSubtitle: string;
        alertMessage: string;
        confirmationTitle: string;
        confirmationPoints: string[];
        backupTitle: string;
        backupPoints: string[];
        activeBadge: string;
        templateBadge: string;
      }
    >
  > = {
    it: {
      heading: 'Configurazione Email',
      configuredTitle: 'Sistema Email Configurato',
      configuredSubtitle: 'Invio automatico attivo',
      templateTitle: 'Template Multilingua',
      templateSubtitle: '7 lingue supportate',
      alertMessage:
        'Il sistema email è completamente configurato e funzionale. Le email di conferma prenotazione vengono inviate automaticamente.',
      confirmationTitle: 'Email di Conferma Prenotazione',
      confirmationPoints: [
        '• Invio automatico al cliente dopo la prenotazione',
        '• Template personalizzato per lingua selezionata',
        '• Include tutti i dettagli della prenotazione',
        '• Informazioni di contatto complete',
      ],
      backupTitle: 'Backup Manuale',
      backupPoints: [
        `• Telefono: ${getTranslation(language, 'phone')}`,
        '• Supporto diretto tramite prenotazione telefonica',
        '• Assistenza dedicata del nostro staff',
      ],
      activeBadge: '✓ Sistema Attivo',
      templateBadge: '✓ Template Aggiornati',
    },
    en: {
      heading: 'Email Configuration',
      configuredTitle: 'Email System Configured',
      configuredSubtitle: 'Automatic sending enabled',
      templateTitle: 'Multilingual Templates',
      templateSubtitle: '7 languages supported',
      alertMessage:
        'The email system is fully configured. Reservation confirmations are sent automatically.',
      confirmationTitle: 'Reservation Confirmation Email',
      confirmationPoints: [
        '• Automatic sending to the guest after booking',
        '• Language-specific templates',
        '• Includes all reservation details',
        '• Complete contact information',
      ],
      backupTitle: 'Manual Backup',
      backupPoints: [
        `• Phone: ${getTranslation(language, 'phone')}`,
        '• Direct support handled by our team',
        '• On-site assistance during opening hours',
      ],
      activeBadge: '✓ System Active',
      templateBadge: '✓ Templates Updated',
    },
    nl: {
      heading: 'E-mailconfiguratie',
      configuredTitle: 'E-mailsysteem Geconfigureerd',
      configuredSubtitle: 'Automatisch verzenden actief',
      templateTitle: 'Meertalige Templates',
      templateSubtitle: '7 ondersteunde talen',
      alertMessage:
        'Het e-mailsysteem is volledig geconfigureerd. Reserveringsbevestigingen worden automatisch verzonden.',
      confirmationTitle: 'Reserveringsbevestiging E-mail',
      confirmationPoints: [
        '• Automatische verzending naar de gast na reservering',
        '• Taalafhankelijke templates',
        '• Bevat alle reserveringsdetails',
        '• Volledige contactgegevens',
      ],
      backupTitle: 'Handmatige Back-up',
      backupPoints: [
        `• Telefoon: ${getTranslation(language, 'phone')}`,
        '• Directe ondersteuning door ons team',
        '• Hulp op locatie tijdens openingstijden',
      ],
      activeBadge: '✓ Systeem Actief',
      templateBadge: '✓ Templates Bijgewerkt',
    },
  };

  const content = localizedCopy[language] ?? localizedCopy.en ?? localizedCopy.it!;

  return (
    <div className="space-y-6">
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <EnvelopeSimple size={20} className="text-primary" />
            </div>
            {content.heading}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Overview */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
              <CheckCircle size={20} className="text-green-600" />
              <div>
                <div className="font-medium text-green-800">{content.configuredTitle}</div>
                <div className="text-sm text-green-600">{content.configuredSubtitle}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <EnvelopeSimple size={20} className="text-blue-600" />
              <div>
                <div className="font-medium text-blue-800">{content.templateTitle}</div>
                <div className="text-sm text-blue-600">{content.templateSubtitle}</div>
              </div>
            </div>
          </div>

          {/* Configuration Details */}
          <div className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{content.alertMessage}</AlertDescription>
            </Alert>

            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-secondary/20">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <EnvelopeSimple size={16} />
                  {content.confirmationTitle}
                </h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                  {content.confirmationPoints.map(point => (
                    <div key={`${content.confirmationTitle}-${point}`}>{point}</div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/20">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Phone size={16} />
                  {content.backupTitle}
                </h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                  {content.backupPoints.map(point => (
                    <div key={`${content.backupTitle}-${point}`}>{point}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {content.activeBadge}
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {content.templateBadge}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfiguration;
