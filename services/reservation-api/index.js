const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const DB_FILE = path.join(__dirname, 'reservations.db');

async function start() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const db = await open({ filename: DB_FILE, driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tables (
      id TEXT PRIMARY KEY,
      name TEXT,
      capacity INTEGER
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS reservations (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      phone TEXT,
      date TEXT,
      time TEXT,
      covers INTEGER,
      notes TEXT,
      status TEXT,
      token TEXT,
      createdAt TEXT
    );
  `);

  app.get('/seed-tables', async (req, res) => {
    const row = await db.get('SELECT COUNT(*) as c FROM tables');
    if (row && row.c > 0) return res.json({ seeded: false });
    const stmt = await db.prepare('INSERT INTO tables(id,name,capacity) VALUES (?,?,?)');
    for (let i = 1; i <= 12; i++) {
      await stmt.run(uuidv4(), `Tavolo ${i}`, 4);
    }
    await stmt.finalize();
    res.json({ seeded: true });
  });

  app.get('/availability', async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date required' });
    const tables = await db.all('SELECT * FROM tables');
    const totalSeats = tables.reduce((s, t) => s + t.capacity, 0);
    const rows = await db.all('SELECT time, SUM(covers) as covers FROM reservations WHERE date = ? AND status != "cancelled" GROUP BY time', date);
    const byTime = {};
    rows.forEach(r => byTime[r.time] = r.covers);
    res.json({ date, totalSeats, byTime });
  });

  app.post('/reservations', async (req, res) => {
    const { name, email, phone, date, time, covers, notes } = req.body;
    if (!name || !email || !phone || !date || !time || !covers) return res.status(400).json({ error: 'missing fields' });
    const tables = await db.all('SELECT * FROM tables');
    const totalSeats = tables.reduce((s, t) => s + t.capacity, 0);
    const row = await db.get('SELECT SUM(covers) as covers FROM reservations WHERE date = ? AND time = ? AND status != "cancelled"', [date, time]);
    const occupied = row && row.covers ? row.covers : 0;
    if (occupied + covers > totalSeats) return res.status(409).json({ error: 'no_capacity' });
    const id = uuidv4();
    const token = uuidv4();
    const createdAt = new Date().toISOString();
    await db.run('INSERT INTO reservations(id,name,email,phone,date,time,covers,notes,status,token,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [id, name, email, phone, date, time, covers, notes || '', 'pending', token, createdAt]);
    res.json({ id, name, email, phone, date, time, covers, notes, status: 'pending', token, createdAt });
  });

  app.post('/reservations/confirm', async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'token required' });
    const r = await db.get('SELECT * FROM reservations WHERE token = ?', token);
    if (!r) return res.status(404).json({ error: 'not_found' });
    await db.run('UPDATE reservations SET status = ? WHERE id = ?', ['confirmed', r.id]);
    res.json({ ok: true, id: r.id });
  });

  app.get('/reservations', async (req, res) => {
    const rows = await db.all('SELECT * FROM reservations ORDER BY date, time');
    res.json(rows);
  });

  app.patch('/reservations/:id', async (req, res) => {
    const { id } = req.params;
    const allowed = ['status', 'name', 'phone', 'email', 'notes', 'date', 'time', 'covers'];
    const fields = Object.keys(req.body).filter(k => allowed.includes(k));
    if (fields.length === 0) return res.status(400).json({ error: 'nothing to update' });
    const sets = fields.map(f => `${f} = ?`).join(', ');
    const values = fields.map(f => req.body[f]);
    values.push(id);
    await db.run(`UPDATE reservations SET ${sets} WHERE id = ?`, values);
    const updated = await db.get('SELECT * FROM reservations WHERE id = ?', id);
    res.json(updated);
  });

  app.delete('/reservations/:id', async (req, res) => {
    const { id } = req.params;
    await db.run('DELETE FROM reservations WHERE id = ?', id);
    res.json({ ok: true });
  });

  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Reservation API listening on ${port}`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
