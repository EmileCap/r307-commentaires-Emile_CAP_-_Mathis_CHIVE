// Reinitialise la table PostgreSQL commentaires avec les huit donnees initiales.
// La table des articles doit deja exister (db/ateliers.sql).
const fs = require('fs');
const path = require('path');
const pool = require('../db/pool');

async function reinitialiser() {
  const sql = fs.readFileSync(path.join(__dirname, '..', 'sql', 'commentaires.sql'), 'utf8');
  try {
    await pool.query(sql);
    console.log('Table commentaires reinitialisee avec les huit commentaires initiaux.');
  } finally {
    await pool.end();
  }
}

reinitialiser().catch((err) => {
  console.error('Impossible de reinitialiser les commentaires :', err.message);
  process.exitCode = 1;
});
