import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Envelope, CheckCircle, Phone, Calendar } from "@/components/icons";

interface EmailTemplatePreviewProps {
  language: string;
  templateType: 'reservation-confirmation' | 'reservation-confirmed';
  sampleData?: Record<string, any>;
}

const EmailTemplatePreview: React.FC<EmailTemplatePreviewProps> = ({ 
  language, 
  templateType 
}) => {
  // Production-ready email template content
  const getEmailContent = () => {
    if (templateType === 'reservation-confirmation') {
      return {
        subject: language === 'it' ? 'Conferma prenotazione - Ristorante Pizzeria Da Gino' :
                language === 'en' ? 'Reservation Confirmation - Ristorante Pizzeria Da Gino' :
                language === 'nl' ? 'Reserveringsbevestiging - Ristorante Pizzeria Da Gino' :
                'Conferma prenotazione - Ristorante Pizzeria Da Gino',
        preview: language === 'it' ? 'La sua prenotazione è stata ricevuta e sarà confermata entro 24 ore.' :
                language === 'en' ? 'Your reservation has been received and will be confirmed within 24 hours.' :
                language === 'nl' ? 'Uw reservering is ontvangen en wordt binnen 24 uur bevestigd.' :
                'La sua prenotazione è stata ricevuta e sarà confermata entro 24 ore.'
      };
    } else {
      return {
        subject: language === 'it' ? 'Prenotazione confermata - Ristorante Pizzeria Da Gino' :
                language === 'en' ? 'Reservation Confirmed - Ristorante Pizzeria Da Gino' :
                language === 'nl' ? 'Reservering bevestigd - Ristorante Pizzeria Da Gino' :
                'Prenotazione confermata - Ristorante Pizzeria Da Gino',
        preview: language === 'it' ? 'La sua prenotazione è confermata. Vi aspettiamo da Gino!' :
                language === 'en' ? 'Your reservation is confirmed. We look forward to welcoming you!' :
                language === 'nl' ? 'Uw reservering is bevestigd. We kijken uit naar uw bezoek!' :
                'La sua prenotazione è confermata. Vi aspettiamo da Gino!'
      };
    }
  };

  const emailContent = getEmailContent();
  const templateTitle = templateType === 'reservation-confirmation' 
    ? 'Conferma Prenotazione' 
    : 'Prenotazione Confermata';

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
            Template attivo e funzionale
          </div>
          
          <div className="p-4 rounded-lg bg-secondary/20 border space-y-3">
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">Oggetto:</div>
              <div className="text-sm text-muted-foreground font-mono">
                {emailContent.subject}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">Anteprima:</div>
              <div className="text-sm text-muted-foreground italic">
                {emailContent.preview}
              </div>
            </div>
          </div>

          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone size={14} />
              Include informazioni di contatto complete
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={14} />
              Dettagli prenotazione formattati
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Envelope size={14} />
              Design responsive per tutti i dispositivi
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTemplatePreview;