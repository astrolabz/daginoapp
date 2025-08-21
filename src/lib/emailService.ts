/**
 * Email Service Integration
 * Supports SendGrid and AWS SES for sending real emails
 */

export interface EmailProvider {
  name: 'sendgrid' | 'aws-ses' | 'simulation';
  apiKey?: string;
  region?: string; // For AWS SES
  fromEmail: string;
  fromName: string;
}

/* NOTE (AUDIT):
 * This module defines the shape of an email provider but MUST NOT store or expose API keys
 * on the client. Any use of SendGrid/AWS SES requires server-side code that keeps keys
 * secret. Recommended approach:
 *  - Implement a small server endpoint (Supabase edge function, Netlify Function, or a
 *    minimal server) that accepts reservation details and triggers the email using provider
 *    credentials stored as environment variables on the server.
 *  - From the frontend, call that endpoint. Do not call provider APIs directly from the
 *    browser.
 *
 * TODO: Create server wrapper and replace simulation mode with actual provider calls.
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailData {
  to: string;
  toName?: string;
  subject: string;
  html?: string;
  text?: string;
  templateId?: string;
  templateData?: Record<string, any>;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Email templates for different languages
export const EMAIL_TEMPLATES = {
  'reservation-confirmation': {
    it: {
      subject: '🍕 Conferma la tua prenotazione - Ristorante Pizzeria Da Gino',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Conferma Prenotazione</title>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background-color: #fafafa; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #c2410c, #d97706); padding: 40px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 20px; }
            .confirmation-box { background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
            .details-table td:first-child { font-weight: 600; color: #374151; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #c2410c, #d97706); color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
            .warning { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🍕 Ristorante Pizzeria Da Gino</h1>
              <p style="color: #fff; margin: 10px 0 0 0; opacity: 0.9;">Autentica Cucina Italiana</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1f2937;">Ciao {{customerName}},</h2>
              <p>Grazie per aver scelto il nostro ristorante! Per completare la tua prenotazione, ti preghiamo di confermarla cliccando sul pulsante qui sotto.</p>
              
              <div class="confirmation-box">
                <h3 style="margin-top: 0; color: #0ea5e9;">📋 Dettagli della Prenotazione</h3>
                <table class="details-table">
                  <tr>
                    <td>Numero Prenotazione:</td>
                    <td>{{reservationId}}</td>
                  </tr>
                  <tr>
                    <td>Data:</td>
                    <td>{{date}}</td>
                  </tr>
                  <tr>
                    <td>Ora:</td>
                    <td>{{time}}</td>
                  </tr>
                  <tr>
                    <td>Numero di Ospiti:</td>
                    <td>{{guests}}</td>
                  </tr>
                  {{#if specialRequests}}
                  <tr>
                    <td>Richieste Speciali:</td>
                    <td>{{specialRequests}}</td>
                  </tr>
                  {{/if}}
                </table>
              </div>
              
              <div style="text-align: center;">
                <a href="{{confirmationUrl}}" class="cta-button">✅ Conferma Prenotazione</a>
              </div>
              
              <div class="warning">
                <strong>⏰ Importante:</strong> Questa prenotazione scadrà tra 24 ore se non confermata. Ti preghiamo di confermarla il prima possibile.
              </div>
              
              <p>Se hai domande o hai bisogno di modificare la prenotazione, non esitare a contattarci:</p>
              <ul>
                <li>📞 Telefono: 0223610117 / 0645069661</li>
                <li>📧 Email: info@pizzeriadagino.nl</li>
                <li>📍 Indirizzo: Beatrixstraat 37, 1781 EM Den Helder</li>
              </ul>
              
              <p>Non vediamo l'ora di accoglierti nel nostro ristorante!</p>
              <p style="margin-bottom: 0;"><strong>Famiglia Da Gino</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2024 Ristorante Pizzeria Da Gino - Tutti i diritti riservati</p>
              <p>Beatrixstraat 37, 1781 EM Den Helder, Paesi Bassi</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Ciao {{customerName}},

Grazie per aver scelto il Ristorante Pizzeria Da Gino!

DETTAGLI DELLA PRENOTAZIONE:
- Numero: {{reservationId}}
- Data: {{date}}
- Ora: {{time}}
- Ospiti: {{guests}}
{{#if specialRequests}}- Richieste Speciali: {{specialRequests}}{{/if}}

Per confermare la tua prenotazione, visita: {{confirmationUrl}}

IMPORTANTE: Questa prenotazione scadrà tra 24 ore se non confermata.

Contattaci:
- Telefono: 0223610117 / 0645069661
- Email: info@pizzeriadagino.nl
- Indirizzo: Beatrixstraat 37, 1781 EM Den Helder

A presto!
Famiglia Da Gino
      `
    },
    en: {
      subject: '🍕 Confirm Your Reservation - Ristorante Pizzeria Da Gino',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reservation Confirmation</title>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background-color: #fafafa; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #c2410c, #d97706); padding: 40px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 20px; }
            .confirmation-box { background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
            .details-table td:first-child { font-weight: 600; color: #374151; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #c2410c, #d97706); color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
            .warning { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🍕 Ristorante Pizzeria Da Gino</h1>
              <p style="color: #fff; margin: 10px 0 0 0; opacity: 0.9;">Authentic Italian Cuisine</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1f2937;">Hello {{customerName}},</h2>
              <p>Thank you for choosing our restaurant! To complete your reservation, please confirm it by clicking the button below.</p>
              
              <div class="confirmation-box">
                <h3 style="margin-top: 0; color: #0ea5e9;">📋 Reservation Details</h3>
                <table class="details-table">
                  <tr>
                    <td>Reservation Number:</td>
                    <td>{{reservationId}}</td>
                  </tr>
                  <tr>
                    <td>Date:</td>
                    <td>{{date}}</td>
                  </tr>
                  <tr>
                    <td>Time:</td>
                    <td>{{time}}</td>
                  </tr>
                  <tr>
                    <td>Number of Guests:</td>
                    <td>{{guests}}</td>
                  </tr>
                  {{#if specialRequests}}
                  <tr>
                    <td>Special Requests:</td>
                    <td>{{specialRequests}}</td>
                  </tr>
                  {{/if}}
                </table>
              </div>
              
              <div style="text-align: center;">
                <a href="{{confirmationUrl}}" class="cta-button">✅ Confirm Reservation</a>
              </div>
              
              <div class="warning">
                <strong>⏰ Important:</strong> This reservation will expire in 24 hours if not confirmed. Please confirm as soon as possible.
              </div>
              
              <p>If you have any questions or need to modify your reservation, don't hesitate to contact us:</p>
              <ul>
                <li>📞 Phone: 0223610117 / 0645069661</li>
                <li>📧 Email: info@pizzeriadagino.nl</li>
                <li>📍 Address: Beatrixstraat 37, 1781 EM Den Helder</li>
              </ul>
              
              <p>We look forward to welcoming you to our restaurant!</p>
              <p style="margin-bottom: 0;"><strong>Da Gino Family</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2024 Ristorante Pizzeria Da Gino - All rights reserved</p>
              <p>Beatrixstraat 37, 1781 EM Den Helder, Netherlands</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello {{customerName}},

Thank you for choosing Ristorante Pizzeria Da Gino!

RESERVATION DETAILS:
- Number: {{reservationId}}
- Date: {{date}}
- Time: {{time}}
- Guests: {{guests}}
{{#if specialRequests}}- Special Requests: {{specialRequests}}{{/if}}

To confirm your reservation, visit: {{confirmationUrl}}

IMPORTANT: This reservation will expire in 24 hours if not confirmed.

Contact us:
- Phone: 0223610117 / 0645069661
- Email: info@pizzeriadagino.nl
- Address: Beatrixstraat 37, 1781 EM Den Helder

See you soon!
Da Gino Family
      `
    },
    nl: {
      subject: '🍕 Bevestig je Reservering - Ristorante Pizzeria Da Gino',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reservering Bevestiging</title>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background-color: #fafafa; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #c2410c, #d97706); padding: 40px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 20px; }
            .confirmation-box { background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
            .details-table td:first-child { font-weight: 600; color: #374151; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #c2410c, #d97706); color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
            .warning { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🍕 Ristorante Pizzeria Da Gino</h1>
              <p style="color: #fff; margin: 10px 0 0 0; opacity: 0.9;">Authentieke Italiaanse Keuken</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1f2937;">Hallo {{customerName}},</h2>
              <p>Bedankt voor het kiezen van ons restaurant! Om je reservering te voltooien, bevestig deze door op de knop hieronder te klikken.</p>
              
              <div class="confirmation-box">
                <h3 style="margin-top: 0; color: #0ea5e9;">📋 Reservering Details</h3>
                <table class="details-table">
                  <tr>
                    <td>Reserveringsnummer:</td>
                    <td>{{reservationId}}</td>
                  </tr>
                  <tr>
                    <td>Datum:</td>
                    <td>{{date}}</td>
                  </tr>
                  <tr>
                    <td>Tijd:</td>
                    <td>{{time}}</td>
                  </tr>
                  <tr>
                    <td>Aantal Gasten:</td>
                    <td>{{guests}}</td>
                  </tr>
                  {{#if specialRequests}}
                  <tr>
                    <td>Speciale Verzoeken:</td>
                    <td>{{specialRequests}}</td>
                  </tr>
                  {{/if}}
                </table>
              </div>
              
              <div style="text-align: center;">
                <a href="{{confirmationUrl}}" class="cta-button">✅ Bevestig Reservering</a>
              </div>
              
              <div class="warning">
                <strong>⏰ Belangrijk:</strong> Deze reservering verloopt over 24 uur als deze niet wordt bevestigd. Bevestig zo snel mogelijk.
              </div>
              
              <p>Als je vragen hebt of je reservering wilt wijzigen, aarzel dan niet om contact met ons op te nemen:</p>
              <ul>
                <li>📞 Telefoon: 0223610117 / 0645069661</li>
                <li>📧 Email: info@pizzeriadagino.nl</li>
                <li>📍 Adres: Beatrixstraat 37, 1781 EM Den Helder</li>
              </ul>
              
              <p>We kijken ernaar uit je in ons restaurant te verwelkomen!</p>
              <p style="margin-bottom: 0;"><strong>Familie Da Gino</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2024 Ristorante Pizzeria Da Gino - Alle rechten voorbehouden</p>
              <p>Beatrixstraat 37, 1781 EM Den Helder, Nederland</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hallo {{customerName}},

Bedankt voor het kiezen van Ristorante Pizzeria Da Gino!

RESERVERING DETAILS:
- Nummer: {{reservationId}}
- Datum: {{date}}
- Tijd: {{time}}
- Gasten: {{guests}}
{{#if specialRequests}}- Speciale Verzoeken: {{specialRequests}}{{/if}}

Om je reservering te bevestigen, bezoek: {{confirmationUrl}}

BELANGRIJK: Deze reservering verloopt over 24 uur als deze niet wordt bevestigd.

Contact:
- Telefoon: 0223610117 / 0645069661
- Email: info@pizzeriadagino.nl
- Adres: Beatrixstraat 37, 1781 EM Den Helder

Tot snel!
Familie Da Gino
      `
    }
  },
  'reservation-confirmed': {
    it: {
      subject: '✅ Prenotazione Confermata - Ristorante Pizzeria Da Gino',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Prenotazione Confermata</title>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background-color: #fafafa; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #059669, #10b981); padding: 40px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 20px; }
            .confirmation-box { background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
            .details-table td:first-child { font-weight: 600; color: #374151; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Prenotazione Confermata!</h1>
              <p style="color: #fff; margin: 10px 0 0 0; opacity: 0.9;">Ristorante Pizzeria Da Gino</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1f2937;">Perfetto, {{customerName}}!</h2>
              <p>La tua prenotazione è stata confermata con successo. Non vediamo l'ora di accoglierti nel nostro ristorante!</p>
              
              <div class="confirmation-box">
                <h3 style="margin-top: 0; color: #10b981;">🎉 Prenotazione Confermata</h3>
                <table class="details-table">
                  <tr>
                    <td>Numero Prenotazione:</td>
                    <td>{{reservationId}}</td>
                  </tr>
                  <tr>
                    <td>Data:</td>
                    <td>{{date}}</td>
                  </tr>
                  <tr>
                    <td>Ora:</td>
                    <td>{{time}}</td>
                  </tr>
                  <tr>
                    <td>Numero di Ospiti:</td>
                    <td>{{guests}}</td>
                  </tr>
                </table>
              </div>
              
              <p><strong>Cosa aspettarsi:</strong></p>
              <ul>
                <li>Ti preghiamo di arrivare puntuale</li>
                <li>Se hai ritardi, chiamaci al 0223610117</li>
                <li>Il nostro staff ti accoglierà calorosamente</li>
                <li>Preparati per un'autentica esperienza italiana!</li>
              </ul>
              
              <p><strong>Dove trovarci:</strong><br>
              📍 Beatrixstraat 37, 1781 EM Den Helder<br>
              📞 0223610117 / 0645069661</p>
              
              <p>Grazie per aver scelto Da Gino!</p>
              <p style="margin-bottom: 0;"><strong>Famiglia Da Gino</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2024 Ristorante Pizzeria Da Gino - Tutti i diritti riservati</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Perfetto, {{customerName}}!

La tua prenotazione è stata CONFERMATA!

DETTAGLI:
- Numero: {{reservationId}}
- Data: {{date}}
- Ora: {{time}}
- Ospiti: {{guests}}

Dove trovarci:
📍 Beatrixstraat 37, 1781 EM Den Helder
📞 0223610117 / 0645069661

Ti aspettiamo!
Famiglia Da Gino
      `
    },
    en: {
      subject: '✅ Reservation Confirmed - Ristorante Pizzeria Da Gino',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reservation Confirmed</title>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background-color: #fafafa; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #059669, #10b981); padding: 40px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 20px; }
            .confirmation-box { background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
            .details-table td:first-child { font-weight: 600; color: #374151; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Reservation Confirmed!</h1>
              <p style="color: #fff; margin: 10px 0 0 0; opacity: 0.9;">Ristorante Pizzeria Da Gino</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1f2937;">Perfect, {{customerName}}!</h2>
              <p>Your reservation has been successfully confirmed. We look forward to welcoming you to our restaurant!</p>
              
              <div class="confirmation-box">
                <h3 style="margin-top: 0; color: #10b981;">🎉 Reservation Confirmed</h3>
                <table class="details-table">
                  <tr>
                    <td>Reservation Number:</td>
                    <td>{{reservationId}}</td>
                  </tr>
                  <tr>
                    <td>Date:</td>
                    <td>{{date}}</td>
                  </tr>
                  <tr>
                    <td>Time:</td>
                    <td>{{time}}</td>
                  </tr>
                  <tr>
                    <td>Number of Guests:</td>
                    <td>{{guests}}</td>
                  </tr>
                </table>
              </div>
              
              <p><strong>What to expect:</strong></p>
              <ul>
                <li>Please arrive on time</li>
                <li>If you're running late, call us at 0223610117</li>
                <li>Our staff will welcome you warmly</li>
                <li>Get ready for an authentic Italian experience!</li>
              </ul>
              
              <p><strong>Find us at:</strong><br>
              📍 Beatrixstraat 37, 1781 EM Den Helder<br>
              📞 0223610117 / 0645069661</p>
              
              <p>Thank you for choosing Da Gino!</p>
              <p style="margin-bottom: 0;"><strong>Da Gino Family</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2024 Ristorante Pizzeria Da Gino - All rights reserved</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Perfect, {{customerName}}!

Your reservation has been CONFIRMED!

DETAILS:
- Number: {{reservationId}}
- Date: {{date}}
- Time: {{time}}
- Guests: {{guests}}

Find us at:
📍 Beatrixstraat 37, 1781 EM Den Helder
📞 0223610117 / 0645069661

See you soon!
Da Gino Family
      `
    },
    nl: {
      subject: '✅ Reservering Bevestigd - Ristorante Pizzeria Da Gino',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reservering Bevestigd</title>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background-color: #fafafa; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #059669, #10b981); padding: 40px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 20px; }
            .confirmation-box { background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
            .details-table td:first-child { font-weight: 600; color: #374151; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Reservering Bevestigd!</h1>
              <p style="color: #fff; margin: 10px 0 0 0; opacity: 0.9;">Ristorante Pizzeria Da Gino</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1f2937;">Perfect, {{customerName}}!</h2>
              <p>Je reservering is succesvol bevestigd. We kijken ernaar uit je in ons restaurant te verwelkomen!</p>
              
              <div class="confirmation-box">
                <h3 style="margin-top: 0; color: #10b981;">🎉 Reservering Bevestigd</h3>
                <table class="details-table">
                  <tr>
                    <td>Reserveringsnummer:</td>
                    <td>{{reservationId}}</td>
                  </tr>
                  <tr>
                    <td>Datum:</td>
                    <td>{{date}}</td>
                  </tr>
                  <tr>
                    <td>Tijd:</td>
                    <td>{{time}}</td>
                  </tr>
                  <tr>
                    <td>Aantal Gasten:</td>
                    <td>{{guests}}</td>
                  </tr>
                </table>
              </div>
              
              <p><strong>Wat te verwachten:</strong></p>
              <ul>
                <li>Kom alsjeblieft op tijd</li>
                <li>Als je vertraging hebt, bel ons op 0223610117</li>
                <li>Ons personeel zal je hartelijk verwelkomen</li>
                <li>Bereid je voor op een authentieke Italiaanse ervaring!</li>
              </ul>
              
              <p><strong>Vind ons bij:</strong><br>
              📍 Beatrixstraat 37, 1781 EM Den Helder<br>
              📞 0223610117 / 0645069661</p>
              
              <p>Bedankt voor het kiezen van Da Gino!</p>
              <p style="margin-bottom: 0;"><strong>Familie Da Gino</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2024 Ristorante Pizzeria Da Gino - Alle rechten voorbehouden</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Perfect, {{customerName}}!

Je reservering is BEVESTIGD!

DETAILS:
- Nummer: {{reservationId}}
- Datum: {{date}}
- Tijd: {{time}}
- Gasten: {{guests}}

Vind ons bij:
📍 Beatrixstraat 37, 1781 EM Den Helder
📞 0223610117 / 0645069661

Tot snel!
Familie Da Gino
      `
    }
  }
};

// Email Service Class
export class EmailService {
  private provider: EmailProvider;

  constructor(provider: EmailProvider) {
    this.provider = provider;
  }

  /**
   * Send email using the configured provider
   */
  async sendEmail(emailData: EmailData): Promise<EmailSendResult> {
    try {
      switch (this.provider.name) {
        case 'sendgrid':
          return await this.sendWithSendGrid(emailData);
        case 'aws-ses':
          return await this.sendWithAWSSES(emailData);
        case 'simulation':
        default:
          return await this.simulateEmail(emailData);
      }
    } catch (error) {
      console.error('Email service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Send email using SendGrid
   */
  private async sendWithSendGrid(emailData: EmailData): Promise<EmailSendResult> {
    if (!this.provider.apiKey) {
      throw new Error('SendGrid API key not configured');
    }

    const sendGridData = {
      personalizations: [{
        to: [{ email: emailData.to, name: emailData.toName }],
        subject: emailData.subject
      }],
      from: {
        email: this.provider.fromEmail,
        name: this.provider.fromName
      },
      content: [
        {
          type: 'text/plain',
          value: emailData.text || ''
        },
        {
          type: 'text/html',
          value: emailData.html || ''
        }
      ]
    };

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.provider.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendGridData)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`SendGrid error: ${error}`);
    }

    const messageId = response.headers.get('x-message-id') || 'unknown';
    
    return {
      success: true,
      messageId
    };
  }

  /**
   * Send email using AWS SES
   */
  private async sendWithAWSSES(emailData: EmailData): Promise<EmailSendResult> {
    if (!this.provider.apiKey || !this.provider.region) {
      throw new Error('AWS SES credentials not configured');
    }

    // Note: In a real implementation, you would use AWS SDK
    // For this demo, we'll use the REST API approach
    const sesData = {
      Source: `${this.provider.fromName} <${this.provider.fromEmail}>`,
      Destination: {
        ToAddresses: [emailData.to]
      },
      Message: {
        Subject: {
          Data: emailData.subject,
          Charset: 'UTF-8'
        },
        Body: {
          Text: {
            Data: emailData.text || '',
            Charset: 'UTF-8'
          },
          Html: {
            Data: emailData.html || '',
            Charset: 'UTF-8'
          }
        }
      }
    };

    // This is a simplified version - in reality you'd need proper AWS signature
    const response = await fetch(`https://email.${this.provider.region}.amazonaws.com/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.0',
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.SendEmail',
        'Authorization': `AWS4-HMAC-SHA256 Credential=${this.provider.apiKey}...` // Simplified
      },
      body: JSON.stringify(sesData)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AWS SES error: ${error}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      messageId: result.MessageId || 'unknown'
    };
  }

  /**
   * Simulate email sending for testing
   */
  private async simulateEmail(emailData: EmailData): Promise<EmailSendResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simulate 95% success rate
    if (Math.random() < 0.95) {
      const messageId = `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log('📧 Simulated email sent:', {
        to: emailData.to,
        subject: emailData.subject,
        messageId
      });
      
      return {
        success: true,
        messageId
      };
    } else {
      throw new Error('Simulated email failure');
    }
  }

  /**
   * Process template with data
   */
  processTemplate(template: string, data: Record<string, any>): string {
    let processed = template;
    
    // Simple template processing (in production, use a proper template engine like Handlebars)
    Object.entries(data).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processed = processed.replace(regex, String(value || ''));
    });

    // Handle conditional blocks (simplified)
    processed = processed.replace(/{{#if\s+(\w+)}}(.*?){{\/if}}/gs, (match, condition, content) => {
      return data[condition] ? content : '';
    });

    return processed;
  }

  /**
   * Send reservation confirmation email
   */
  async sendReservationConfirmation(
    reservation: any,
    language: string = 'en'
  ): Promise<EmailSendResult> {
    const templates = EMAIL_TEMPLATES['reservation-confirmation'];
    const template = templates[language as keyof typeof templates] || templates.en;

    const templateData = {
      customerName: reservation.name,
      reservationId: reservation.id,
      date: new Date(reservation.date).toLocaleDateString(
        language === 'it' ? 'it-IT' : 
        language === 'nl' ? 'nl-NL' : 'en-US'
      ),
      time: reservation.time,
      guests: reservation.guests,
      specialRequests: reservation.notes,
      confirmationUrl: `${window.location.origin}?confirm=${reservation.id}&token=${reservation.confirmationToken}`
    };

    const emailData: EmailData = {
      to: reservation.email,
      toName: reservation.name,
      subject: this.processTemplate(template.subject, templateData),
      html: this.processTemplate(template.html, templateData),
      text: this.processTemplate(template.text, templateData)
    };

    return await this.sendEmail(emailData);
  }

  /**
   * Send reservation confirmed email
   */
  async sendReservationConfirmed(
    reservation: any,
    language: string = 'en'
  ): Promise<EmailSendResult> {
    const templates = EMAIL_TEMPLATES['reservation-confirmed'];
    const template = templates[language as keyof typeof templates] || templates.en;

    const templateData = {
      customerName: reservation.name,
      reservationId: reservation.id,
      date: new Date(reservation.date).toLocaleDateString(
        language === 'it' ? 'it-IT' : 
        language === 'nl' ? 'nl-NL' : 'en-US'
      ),
      time: reservation.time,
      guests: reservation.guests
    };

    const emailData: EmailData = {
      to: reservation.email,
      toName: reservation.name,
      subject: this.processTemplate(template.subject, templateData),
      html: this.processTemplate(template.html, templateData),
      text: this.processTemplate(template.text, templateData)
    };

    return await this.sendEmail(emailData);
  }
}

// Factory function to create email service with configuration
export function createEmailService(): EmailService {
  // Try to get configuration from environment or localStorage
  const config = {
    provider: (localStorage.getItem('email-provider') as EmailProvider['name']) || 'simulation',
    apiKey: localStorage.getItem('email-api-key') || undefined,
    region: localStorage.getItem('email-region') || 'eu-west-1',
    fromEmail: localStorage.getItem('email-from') || 'info@pizzeriadagino.nl',
    fromName: localStorage.getItem('email-from-name') || 'Ristorante Pizzeria Da Gino'
  };

  const provider: EmailProvider = {
    name: config.provider,
    apiKey: config.apiKey,
    region: config.region,
    fromEmail: config.fromEmail,
    fromName: config.fromName
  };

  return new EmailService(provider);
}

// Global email service instance
export const emailService = createEmailService();