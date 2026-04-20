const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── CARDS ──────────────────────────────────────────────────────
app.get('/api/cards', (req, res) => {
  const { search, type, status } = req.query;
  let cards = db.get('cards').value();
  if (search) {
    const s = search.toLowerCase();
    cards = cards.filter(c =>
      [c.name, c.set_name, c.year, c.notes, c.type].some(v => v && v.toString().toLowerCase().includes(s))
    );
  }
  if (type) cards = cards.filter(c => c.type === type);
  if (status) cards = cards.filter(c => c.status === status);
  res.json(cards.reverse());
});

app.post('/api/cards', (req, res) => {
  const { name, set_name, year, type, condition, cost, ask, status, sale, notes } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const id = db.get('nextCardId').value();
  const card = { id, name, set_name: set_name||null, year: year||null, type: type||'Sports', condition: condition||'Raw - NM', cost: cost||null, ask: ask||null, status: status||'available', sale: sale||null, notes: notes||null, added_at: new Date().toISOString() };
  db.get('cards').push(card).write();
  db.set('nextCardId', id + 1).write();
  res.json(card);
});

app.put('/api/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, set_name, year, type, condition, cost, ask, status, sale, notes } = req.body;
  db.get('cards').find({ id }).assign({ name, set_name, year, type, condition, cost, ask, status, sale, notes }).write();
  res.json(db.get('cards').find({ id }).value());
});

app.delete('/api/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('cards').remove({ id }).write();
  res.json({ success: true });
});

app.post('/api/cards/:id/sell', (req, res) => {
  const id = parseInt(req.params.id);
  const { sale_price } = req.body;
  db.get('cards').find({ id }).assign({ status: 'sold', sale: sale_price }).write();
  res.json(db.get('cards').find({ id }).value());
});

// ── BOXES ──────────────────────────────────────────────────────
app.get('/api/boxes', (req, res) => {
  res.json(db.get('boxes').value().reverse());
});

app.post('/api/boxes', (req, res) => {
  const { name, year, type, qty, cost, value, notes } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const id = db.get('nextBoxId').value();
  const box = { id, name, year: year||null, type: type||'NFL Football', qty: qty||1, cost: cost||null, value: value||null, notes: notes||null, added_at: new Date().toISOString() };
  db.get('boxes').push(box).write();
  db.set('nextBoxId', id + 1).write();
  res.json(box);
});

app.put('/api/boxes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, year, type, qty, cost, value, notes } = req.body;
  db.get('boxes').find({ id }).assign({ name, year, type, qty, cost, value, notes }).write();
  res.json(db.get('boxes').find({ id }).value());
});

app.delete('/api/boxes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('boxes').remove({ id }).write();
  res.json({ success: true });
});

// ── STATS ──────────────────────────────────────────────────────
app.get('/api/stats', (req, res) => {
  const cards = db.get('cards').value();
  const boxes = db.get('boxes').value();
  const sold = cards.filter(c => c.status === 'sold');
  res.json({
    total_cards: cards.length,
    available_cards: cards.filter(c => c.status === 'available').length,
    sold_cards: sold.length,
    cards_invested: cards.reduce((s,c) => s+(c.cost||0), 0),
    boxes_invested: boxes.reduce((s,b) => s+(b.cost||0)*(b.qty||1), 0),
    grand_total_invested: cards.reduce((s,c) => s+(c.cost||0),0) + boxes.reduce((s,b) => s+(b.cost||0)*(b.qty||1),0),
    sold_profit: sold.reduce((s,c) => s+((c.sale||0)-(c.cost||0)), 0),
    ask_value: cards.filter(c=>c.status!=='sold').reduce((s,c)=>s+(c.ask||0),0),
    boxes_value: boxes.reduce((s,b)=>s+(b.value||0)*(b.qty||1),0),
    est_total_value: cards.filter(c=>c.status!=='sold').reduce((s,c)=>s+(c.ask||0),0) + boxes.reduce((s,b)=>s+(b.value||0)*(b.qty||1),0),
    total_boxes: boxes.reduce((s,b)=>s+(b.qty||1),0),
  });
});

// ── COMP LINKS ─────────────────────────────────────────────────
app.get('/api/comp/ebay/:id', (req, res) => {
  const card = db.get('cards').find({ id: parseInt(req.params.id) }).value();
  if (!card) return res.status(404).json({ error: 'Not found' });
  const q = [card.name, card.set_name, card.year, card.notes].filter(Boolean).join(' ');
  res.json({ url: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q)}&LH_Sold=1&LH_Complete=1` });
});

app.get('/api/comp/cardladder/:id', (req, res) => {
  const card = db.get('cards').find({ id: parseInt(req.params.id) }).value();
  if (!card) return res.status(404).json({ error: 'Not found' });
  const q = [card.name, card.set_name, card.year].filter(Boolean).join(' ');
  res.json({ url: `https://www.cardladder.com/search?q=${encodeURIComponent(q)}` });
});

// ── CSV EXPORT ─────────────────────────────────────────────────
app.get('/api/export/csv', (req, res) => {
  const cards = db.get('cards').value();
  const headers = ['ID','Name','Set','Year','Type','Condition','Cost','Ask','Status','Sale Price','Notes'];
  const rows = cards.map(c =>
    [c.id, c.name, c.set_name||'', c.year||'', c.type, c.condition, c.cost||'', c.ask||'', c.status, c.sale||'', c.notes||'']
    .map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')
  );
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="shotime-inventory.csv"');
  res.send([headers.join(','), ...rows].join('\n'));
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => {
  console.log(`\n🃏 Shotime Sports Cards Inventory`);
  console.log(`   Running at http://localhost:${PORT}\n`);
});
