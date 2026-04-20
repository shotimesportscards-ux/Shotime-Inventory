# 🃏 Shotime Sports Cards — Inventory Manager

A full-stack Node.js inventory management app for Shotime Sports Cards.
Built to replace the single-file HTML tracker with a proper backend, SQLite database, and REST API.

---

## Features

- ✅ Full CRUD for singles inventory (cards)
- ✅ Sealed box inventory with quantity + margin tracking
- ✅ Grand total invested across cards + boxes
- ✅ One-click eBay completed sales search per card
- ✅ One-click Card Ladder search per card
- ✅ CSV export of full inventory
- ✅ Search, filter by type/status, sortable columns
- ✅ Mark cards as sold with sale price
- ✅ SQLite database (persists across restarts)
- ✅ Pre-loaded with your existing 78-card inventory + 7 box entries

---

## Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Install & Run

```bash
# 1. Navigate to the project folder
cd shotime-inventory

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# 4. Open your browser to:
http://localhost:3000
```

For auto-restart during development:
```bash
npm run dev
```

---

## Using with Claude Code

Claude Code can help you extend this app. Install it with:

```bash
npm install -g @anthropic-ai/claude-code
```

Then from the project directory:
```bash
claude
```

### Things Claude Code can help you build:
- **eBay API integration** — Pull actual sold prices automatically into each card's comp field
- **Card Ladder API** — When/if they release a public API, auto-fetch market values
- **Image upload** — Attach photos to each card entry
- **Multi-device sync** — Move from SQLite to PostgreSQL/MySQL for cloud hosting
- **Price alerts** — Get notified when a card in your inventory hits a target price
- **Show mode** — A simplified mobile view optimized for browsing at a card show
- **Profit/loss reports** — Monthly and per-show P&L breakdowns
- **Bulk import** — Import cards from a CSV file
- **Authentication** — Add login so only you can edit the inventory

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cards` | Get all cards (supports ?search=, ?type=, ?status=) |
| POST | `/api/cards` | Add a new card |
| PUT | `/api/cards/:id` | Update a card |
| DELETE | `/api/cards/:id` | Delete a card |
| POST | `/api/cards/:id/sell` | Mark card as sold |
| GET | `/api/boxes` | Get all sealed boxes |
| POST | `/api/boxes` | Add a box entry |
| PUT | `/api/boxes/:id` | Update a box entry |
| DELETE | `/api/boxes/:id` | Delete a box entry |
| GET | `/api/stats` | Get portfolio stats + grand totals |
| GET | `/api/comp/ebay/:id` | Get eBay comp search URL for a card |
| GET | `/api/comp/cardladder/:id` | Get Card Ladder search URL for a card |
| GET | `/api/export/csv` | Download full inventory as CSV |

---

## Data

Your database lives at `data/inventory.db` — this is a SQLite file.
Back it up regularly by copying that file. It contains all your cards and boxes.

---

## Tech Stack

- **Backend:** Node.js + Express
- **Database:** SQLite via better-sqlite3
- **Frontend:** Vanilla HTML/CSS/JS (no framework needed)
