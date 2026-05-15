const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
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

// ── BOX SALES ──────────────────────────────────────────────────
app.get('/api/boxsales', (req, res) => {
  res.json(db.get('boxSales').value());
});

app.post('/api/boxsales', (req, res) => {
  const { boxId, qty, price, notes } = req.body;
  if (!boxId || !qty || !price) return res.status(400).json({ error: 'boxId, qty and price required' });
  const id = db.get('nextBoxSaleId').value();
  const sale = { id, boxId: parseInt(boxId), qty: parseInt(qty), price: parseFloat(price), notes: notes||null, soldAt: new Date().toISOString() };
  db.get('boxSales').push(sale).write();
  db.set('nextBoxSaleId', id + 1).write();
  res.json(sale);
});

app.put('/api/boxsales/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { boxId, qty, price, notes } = req.body;
  db.get('boxSales').find({ id }).assign({ boxId: parseInt(boxId), qty: parseInt(qty), price: parseFloat(price), notes: notes||null }).write();
  res.json(db.get('boxSales').find({ id }).value());
});

app.delete('/api/boxsales/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('boxSales').remove({ id }).write();
  res.json({ success: true });
});

// ── BREAKS ──────────────────────────────────────────────────────
app.get('/api/breaks', (req, res) => {
  res.json(db.get('breaks').value().reverse());
});

app.post('/api/breaks', (req, res) => {
  const { name, date, sales, commission, expenses, promo, productCost, notes, boxesUsed } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const id = db.get('nextBreakId').value();
  const brk = { id, name, date: date||null, sales: sales||0, commission: commission||0, expenses: expenses||0, promo: promo||0, productCost: productCost||0, notes: notes||null, boxesUsed: boxesUsed||[], added_at: new Date().toISOString() };
  db.get('breaks').push(brk).write();
  db.set('nextBreakId', id + 1).write();
  res.json(brk);
});

app.put('/api/breaks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, date, sales, commission, expenses, promo, productCost, notes, boxesUsed } = req.body;
  db.get('breaks').find({ id }).assign({ name, date, sales, commission, expenses, promo, productCost, notes, boxesUsed }).write();
  res.json(db.get('breaks').find({ id }).value());
});

app.delete('/api/breaks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('breaks').remove({ id }).write();
  res.json({ success: true });
});

// ── HWY 15 CARDS ───────────────────────────────────────────────
app.get('/api/hwy15', (req, res) => {
  res.json(db.get('hwy15Cards').value().reverse());
});

app.post('/api/hwy15', (req, res) => {
  const { name, set_name, year, type, condition, cost, ask, status, sale, notes } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const id = db.get('nextHwy15Id').value();
  const card = { id, name, set_name: set_name||null, year: year||null, type: type||'Sports', condition: condition||'Raw - NM', cost: cost||null, ask: ask||null, status: status||'available', sale: sale||null, notes: notes||null, added_at: new Date().toISOString() };
  db.get('hwy15Cards').push(card).write();
  db.set('nextHwy15Id', id + 1).write();
  res.json(card);
});

app.put('/api/hwy15/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, set_name, year, type, condition, cost, ask, status, sale, notes } = req.body;
  db.get('hwy15Cards').find({ id }).assign({ name, set_name, year, type, condition, cost, ask, status, sale, notes }).write();
  res.json(db.get('hwy15Cards').find({ id }).value());
});

app.delete('/api/hwy15/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('hwy15Cards').remove({ id }).write();
  res.json({ success: true });
});

app.post('/api/hwy15/:id/sell', (req, res) => {
  const id = parseInt(req.params.id);
  const { sale_price } = req.body;
  db.get('hwy15Cards').find({ id }).assign({ status: 'sold', sale: sale_price }).write();
  res.json(db.get('hwy15Cards').find({ id }).value());
});

// ── LOW END BOXES ──────────────────────────────────────────────
app.get('/api/lowend', (req, res) => {
  res.json(db.get('lowEndBoxes').value().reverse());
});

app.post('/api/lowend', (req, res) => {
  const { name, card_count, invested, notes } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const id = db.get('nextLowEndId').value();
  const box = { id, name, card_count: parseInt(card_count)||0, original_count: parseInt(card_count)||0, invested: parseFloat(invested)||0, total_pulled: 0, notes: notes||null, sales: [], added_at: new Date().toISOString() };
  db.get('lowEndBoxes').push(box).write();
  db.set('nextLowEndId', id + 1).write();
  res.json(box);
});

app.put('/api/lowend/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, card_count, invested, notes } = req.body;
  db.get('lowEndBoxes').find({ id }).assign({ name, card_count: parseInt(card_count)||0, invested: parseFloat(invested)||0, notes }).write();
  res.json(db.get('lowEndBoxes').find({ id }).value());
});

app.delete('/api/lowend/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.get('lowEndBoxes').remove({ id }).write();
  res.json({ success: true });
});

app.post('/api/lowend/:id/sale', (req, res) => {
  const id = parseInt(req.params.id);
  const { cards_sold, amount, notes } = req.body;
  if (!cards_sold || !amount) return res.status(400).json({ error: 'cards_sold and amount required' });
  const box = db.get('lowEndBoxes').find({ id }).value();
  if (!box) return res.status(404).json({ error: 'Box not found' });
  const sale = { id: Date.now(), cards_sold: parseInt(cards_sold), amount: parseFloat(amount), notes: notes||null, sold_at: new Date().toISOString() };
  const newCount = Math.max(0, (box.card_count||0) - parseInt(cards_sold));
  const newPulled = (box.total_pulled||0) + parseFloat(amount);
  db.get('lowEndBoxes').find({ id }).assign({ card_count: newCount, total_pulled: newPulled, sales: [...(box.sales||[]), sale] }).write();
  res.json(db.get('lowEndBoxes').find({ id }).value());
});

app.delete('/api/lowend/:id/sale/:saleId', (req, res) => {
  const id = parseInt(req.params.id);
  const saleId = parseInt(req.params.saleId);
  const box = db.get('lowEndBoxes').find({ id }).value();
  if (!box) return res.status(404).json({ error: 'Box not found' });
  const sale = (box.sales||[]).find(s => s.id === saleId);
  if (!sale) return res.status(404).json({ error: 'Sale not found' });
  db.get('lowEndBoxes').find({ id }).assign({
    card_count: (box.card_count||0) + sale.cards_sold,
    total_pulled: Math.max(0, (box.total_pulled||0) - sale.amount),
    sales: (box.sales||[]).filter(s => s.id !== saleId)
  }).write();
  res.json(db.get('lowEndBoxes').find({ id }).value());
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
