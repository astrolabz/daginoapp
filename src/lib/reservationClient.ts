import type { Reservation } from '@/components/ReservationSystem';

const API_URL = import.meta.env.VITE_RESERVATION_API_URL || '';

async function request(path: string, opts: RequestInit = {}) {
  if (!API_URL) throw new Error('Reservation API not configured');
  const url = `${API_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`;
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opts });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Reservation API error: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getAvailability(date: string) {
  return request(`/availability?date=${encodeURIComponent(date)}`);
}

export async function createReservation(payload: { name: string; email: string; phone: string; date: string; time: string; covers: number; notes?: string }) {
  return request('/reservations', { method: 'POST', body: JSON.stringify(payload) });
}

export async function listReservations() {
  return request('/reservations');
}

export async function updateReservation(id: string, patch: any) {
  return request(`/reservations/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(patch) });
}

export async function deleteReservation(id: string) {
  return request(`/reservations/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

export default { getAvailability, createReservation, listReservations, updateReservation, deleteReservation };
