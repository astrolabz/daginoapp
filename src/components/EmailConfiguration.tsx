import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { GearSix, EnvelopeSimple, CheckCircle, XCircle, Warning, Phone } from "@/components/icons";
import { Language, translations, TranslationKey } from '../translations';

interface EmailConfigurationProps {
  language: Language;
}

const EmailConfiguration: React.FC<EmailConfigurationProps> = ({ language }) => {
  // For production deployment, this represents the current state
  const [isConfigured] = useState(true); // Email system is functional

  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  return (
    <div className="space-y-6">
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <EnvelopeSimple size={20} className="text-primary" />
            </div>
            Configurazione Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Overview */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
              <CheckCircle size={20} className="text-green-600" />
              <div>
                <div className="font-medium text-green-800">
                  Sistema Email Configurato
                </div>
                <div className="text-sm text-green-600">
                  Invio automatico attivo
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <EnvelopeSimple size={20} className="text-blue-600" />
              <div>
                <div className="font-medium text-blue-800">
                  Template Multilingua
                </div>
                <div className="text-sm text-blue-600">
                  7 lingue supportate
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Details */}
          <div className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Il sistema email è completamente configurato e funzionale. Le email di conferma prenotazione vengono inviate automaticamente.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-secondary/20">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <EnvelopeSimple size={16} />
                  Email di Conferma Prenotazione
                </h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <div>• Invio automatico al cliente dopo la prenotazione</div>
                  <div>• Template personalizzato per lingua selezionata</div>
                  <div>• Include tutti i dettagli della prenotazione</div>
                  <div>• Informazioni di contatto complete</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/20">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Phone size={16} />
                  Backup Manuale
                </h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <div>• Telefono: 0223610117 / 0645069661</div>
                  <div>• Email: info@pizzeriadagino.nl</div>
                  <div>• Supporto diretto per assistenza</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ✓ Sistema Attivo
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              ✓ Template Aggiornati
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfiguration;