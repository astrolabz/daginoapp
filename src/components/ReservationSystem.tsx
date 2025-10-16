import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Language, TranslationKey, getTranslation } from '../translations';

interface ReservationSystemProps {
  language: Language;
}

const ReservationSystem = ({ language }: ReservationSystemProps) => {
  const t = (key: TranslationKey): string => getTranslation(language, key);

  return (
    <Card className="card-modern overflow-hidden">
      <CardHeader className="space-y-4 text-center">
        <CardTitle className="font-heading text-2xl sm:text-3xl text-foreground">
          {t('makeReservation')}
        </CardTitle>
        <CardDescription className="text-base sm:text-lg text-muted-foreground">
          {t('reservationDescription')}
        </CardDescription>
        <p className="text-sm text-muted-foreground">{t('reservationTheForkDisclaimer')}</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-3xl border bg-background shadow-inner">
          <iframe
            src="https://widget.thefork.com/e68ad953-a3d3-4166-beea-64412b0c6067"
            allow="payment *"
            loading="lazy"
            title={t('reservationWidgetTitle')}
            className="w-full"
            style={{
              minHeight: '800px',
              border: 'none',
              overflow: 'scroll',
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationSystem;
