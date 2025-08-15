import React, { useState, useEffect } from 'react';
import { useKV } from '@/spark-polyfills/kv';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  EnvelopeSimple
} from "@phosphor-icons/react";
import { Language, translations, TranslationKey } from '../translations';
import { Reservation } from './ReservationSystem';

interface EmailConfirmationSystemProps {
  language: Language;
  reservationId?: string;
  confirmationToken?: string;
  onBackToReservations: () => void;
}

const EmailConfirmationSystem: React.FC<EmailConfirmationSystemProps> = ({
  language,
  reservationId,
  confirmationToken,
  onBackToReservations
}) => {
  const [reservations, setReservations] = useKV<Reservation[]>('restaurant-reservations', []);
  const [confirmationStatus, setConfirmationStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [reservation, setReservation] = useState<Reservation | null>(null);

  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  useEffect(() => {
    if (!reservationId || !confirmationToken) {
      setConfirmationStatus('error');
      return;
    }

    // Find the reservation
    const foundReservation = reservations.find(
      r => r.id === reservationId && r.confirmationToken === confirmationToken
    );

    if (!foundReservation) {
      setConfirmationStatus('error');
      return;
    }

    // Check if token is expired
    if (foundReservation.expiresAt && new Date() > new Date(foundReservation.expiresAt)) {
      setConfirmationStatus('expired');
      setReservation(foundReservation);
      return;
    }

    // Check if already confirmed
    if (foundReservation.status === 'confirmed') {
      setConfirmationStatus('success');
      setReservation(foundReservation);
      return;
    }

    // Confirm the reservation
    setReservations(current =>
      current.map(r =>
        r.id === reservationId ? { ...r, status: 'confirmed' } : r
      )
    );

    setReservation({ ...foundReservation, status: 'confirmed' });
    setConfirmationStatus('success');
  }, [reservationId, confirmationToken, reservations]);

  const renderContent = () => {
    switch (confirmationStatus) {
      case 'loading':
        return (
          <div className="text-center py-8">
            <Clock size={48} className="mx-auto text-primary mb-4 animate-pulse" />
            <h2 className="text-xl font-semibold mb-2">Processing Confirmation</h2>
            <p className="text-muted-foreground">Please wait while we confirm your reservation...</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-8">
            <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-green-600">Reservation Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Your reservation has been successfully confirmed. We look forward to welcoming you!
            </p>
            
            {reservation && (
              <div className="text-left max-w-md mx-auto space-y-4 p-6 bg-secondary/20 rounded-lg">
                <h3 className="font-semibold text-center mb-4">Reservation Details</h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{reservation.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{reservation.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{reservation.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guests:</span>
                    <span className="font-medium">{reservation.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{reservation.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{reservation.phone}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'expired':
        return (
          <div className="text-center py-8">
            <XCircle size={48} className="mx-auto text-red-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-red-600">Confirmation Link Expired</h2>
            <p className="text-muted-foreground mb-6">
              This confirmation link has expired. Please contact the restaurant directly to confirm your reservation.
            </p>
            
            <Alert className="max-w-md mx-auto">
              <EnvelopeSimple className="h-4 w-4" />
              <AlertDescription>
                For assistance, please call us at{' '}
                <a href="tel:0223610117" className="font-medium text-primary hover:underline">
                  0223610117
                </a>{' '}
                or email{' '}
                <a href="mailto:info@pizzeriadagino.nl" className="font-medium text-primary hover:underline">
                  info@pizzeriadagino.nl
                </a>
              </AlertDescription>
            </Alert>
          </div>
        );

      case 'error':
      default:
        return (
          <div className="text-center py-8">
            <XCircle size={48} className="mx-auto text-red-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-red-600">Invalid Confirmation Link</h2>
            <p className="text-muted-foreground mb-6">
              This confirmation link is invalid or has already been used. Please check your email for the correct link.
            </p>
            
            <Alert className="max-w-md mx-auto">
              <EnvelopeSimple className="h-4 w-4" />
              <AlertDescription>
                If you continue to have issues, please contact us at{' '}
                <a href="tel:0223610117" className="font-medium text-primary hover:underline">
                  0223610117
                </a>
              </AlertDescription>
            </Alert>
          </div>
        );
    }
  };

  return (
    <div className="container-responsive max-w-2xl mx-auto">
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <EnvelopeSimple size={20} className="text-primary" />
            </div>
            Email Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderContent()}
          
          <div className="flex justify-center mt-8">
            <Button
              onClick={onBackToReservations}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Reservations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfirmationSystem;