/**
 * Apply database migrations.
 * Usage: node scripts/migrate.js
 */
require('dotenv').config();

const fs   = require('fs');
const path = require('path');
const db   = require('../src/config/database');

async function migrate() {
  const sqlPath = path.join(__dirname, '../migrations/001_initial_schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('Running migration: 001_initial_schema.sql');
  await db.query(sql);
  console.log('Migration complete.');
  await db.end();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
