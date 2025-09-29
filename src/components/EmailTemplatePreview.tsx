import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Envelope, CheckCircle, Phone, Calendar } from "@/components/icons";
import { Language } from "../translations";

type EmailTemplateType = 'reservation-confirmation' | 'reservation-confirmed';

interface EmailTemplatePreviewProps {
  language: Language;
  templateType: EmailTemplateType;
}

type TemplateCopy = {
  titles: Record<EmailTemplateType, string>;
  statusMessage: string;
  subjectLabel: string;
  previewLabel: string;
  highlights: string[];
  content: Record<EmailTemplateType, { subject: string; preview: string }>;
};

const localizedCopy: Partial<Record<Language, TemplateCopy>> = {
  it: {
    titles: {
      'reservation-confirmation': 'Conferma Prenotazione',
      'reservation-confirmed': 'Prenotazione Confermata'
    },
    statusMessage: 'Template attivo e funzionale',
    subjectLabel: 'Oggetto:',
    previewLabel: 'Anteprima:',
    highlights: [
      'Include informazioni di contatto complete',
      'Dettagli prenotazione formattati',
      'Design responsive per tutti i dispositivi'
    ],
    content: {
      'reservation-confirmation': {
        subject: 'Conferma prenotazione - Ristorante Pizzeria Da Gino',
        preview: 'La sua prenotazione è stata ricevuta e sarà confermata entro 24 ore.'
      },
      'reservation-confirmed': {
        subject: 'Prenotazione confermata - Ristorante Pizzeria Da Gino',
        preview: 'La sua prenotazione è confermata. Vi aspettiamo da Gino!'
      }
    }
  },
  en: {
    titles: {
      'reservation-confirmation': 'Reservation Confirmation',
      'reservation-confirmed': 'Reservation Confirmed'
    },
    statusMessage: 'Template is live and ready to send',
    subjectLabel: 'Subject:',
    previewLabel: 'Preview:',
    highlights: [
      'Includes full contact information',
      'Reservation details are formatted clearly',
      'Responsive design for every device'
    ],
    content: {
      'reservation-confirmation': {
        subject: 'Reservation Confirmation - Ristorante Pizzeria Da Gino',
        preview: 'Your reservation has been received and will be confirmed within 24 hours.'
      },
      'reservation-confirmed': {
        subject: 'Reservation Confirmed - Ristorante Pizzeria Da Gino',
        preview: 'Your reservation is confirmed. We look forward to welcoming you!'
      }
    }
  },
  nl: {
    titles: {
      'reservation-confirmation': 'Reserveringsbevestiging',
      'reservation-confirmed': 'Reservering Bevestigd'
    },
    statusMessage: 'Template actief en gebruiksklaar',
    subjectLabel: 'Onderwerp:',
    previewLabel: 'Voorbeeld:',
    highlights: [
      'Bevat volledige contactinformatie',
      'Reserveringsdetails netjes geformatteerd',
      'Responsief ontwerp voor elk apparaat'
    ],
    content: {
      'reservation-confirmation': {
        subject: 'Reserveringsbevestiging - Ristorante Pizzeria Da Gino',
        preview: 'Uw reservering is ontvangen en wordt binnen 24 uur bevestigd.'
      },
      'reservation-confirmed': {
        subject: 'Reservering bevestigd - Ristorante Pizzeria Da Gino',
        preview: 'Uw reservering is bevestigd. We kijken uit naar uw bezoek!'
      }
    }
  }
};

const EmailTemplatePreview = ({ language, templateType }: EmailTemplatePreviewProps) => {
  const content = localizedCopy[language] ?? localizedCopy.en ?? localizedCopy.it!;
  const emailContent = content.content[templateType];
  const templateTitle = content.titles[templateType];

  return (
    <Card className="card-modern">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Envelope size={16} className="text-primary" />
          </div>
          {templateTitle}
          <Badge variant="secondary">{language.toUpperCase()}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-success">
            <CheckCircle size={16} className="text-green-600" />
            {content.statusMessage}
          </div>
          
          <div className="p-4 rounded-lg bg-secondary/20 border space-y-3">
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">{content.subjectLabel}</div>
              <div className="text-sm text-muted-foreground font-mono">
                {emailContent.subject}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">{content.previewLabel}</div>
              <div className="text-sm text-muted-foreground italic">
                {emailContent.preview}
              </div>
            </div>
          </div>

          <div className="grid gap-2 text-sm">
            {content.highlights.map((highlight, index) => (
              <div key={`${templateType}-highlight-${index}`} className="flex items-center gap-2 text-muted-foreground">
                {index === 0 && <Phone size={14} />}
                {index === 1 && <Calendar size={14} />}
                {index === 2 && <Envelope size={14} />}
                {index > 2 && <CheckCircle size={14} className="text-muted-foreground" />}
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTemplatePreview;