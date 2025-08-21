import React, { useState } from 'react';
import { useKV } from '@/spark-polyfills/kv';
import * as reservationClient from '@/lib/reservationClient';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar,
  Clock,
  Users,
  Phone,
  EnvelopeSimple,
  CheckCircle,
  XCircle,
  WarningCircle,
  Trash,
  
} from "@phosphor-icons/react";
import { format } from 'date-fns';
import { Language, translations, TranslationKey } from '../translations';
import { Reservation } from './ReservationSystem';

interface ReservationAdminProps {
  language: Language;
}

const ReservationAdmin: React.FC<ReservationAdminProps> = ({ language }) => {
  const [reservations, setReservations] = useKV<Reservation[]>('restaurant-reservations', []);
  const isApiConfigured = Boolean(import.meta.env.VITE_RESERVATION_API_URL);

  // Load from API if configured
  React.useEffect(() => {
    let mounted = true;
    if (!isApiConfigured) return;
    (async () => {
      try {
        const list = await reservationClient.listReservations();
        if (!mounted) return;
        setReservations(list.map((r: any) => ({
          id: r.id,
          date: r.date,
          time: r.time,
          guests: r.covers || r.guests || 2,
          name: r.name,
          email: r.email,
          phone: r.phone,
          notes: r.notes || '',
          status: r.status || 'pending',
          createdAt: r.createdAt || new Date().toISOString(),
        })) as any);
      } catch (err) {
        console.warn('Failed to load reservations from API, using local storage', err);
      }
    })();
    return () => { mounted = false; };
  }, []);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  // Filter reservations
  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'all') return true;
    return reservation.status === filter;
  });

  // Update reservation status
  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    // Update locally
    setReservations(current => 
      current.map(res => 
        res.id === id ? { ...res, status } : res
      )
    );
    // Update remote when available
    if (isApiConfigured) {
      reservationClient.updateReservation(id, { status }).catch(err => console.warn('Failed to update remote reservation', err));
    }
  };

  // Delete reservation
  const deleteReservation = (id: string) => {
    // NOTE: confirm() is a browser-native prompt; consider replacing with a styled modal
    // for better UX. Also ensure deletion is authorized server-side in production.
    if (confirm('Are you sure you want to delete this reservation?')) {
      setReservations(current => current.filter(res => res.id !== id));
      if (isApiConfigured) {
        reservationClient.deleteReservation(id).catch(err => console.warn('Failed to delete remote reservation', err));
      }
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50 border-green-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} className="text-green-600" />;
  case 'cancelled': return <XCircle size={16} className="text-red-600" />;
  default: return <WarningCircle size={16} className="text-yellow-600" />;
    }
  };

  // Stats
  const stats = {
    total: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length
  };

  return (
    <div className="space-y-6">
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar size={20} className="text-primary" />
            </div>
            Reservation Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Overview */}
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-secondary/20">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/20">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/20">
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
              <div className="text-sm text-muted-foreground">Confirmed</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/20">
              <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Filter by status:</label>
            <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reservations</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reservations List */}
          <div className="space-y-4">
            {filteredReservations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No reservations found for the selected filter.
              </div>
            ) : (
              filteredReservations.map((reservation) => (
                <Card key={reservation.id} className="card-modern">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Reservation Info */}
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 flex-1">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" />
                            <span className="font-medium">{format(new Date(reservation.date), 'PPP')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-primary" />
                            <span>{reservation.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-primary" />
                            <span>{reservation.guests} {reservation.guests === 1 ? 'person' : 'people'}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="font-medium">{reservation.name}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <EnvelopeSimple size={14} />
                            <span>{reservation.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone size={14} />
                            <span>{reservation.phone}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(reservation.status)}
                            <Badge className={getStatusColor(reservation.status)}>
                              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ID: {reservation.id.split('-')[1]}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Created: {format(new Date(reservation.createdAt), 'PPp')}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 min-w-[140px]">
                        {reservation.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                            className="w-full"
                          >
                            <CheckCircle size={14} className="mr-1" />
                            Confirm
                          </Button>
                        )}
                        
                        {reservation.status !== 'cancelled' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                            className="w-full"
                          >
                            <XCircle size={14} className="mr-1" />
                            Cancel
                          </Button>
                        )}
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteReservation(reservation.id)}
                          className="w-full"
                        >
                          <Trash size={14} className="mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    {/* Notes */}
                    {reservation.notes && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="text-sm font-medium mb-1">Notes:</div>
                        <div className="text-sm text-muted-foreground">{reservation.notes}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationAdmin;