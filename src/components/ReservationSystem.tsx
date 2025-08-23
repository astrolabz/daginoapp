import React, { useState, useEffect } from 'react';
import { useKV } from '@/spark-polyfills/kv';
import * as reservationClient from '@/lib/reservationClient';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from 'sonner';
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  Phone,
  CheckCircle,
  XCircle,
  WarningCircle,
  ChefHat,
  MapPin,
  CaretLeft,
  CaretRight
} from "@phosphor-icons/react";
import { format, isBefore, isAfter, addDays, startOfDay, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { Language, translations, TranslationKey, getTranslation } from '../translations';

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  confirmationToken?: string;
  expiresAt?: string;
}

interface ReservationSystemProps {
  language: Language;
}

// Constants
const TIME_SLOTS = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
  '20:00', '20:30', '21:00', '21:30', '22:00'
];

const MAX_TABLE_SIZE = 8;
const MAX_TABLES = 12;
const ADVANCE_BOOKING_DAYS = 30;

const ReservationSystem: React.FC<ReservationSystemProps> = ({ language }) => {
  // State for reservations
  // State for reservations
  // Reservations are persisted client-side for offline/dev mode. If VITE_RESERVATION_API_URL is
  // configured, reservations will be loaded from and written to the Reservation API service.
  const [reservations, setReservations] = useKV<Reservation[]>('restaurant-reservations', []);
  const isApiConfigured = Boolean(import.meta.env.VITE_RESERVATION_API_URL);

  useEffect(() => {
    let mounted = true;
    if (!isApiConfigured) return;
    (async () => {
      try {
        const list = await reservationClient.listReservations();
        if (!mounted) return;
        const mapped = list.map((r: any) => ({
          id: r.id,
          date: r.date,
          time: r.time,
          guests: r.covers || (r.guests as number) || 2,
          name: r.name,
          email: r.email,
          phone: r.phone,
          notes: r.notes || '',
          status: r.status || 'pending',
          createdAt: r.createdAt || new Date().toISOString(),
        }));
        setReservations(mapped as any);
      } catch (err) {
        console.warn('Reservation API load failed, falling back to localStorage', err);
      }
    })();
    return () => { mounted = false; };
  }, []);
  
  // Form state
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // UI state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  // Mobile Calendar Component
  const MobileCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Add padding days to show complete weeks
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - monthStart.getDay());
    
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
    
    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    const isDateDisabled = (date: Date) => {
      return isBefore(date, startOfDay(new Date())) || 
             isAfter(date, addDays(new Date(), ADVANCE_BOOKING_DAYS));
    };

    const isDateSelected = (date: Date) => {
      return selectedDate && isSameDay(date, selectedDate);
    };

    const handleDateSelect = (date: Date) => {
      if (!isDateDisabled(date)) {
        setSelectedDate(date);
        setIsCalendarOpen(false);
      }
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
      const newMonth = new Date(currentMonth);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      setCurrentMonth(newMonth);
    };

    return (
      <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('prev')}
            className="h-8 w-8 hover:bg-primary/10"
          >
            <CaretLeft size={16} />
          </Button>
          <h3 className="font-heading text-lg font-semibold text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('next')}
            className="h-8 w-8 hover:bg-primary/10"
          >
            <CaretRight size={16} />
          </Button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'].map((day) => (
            <div key={day} className="h-8 flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 calendar-mobile-grid">
          {allDays.map((day) => {
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isDisabled = isDateDisabled(day);
            const isSelected = isDateSelected(day);
            const isToday = isSameDay(day, new Date());

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDateSelect(day)}
                disabled={isDisabled || !isCurrentMonth}
                className={`
                  h-10 w-10 flex items-center justify-center text-sm font-medium rounded-lg
                  transition-all duration-200 hover:scale-105 mobile-calendar-day mobile-touch-target
                  ${!isCurrentMonth ? 'text-muted-foreground/30' : ''}
                  ${isDisabled ? 'text-muted-foreground/50 cursor-not-allowed' : 'hover:bg-primary/10'}
                  ${isSelected ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md' : ''}
                  ${isToday && !isSelected ? 'bg-primary/20 text-primary font-bold' : ''}
                `}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Generate unique reservation ID
  const generateReservationId = (): string => {
    return `RES-${Date.now()}-${Math.random().toString(36).substring(2)}`;
  };

  // Check if a time slot is available for the selected date
  const isTimeSlotAvailable = (timeSlot: string): boolean => {
    if (!selectedDate) return false;
    
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const existingReservations = reservations.filter(
      res => res.date === dateStr && res.time === timeSlot && res.status !== 'cancelled'
    );
    
    // Calculate current occupied tables for this time slot
    const occupiedTables = existingReservations.reduce((total, res) => {
      return total + Math.ceil(res.guests / 4); // Assume 4 people per table
    }, 0);
    
    // Check if adding current guests would exceed capacity
    const tablesNeeded = Math.ceil(guests / 4);
    return (occupiedTables + tablesNeeded) <= MAX_TABLES;
  };

  // Update available slots when date or guests change
  useEffect(() => {
    if (selectedDate) {
      const available = TIME_SLOTS.filter(slot => isTimeSlotAvailable(slot));
      setAvailableSlots(available);
      
      // Reset selected time if it's no longer available
      if (selectedTime && !available.includes(selectedTime)) {
        setSelectedTime('');
      }
    }
  }, [selectedDate, guests, reservations]);

  // Validate form data
  const validateForm = (): boolean => {
    if (!selectedDate) {
      toast.error(t('selectDate'));
      return false;
    }
    if (!selectedTime) {
      toast.error(t('selectTime'));
      return false;
    }
    if (guests < 1 || guests > MAX_TABLE_SIZE) {
      toast.error(t('invalidGuestCount'));
      return false;
    }
    if (!customerName.trim()) {
      toast.error(t('nameRequired'));
      return false;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      toast.error(t('validEmailRequired'));
      return false;
    }
    if (!customerPhone.trim()) {
      toast.error(t('phoneRequired'));
      return false;
    }
    
    return true;
  };

  // Submit reservation
  const submitReservation = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Double-check availability
      if (!isTimeSlotAvailable(selectedTime)) {
        toast.error(t('slotNoLongerAvailable'));
        setIsSubmitting(false);
        return;
      }
      
      // Generate confirmation token and expiration
      const generateConfirmationToken = (): string => {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
      };

      const confirmationToken = generateConfirmationToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours from now
      
      const newReservation: Reservation = {
        id: generateReservationId(),
        date: format(selectedDate!, 'yyyy-MM-dd'),
        time: selectedTime,
        guests,
        name: customerName.trim(),
        email: customerEmail.trim(),
        phone: customerPhone.trim(),
        notes: notes.trim(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        confirmationToken,
        expiresAt
      };
      
      // Add to reservations (remote when configured)
      if (isApiConfigured) {
        try {
          const created = await reservationClient.createReservation({
            name: newReservation.name,
            email: newReservation.email,
            phone: newReservation.phone,
            date: newReservation.date,
            time: newReservation.time,
            covers: newReservation.guests,
            notes: newReservation.notes
          });
          setReservations(current => [...current, {
            ...newReservation,
            id: created.id,
            status: created.status || newReservation.status,
            createdAt: created.createdAt || newReservation.createdAt
          }]);
        } catch (err) {
          console.error('Failed to create reservation on API, falling back to local:', err);
          setReservations(current => [...current, newReservation]);
        }
      } else {
        setReservations(current => [...current, newReservation]);
      }
      
  // Trigger confirmation flow: when API is configured the API should send real emails.
  // Client no longer attempts to send provider emails directly.
  await sendConfirmationEmail(newReservation);
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setGuests(2);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setNotes('');
      setIsDialogOpen(false);
      
      toast.success(t('reservationConfirmed'));
      
    } catch (error) {
      toast.error(t('reservationError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Send confirmation email (functional implementation)
  const sendConfirmationEmail = async (reservation: Reservation): Promise<void> => {
    // If remote API available, call confirmation endpoint (this is a simple hook —
    // real email sending should be done server-side by the API or a separate mailer)
    try {
      if (isApiConfigured) {
        await fetch(`${import.meta.env.VITE_RESERVATION_API_URL.replace(/\/$/, '')}/reservations/confirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: reservation.confirmationToken || reservation.id })
        });
      } else {
        // no-op for now, keep UX consistent
        console.log('Reservation (local) created:', reservation.id);
      }
    } catch (err) {
      console.warn('Failed to trigger confirmation email/endpoint', err);
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-yellow-600';
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

  return (
    <div className="space-y-6">
      {/* Reservation Form */}
      <Card className="card-modern">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CalendarIcon size={20} className="text-primary" />
            </div>
            {t('bookTable')}
          </CardTitle>
          <CardDescription className="text-base">
            {t('reservationFormDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Selection - Mobile First */}
          <div className="space-y-3">
            <Label className="text-base font-medium">{t('selectDate')}</Label>
            
            {isMobile ? (
              <Sheet open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal h-12 text-base"
                  >
                    <CalendarIcon className="mr-3 h-5 w-5" />
                    {selectedDate ? (
                      format(selectedDate, 'EEEE, d MMMM yyyy')
                    ) : (
                      <span className="text-muted-foreground">{t('pickDate')}</span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader className="pb-6">
                    <SheetTitle className="text-center">{t('selectDate')}</SheetTitle>
                    <SheetDescription className="text-center">
                      {t('pickDate')}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex justify-center">
                    <MobileCalendar />
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal h-12 text-base"
                  >
                    <CalendarIcon className="mr-3 h-5 w-5" />
                    {selectedDate ? (
                      format(selectedDate, 'EEEE, d MMMM yyyy')
                    ) : (
                      <span className="text-muted-foreground">{t('pickDate')}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => 
                      isBefore(date, startOfDay(new Date())) || 
                      isAfter(date, addDays(new Date(), ADVANCE_BOOKING_DAYS))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Guests Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">{t('numberOfGuests')}</Label>
            <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder={t('selectGuests')} />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: MAX_TABLE_SIZE }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    <div className="flex items-center gap-2">
                      <Users size={18} />
                      <span className="text-base">
                        {num} {num === 1 ? t('person') : t('people')}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="space-y-3">
              <Label className="text-base font-medium">{t('selectTime')}</Label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {TIME_SLOTS.map((slot) => {
                  const isAvailable = availableSlots.includes(slot);
                  return (
                    <Button
                      key={slot}
                      variant={selectedTime === slot ? "default" : "outline"}
                      size="lg"
                      className={`
                        h-12 text-base font-medium
                        ${selectedTime === slot ? 'bg-gradient-to-r from-primary to-accent text-white' : ''}
                        ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover-lift'}
                      `}
                      disabled={!isAvailable}
                      onClick={() => setSelectedTime(slot)}
                    >
                      <Clock size={16} className="mr-2" />
                      {slot}
                    </Button>
                  );
                })}
              </div>
              {availableSlots.length === 0 && (
                <div className="text-center py-6">
                  <WarningCircle size={24} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-base text-muted-foreground">
                    {t('noAvailableSlots')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Continue Button */}
          {selectedTime && (
            <div className="pt-4">
              {isMobile ? (
                <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DrawerTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 btn-modern mobile-btn-primary mobile-touch-target"
                      size="lg"
                    >
                      <ChefHat size={20} className="mr-3" />
                      {t('continueBooking')}
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="max-h-[90vh]">
                    <DrawerHeader className="text-center pb-6">
                      <DrawerTitle className="text-xl">{t('customerInfo')}</DrawerTitle>
                      <DrawerDescription className="text-base">
                        {t('customerInfoDescription')}
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-6 space-y-6 overflow-y-auto mobile-scroll">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base font-medium">{t('fullName')} *</Label>
                        <Input
                          id="name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder={t('enterName')}
                          className="h-12 text-base mobile-form-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-medium">{t('emailAddress')} *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder={t('enterEmail')}
                          className="h-12 text-base mobile-form-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base font-medium">{t('phoneNumber')} *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder={t('enterPhone')}
                          className="h-12 text-base mobile-form-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-base font-medium">{t('specialRequests')}</Label>
                        <Textarea
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder={t('enterNotes')}
                          rows={4}
                          className="text-base mobile-form-input"
                        />
                      </div>
                      <Button
                        onClick={submitReservation}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 btn-modern mobile-btn-primary"
                        size="lg"
                      >
                        {isSubmitting ? t('submitting') : t('confirmReservation')}
                      </Button>
                    </div>
                  </DrawerContent>
                </Drawer>
              ) : (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 btn-modern h-12 text-base"
                      size="lg"
                    >
                      <ChefHat size={18} className="mr-2" />
                      {t('continueBooking')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                      <DialogTitle className="text-xl">{t('customerInfo')}</DialogTitle>
                      <DialogDescription className="text-base">
                        {t('customerInfoDescription')}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base font-medium">{t('fullName')} *</Label>
                        <Input
                          id="name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder={t('enterName')}
                          className="h-12 text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-medium">{t('emailAddress')} *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder={t('enterEmail')}
                          className="h-12 text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base font-medium">{t('phoneNumber')} *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder={t('enterPhone')}
                          className="h-12 text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-base font-medium">{t('specialRequests')}</Label>
                        <Textarea
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder={t('enterNotes')}
                          rows={3}
                          className="text-base"
                        />
                      </div>
                      <Button
                        onClick={submitReservation}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 btn-modern h-12 text-base"
                        size="lg"
                      >
                        {isSubmitting ? t('submitting') : t('confirmReservation')}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Reservation Summary - Mobile Optimized */}
      {selectedDate && selectedTime && (
        <Card className="card-modern bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle size={20} className="text-primary" />
              {t('reservationSummary')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CalendarIcon size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-base">{format(selectedDate, 'EEEE, d MMMM yyyy')}</div>
                  <div className="text-sm text-muted-foreground">{t('date')}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Clock size={16} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold">{selectedTime}</div>
                    <div className="text-xs text-muted-foreground">{t('time')}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{guests} {guests === 1 ? t('person') : t('people')}</div>
                    <div className="text-xs text-muted-foreground">{t('guests')}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReservationSystem;