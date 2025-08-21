// Lightweight Supabase REST API helper (no external dependencies)
// Usage: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY at build time.
// NOTE: anon key is public but can be restricted with Row Level Security (RLS) policies.
// For sensitive operations (admin-only), use Edge Functions or server-side wrappers with service_role key.

// Lightweight Supabase REST API helper (no external dependencies)
// Usage: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY at build time.
// NOTE: anon key is public but can be restricted with Row Level Security (RLS) policies.
// For sensitive operations (admin-only), use Edge Functions or server-side wrappers with service_role key.

import reservationClient from './reservationClient';

export interface ReservationPayload {
  id?: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
  confirmationToken?: string;
  expiresAt?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const RESERVATION_API_URL = import.meta.env.VITE_RESERVATION_API_URL as string | undefined;

function configured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function reservationApiConfigured(): boolean {
  return Boolean(RESERVATION_API_URL);
}

async function request(path: string, opts: RequestInit = {}) {
  if (!configured()) throw new Error('Supabase not configured');
  const url = `${SUPABASE_URL!.replace(/\/$/, '')}/rest/v1/${path}`;
  const headers: Record<string,string> = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY!,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY!}`,
    // Prefer returning full rows
    'Prefer': 'return=representation'
  };
  const res = await fetch(url, { headers: {...headers, ...(opts.headers || {})}, ...opts });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase request failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function listReservations(): Promise<any[]> {
  if (reservationApiConfigured()) {
    // Delegate to new reservation API
    return reservationClient.listReservations();
  }
  return request('reservations?select=*');
}

export async function createReservation(payload: ReservationPayload): Promise<any> {
  if (reservationApiConfigured()) {
    // map guests -> covers for the reservation API
    const apiPayload: any = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      date: payload.date,
      time: payload.time,
      covers: (payload as any).guests ?? (payload as any).covers ?? 2,
      notes: payload.notes
    };
    return reservationClient.createReservation(apiPayload);
  }
  // Supabase REST expects an array body for insert
  const rows = await request('reservations', {
    method: 'POST',
    body: JSON.stringify([payload])
  });
  return rows[0];
}

export async function updateReservation(id: string, patch: Partial<ReservationPayload>): Promise<any> {
  if (reservationApiConfigured()) {
    const apiPatch: any = { ...patch };
    if ((apiPatch as any).guests !== undefined) {
      apiPatch.covers = (apiPatch as any).guests;
      delete (apiPatch as any).guests;
    }
    return reservationClient.updateReservation(id, apiPatch);
  }
  // using eq=id
  const rows = await request(`reservations?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(patch)
  });
  return rows[0];
}

export async function deleteReservation(id: string): Promise<void> {
  if (reservationApiConfigured()) {
    return reservationClient.deleteReservation(id);
  }
  await request(`reservations?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' });
}

export function isSupabaseConfigured(): boolean {
  return configured();
}

export default { listReservations, createReservation, updateReservation, deleteReservation, isSupabaseConfigured };
