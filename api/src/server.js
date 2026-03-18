const app = require('./app');
const db  = require('./config/database');

const PORT = parseInt(process.env.PORT || '3000', 10);

async function start() {
  // Verify DB connectivity before accepting traffic
  try {
    await db.query('SELECT 1');
    console.log('Database connection established');
  } catch (err) {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Bible API running on port ${PORT}`);
  });
}

start();
