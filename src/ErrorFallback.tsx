import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Warning, ArrowClockwise } from './components/icons';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: Readonly<ErrorFallbackProps>) {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <Warning size={32} className="text-destructive" />
          </div>
          <CardTitle className="text-xl">Qualcosa è andato storto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Si è verificato un errore imprevisto. Prova a ricaricare la pagina.
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={resetErrorBoundary} className="w-full">
              <ArrowClockwise size={16} className="mr-2" />
              Ricarica pagina
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/')}
              className="w-full"
            >
              Torna alla home
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4">
              <summary className="text-xs text-muted-foreground cursor-pointer">
                Dettagli errore (sviluppo)
              </summary>
              <pre className="text-xs mt-2 p-2 bg-muted rounded overflow-auto">{error.message}</pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ErrorFallback;
