const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const adapter = new FileSync(path.join(dataDir, 'inventory.json'));
const db = low(adapter);

db.defaults({ cards: [], boxes: [], nextCardId: 1, nextBoxId: 1 }).write();

if (db.get('cards').value().length === 0) {
  console.log('Seeding database...');
  const seedCards = [
    { name: 'Khalil Shakir', set_name: '2022 Panini Impeccable', year: '2022', type: 'Sports', condition: 'Raw - NM', cost: 30.0, ask: null, status: 'available', sale: null, notes: 'Auto /99' },
    { name: 'CJ Stroud', set_name: '2023 Optic Blue Stars Holo', year: '2023', type: 'Sports', condition: 'Raw - NM', cost: 15.0, ask: null, status: 'available', sale: null, notes: 'RC' },
    { name: 'Jahmyr Gibbs', set_name: '2023 Panini Optic', year: '2023', type: 'Sports', condition: 'Raw - NM', cost: 55.0, ask: null, status: 'available', sale: null, notes: 'Blue Prizm' },
    { name: 'Tom Brady', set_name: '2007 Topps Finest', year: '2007', type: 'Sports', condition: 'Raw - NM', cost: 45.0, ask: null, status: 'available', sale: null, notes: 'Refractor' },
    { name: 'Tom Brady', set_name: '2017 Panini Prizm', year: '2017', type: 'Sports', condition: 'Raw - NM', cost: 40.0, ask: null, status: 'available', sale: null, notes: 'Disco Prizm' },
    { name: 'Tom Brady', set_name: '2016 Panini Prizm', year: '2016', type: 'Sports', condition: 'Raw - NM', cost: 20.0, ask: null, status: 'available', sale: null, notes: 'Green Prizm' },
    { name: 'Tom Brady', set_name: '2022 Panini Select', year: '2022', type: 'Sports', condition: 'Raw - NM', cost: 25.0, ask: null, status: 'available', sale: null, notes: 'Tri-Color /199' },
    { name: 'Patrick Mahomes', set_name: '2017 Panini Donruss', year: '2017', type: 'Sports', condition: 'Raw - NM', cost: 125.0, ask: null, status: 'available', sale: null, notes: 'RC' },
    { name: 'Shaun Alexander', set_name: '2005 Topps Chrome', year: '2005', type: 'Sports', condition: 'Raw - NM', cost: 75.0, ask: null, status: 'available', sale: null, notes: 'Red Refractor /25' },
    { name: 'Josh Allen', set_name: '2025 Panini Optic', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 40.0, ask: null, status: 'available', sale: null, notes: 'Passing Grade Black /149' },
    { name: 'Larry Bird', set_name: '2024-25 Topps NBA', year: '2024', type: 'Sports', condition: 'Raw - NM', cost: 15.0, ask: null, status: 'available', sale: null, notes: '/150' },
    { name: 'Jaxon Smith-Njigba', set_name: '2025 Panini Phoenix', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 90.0, ask: null, status: 'available', sale: null, notes: 'Gold Prizm /10' },
    { name: 'Shohei Ohtani', set_name: '2018 Topps Complete Set', year: '2018', type: 'Sports', condition: 'Raw - NM', cost: 80.0, ask: null, status: 'available', sale: null, notes: 'RC' },
    { name: 'Parker Washington', set_name: '2023 Panini Optic', year: '2023', type: 'Sports', condition: 'Raw - NM', cost: 25.0, ask: null, status: 'available', sale: null, notes: 'Auto /75' },
    { name: 'Shohei Ohtani', set_name: '2018 Panini Diamond Kings', year: '2018', type: 'Sports', condition: 'Raw - NM', cost: 40.0, ask: null, status: 'available', sale: null, notes: 'RC' },
    { name: 'JJ McCarthy', set_name: '2024 Panini Mosaic', year: '2024', type: 'Sports', condition: 'Raw - NM', cost: 40.0, ask: null, status: 'available', sale: null, notes: 'Blue Sparkle /96' },
    { name: 'Tom Brady', set_name: '2012 Panini Prime Signatures', year: '2012', type: 'Sports', condition: 'Raw - NM', cost: 140.0, ask: null, status: 'available', sale: null, notes: 'Canvas Auto /49' },
    { name: 'Mariano Rivera', set_name: 'Topps Turkey Red', year: null, type: 'Sports', condition: 'Raw - NM', cost: 28.0, ask: null, status: 'available', sale: null, notes: 'Game Worn Patch' },
    { name: 'Tom Brady', set_name: '2015 Topps', year: '2015', type: 'Sports', condition: 'Raw - NM', cost: 20.0, ask: null, status: 'available', sale: null, notes: 'Adrenaline Rush' },
    { name: 'Tom Brady', set_name: '2021 Panini Select', year: '2021', type: 'Sports', condition: 'Raw - NM', cost: 20.0, ask: null, status: 'available', sale: null, notes: 'Sensations' },
    { name: 'Jaxon Smith-Njigba', set_name: '2023 Panini Optic', year: '2023', type: 'Sports', condition: 'Raw - NM', cost: 38.0, ask: null, status: 'available', sale: null, notes: 'Orange /249' },
    { name: 'Justin Jefferson', set_name: '2025 Panini Prizm', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 30.0, ask: null, status: 'available', sale: null, notes: 'Blue Retail SSP' },
    { name: 'Bucky Irving', set_name: '2024 Topps Chrome', year: '2024', type: 'Sports', condition: 'Raw - NM', cost: 30.0, ask: null, status: 'available', sale: null, notes: 'Gold Auto' },
    { name: 'Rome Odunze', set_name: '2024 Panini Prizm', year: '2024', type: 'Sports', condition: 'Raw - NM', cost: 15.0, ask: null, status: 'available', sale: null, notes: 'Pandora /400' },
    { name: 'Jaxon Smith-Njigba', set_name: '2023 Panini Certified', year: '2023', type: 'Sports', condition: 'Raw - NM', cost: 120.0, ask: null, status: 'available', sale: null, notes: 'RPA /49' },
    { name: 'Kon Knueppel', set_name: '2025 Topps Chrome Silver Pack', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 40.0, ask: null, status: 'available', sale: null, notes: 'RC' },
    { name: 'Malik Willis', set_name: '2022 Panini Rookies & Stars Thrillers', year: '2022', type: 'Sports', condition: 'Raw - NM', cost: 15.0, ask: null, status: 'available', sale: null, notes: 'RC /50' },
    { name: 'Malik Willis', set_name: '2022 Panini Rookies & Stars Crusade', year: '2022', type: 'Sports', condition: 'Raw - NM', cost: null, ask: null, status: 'available', sale: null, notes: 'Purple /35 RC' },
    { name: 'Brian Cushing', set_name: '2014 Bowman Sterling', year: '2014', type: 'Sports', condition: 'Raw - NM', cost: 30.0, ask: null, status: 'available', sale: null, notes: 'RC Auto /75' },
    { name: 'Cam Ward', set_name: '2025 Panini Prizm', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 25.0, ask: null, status: 'available', sale: null, notes: 'Silver Variation' },
    { name: 'James Cook', set_name: '2025 Panini Mosaic', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 25.0, ask: null, status: 'available', sale: null, notes: 'Genesis SSP' },
    { name: 'Christian McCaffrey', set_name: '2024 Panini Optic', year: '2024', type: 'Sports', condition: 'Raw - NM', cost: 35.0, ask: null, status: 'available', sale: null, notes: 'Sunday Kings' },
    { name: 'Malik Nabers', set_name: '2024 Panini Optic', year: '2024', type: 'Sports', condition: 'Raw - NM', cost: 70.0, ask: null, status: 'available', sale: null, notes: 'Rookie Kings' },
    { name: 'Paige Bueckers', set_name: '2025 Panini Prizm WNBA', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 30.0, ask: null, status: 'available', sale: null, notes: 'Logo' },
    { name: 'Shohei Ohtani', set_name: '2024 Topps 50/50', year: '2024', type: 'Sports', condition: 'Raw - NM', cost: 180.0, ask: null, status: 'available', sale: null, notes: 'Gold Refractor HR #35 /50' },
    { name: 'John Elway', set_name: '2006 Topps Paradigm Signatures', year: '2006', type: 'Sports', condition: 'Raw - NM', cost: 105.0, ask: null, status: 'available', sale: null, notes: 'Patch Auto /99' },
    { name: 'Tom Brady', set_name: '2005 Donruss Leaf', year: '2005', type: 'Sports', condition: 'Raw - NM', cost: 100.0, ask: null, status: 'available', sale: null, notes: 'Game Worn Patch /75' },
    { name: 'Ja\'Marr Chase', set_name: '2021 Panini Prizm', year: '2021', type: 'Sports', condition: 'PSA 9', cost: 100.0, ask: null, status: 'available', sale: null, notes: 'Red Wave RC' },
    { name: 'Shohei Ohtani', set_name: '2019 Topps Chrome', year: '2019', type: 'Sports', condition: 'Raw - NM', cost: 35.0, ask: null, status: 'available', sale: null, notes: '1984 Topps Design Insert' },
    { name: 'Travis Hunter', set_name: '2025 Panini Mosaic', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 60.0, ask: null, status: 'available', sale: null, notes: 'Genesis RC' },
    { name: 'Sam Darnold', set_name: '2025 Panini Prizm', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 30.0, ask: 40.0, status: 'available', sale: null, notes: 'Green Scope /75' },
    { name: 'Roronoa Zoro', set_name: '2025 One Piece PRB02 EN', year: '2025', type: 'Other TCG', condition: 'PSA 9', cost: 25.0, ask: null, status: 'available', sale: null, notes: '#118' },
    { name: 'Shanks', set_name: '2025 One Piece OP13 EN', year: '2025', type: 'Other TCG', condition: 'PSA 10', cost: 25.0, ask: null, status: 'available', sale: null, notes: '#028' },
    { name: 'Trafalgar Law', set_name: '2026 One Piece Illustration Box Vol.6 EN', year: '2026', type: 'Other TCG', condition: 'PSA 10', cost: 25.0, ask: null, status: 'available', sale: null, notes: '#093' },
    { name: 'Drake Baldwin', set_name: '2025 Topps Cosmic Chrome', year: '2025', type: 'Sports', condition: 'PSA 10', cost: 25.0, ask: null, status: 'available', sale: null, notes: 'Stars in the Night #10' },
    { name: 'Trafalgar Law', set_name: '2026 One Piece Illustration Box Vol.6 EN', year: '2026', type: 'Other TCG', condition: 'PSA 9', cost: 25.0, ask: null, status: 'available', sale: null, notes: '#093' },
    { name: 'Ronny Simon', set_name: '2025 Topps Chrome Update', year: '2025', type: 'Sports', condition: 'PSA 9', cost: 25.0, ask: null, status: 'available', sale: null, notes: 'Gold Geometric /50 #35' },
    { name: 'Monkey D. Luffy', set_name: '2023 One Piece ST10 EN', year: '2023', type: 'Other TCG', condition: 'PSA 10', cost: 25.0, ask: null, status: 'available', sale: null, notes: '#006' },
    { name: 'Yamato', set_name: '2025 One Piece OP13 EN', year: '2025', type: 'Other TCG', condition: 'PSA 10', cost: 25.0, ask: null, status: 'available', sale: null, notes: '#054 Alternate Art' },
    { name: 'Will Warren', set_name: '2025 Topps Chrome Update', year: '2025', type: 'Sports', condition: 'PSA 9', cost: 25.0, ask: null, status: 'available', sale: null, notes: 'Rookie Auto Green Lava Lamp /175' },
    { name: 'Jacob Wilson', set_name: '2025 Topps Cosmic Chrome', year: '2025', type: 'Sports', condition: 'PSA 9', cost: 25.0, ask: null, status: 'available', sale: null, notes: 'Starfractor Orange Refractor /25 #68' },
    { name: 'Dracule Mihawk', set_name: '2026 One Piece OP14-EB04 EN', year: '2026', type: 'Other TCG', condition: 'PSA 10', cost: 25.0, ask: null, status: 'available', sale: null, notes: '#119' },
    { name: 'Jimmy Graham', set_name: 'Panini Black', year: null, type: 'Sports', condition: 'Raw - NM', cost: 20.0, ask: null, status: 'available', sale: null, notes: 'Auto /50 New Orleans Saints' },
    { name: 'Darrelle Revis', set_name: 'Panini National Treasures', year: null, type: 'Sports', condition: 'Raw - NM', cost: 45.0, ask: null, status: 'available', sale: null, notes: 'Notable Nicknames Auto #11/49' },
    { name: 'Ty Simpson', set_name: '2025 Onit Signature Series', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 0.0, ask: null, status: 'available', sale: null, notes: 'Auto #6/25 Alabama' },
    { name: 'Aidan West', set_name: 'Bowman Chrome', year: null, type: 'Sports', condition: 'Raw - NM', cost: 0.0, ask: null, status: 'available', sale: null, notes: 'Auto Prospect LA Dodgers' },
    { name: 'Lamar Jackson', set_name: 'Panini Stars & Stripes', year: null, type: 'Sports', condition: 'Raw - NM', cost: 75.0, ask: null, status: 'available', sale: null, notes: 'Holo Baltimore Ravens' },
    { name: 'Jaxson Dart', set_name: '2025 Donruss Optic', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 40.0, ask: null, status: 'available', sale: null, notes: 'Rated Rookie RC NY Giants' },
    { name: 'Shohei Ohtani', set_name: 'Topps Now', year: '2023', type: 'Sports', condition: 'Raw - NM', cost: 10.0, ask: null, status: 'available', sale: null, notes: 'Signed 10 Years LAD 12.9.23' },
    { name: 'Tarik Skubal', set_name: '2026 Topps 75 Years', year: '2026', type: 'Sports', condition: 'Raw - NM', cost: 10.0, ask: null, status: 'available', sale: null, notes: 'Game-Used Memorabilia Detroit Tigers' },
    { name: 'Jac Caglianone', set_name: 'Bowman Chrome', year: null, type: 'Sports', condition: 'Raw - NM', cost: 5.0, ask: null, status: 'available', sale: null, notes: 'Prospect #113/350 Kansas City Royals' },
    { name: 'Thomas Harrington', set_name: 'Topps Chrome', year: null, type: 'Sports', condition: 'Raw - NM', cost: 5.0, ask: null, status: 'available', sale: null, notes: 'RC Auto #097/199 Pittsburgh Pirates' },
    { name: 'Aaron Judge / Derek Jeter', set_name: 'Topps Chrome', year: null, type: 'Sports', condition: 'Raw - NM', cost: 5.0, ask: null, status: 'available', sale: null, notes: 'Star Clusters Dual Card' },
    { name: 'Hyun-Seok Jang', set_name: 'Bowman', year: null, type: 'Sports', condition: 'Raw - NM', cost: 5.0, ask: null, status: 'available', sale: null, notes: '1st Bowman Pink #044/175 LA Dodgers' },
    { name: 'Spencer Schwellenbach', set_name: 'Topps Chrome', year: null, type: 'Sports', condition: 'Raw - NM', cost: 5.0, ask: null, status: 'available', sale: null, notes: 'RC Auto #138/199 Atlanta Braves' },
    { name: 'Jordan Love', set_name: '2020 Panini Select', year: '2020', type: 'Sports', condition: 'Raw - NM', cost: 40.0, ask: null, status: 'available', sale: null, notes: 'Concourse Holo RC Packers' },
    { name: 'Joe Montana', set_name: '1981 Topps', year: '1981', type: 'Sports', condition: 'Raw - NM', cost: 80.0, ask: null, status: 'available', sale: null, notes: 'Rookie Card' },
    { name: 'Puka Nacua', set_name: '2023 Panini Prizm', year: '2023', type: 'Sports', condition: 'Raw - NM', cost: 20.0, ask: null, status: 'available', sale: null, notes: 'Silver RC' },
    { name: 'Puka Nacua', set_name: '2023 Panini Select', year: '2023', type: 'Sports', condition: 'Raw - NM', cost: 25.0, ask: null, status: 'available', sale: null, notes: 'Maroon /149 RC' },
    { name: 'Fernando Tatis Jr.', set_name: '2025 Topps Chrome', year: '2025', type: 'Sports', condition: 'Raw - NM', cost: 65.0, ask: null, status: 'available', sale: null, notes: 'Home Field Advantage' },
    { name: 'Manny Machado', set_name: '2013 Bowman Chrome', year: '2013', type: 'Sports', condition: 'Raw - NM', cost: 15.0, ask: null, status: 'available', sale: null, notes: 'Refractor' },
    { name: 'Austin Reaves', set_name: 'Panini Prizm', year: null, type: 'Sports', condition: 'Raw - NM', cost: 20.0, ask: null, status: 'available', sale: null, notes: 'Silver RC' },
    { name: 'Jeremiah Fears', set_name: 'Panini Prizm', year: null, type: 'Sports', condition: 'Raw - NM', cost: 30.0, ask: null, status: 'available', sale: null, notes: 'Generation Rising Gold /50' },
    { name: 'Jayden Daniels', set_name: '2024 Panini Select', year: '2024', type: 'Sports', condition: 'Raw - NM', cost: 60.0, ask: null, status: 'available', sale: null, notes: 'Field Level Silver RC' },
    { name: 'Bobby Witt Jr.', set_name: '2022 Topps Finest', year: '2022', type: 'Sports', condition: 'Raw - NM', cost: 18.0, ask: null, status: 'available', sale: null, notes: 'Refractor' },
    { name: 'Shohei Ohtani', set_name: '2018 Topps Chrome', year: '2018', type: 'Sports', condition: 'SGC 9.5', cost: 100.0, ask: 650.0, status: 'available', sale: null, notes: 'RC' },
    { name: 'Tom Brady', set_name: '2009 Bowman Chrome', year: '2009', type: 'Sports', condition: 'Raw - NM', cost: 60.0, ask: null, status: 'available', sale: null, notes: 'Refractor' },
  ];
  let id = 1;
  const cards = seedCards.map(c => ({ id: id++, ...c, added_at: new Date().toISOString() }));
  db.set('cards', cards).set('nextCardId', id).write();

  const seedBoxes = [
    { name: '2022 Panini Optic NFL', year: '2022', type: 'NFL Football', qty: 4, cost: 45, value: 70, notes: 'Blaster Box' },
    { name: '2021 Panini Optic NFL', year: '2021', type: 'NFL Football', qty: 6, cost: 35, value: 50, notes: 'Blaster Box' },
    { name: '2021 Panini Optic NFL', year: '2021', type: 'NFL Football', qty: 8, cost: 20, value: 30, notes: 'Hager Box' },
    { name: '2023 Panini Optic NFL', year: '2023', type: 'NFL Football', qty: 7, cost: 35, value: 50, notes: 'Blaster Box' },
    { name: '2025 Panini Optic NFL', year: '2025', type: 'NFL Football', qty: 2, cost: 50, value: 75, notes: 'Mega Box' },
    { name: '2025 Panini Optic NFL', year: '2025', type: 'NFL Football', qty: 7, cost: 40, value: 50, notes: 'Blaster Box' },
    { name: 'One Piece Illustration Box Vol.6', year: '2026', type: 'Other TCG', qty: 2, cost: 30, value: 75, notes: 'Sealed Box' },
  ];
  let bid = 1;
  const boxes = seedBoxes.map(b => ({ id: bid++, ...b, added_at: new Date().toISOString() }));
  db.set('boxes', boxes).set('nextBoxId', bid).write();
  console.log('Done seeding.');
}

module.exports = db;
