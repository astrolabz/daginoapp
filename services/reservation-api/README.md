Reservation API (PoC)

This is a minimal Express + SQLite proof-of-concept for the restaurant reservation backend.

Quick start (requires Node 18+):

# from this folder
npm install
npm run dev

By default the API listens on port 3001.

Seed tables (first run):
GET http://localhost:3001/seed-tables

Endpoints:
- GET /availability?date=YYYY-MM-DD
- POST /reservations { name,email,phone,date,time,covers,notes }
- POST /reservations/confirm { token }
- GET /reservations
- PATCH /reservations/:id
- DELETE /reservations/:id

Notes:
- This PoC is intentionally minimal and not production hardened. Use it for local testing and PoC integration only.
- For production, migrate to a managed DB and add authentication, rate-limiting, input validation, and email delivery via a server-side provider (SendGrid/SES).
