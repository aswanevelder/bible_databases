const { Pool } = require('pg');

/**
 * Parse an ADO.NET-style connection string into a pg config object.
 * e.g. "Server=localhost;Database=bible_api;Port=5432;User Id=anton;Password=secret;SSL Mode=require;"
 */
function parseConnStr(str) {
  const config = {};
  for (const part of str.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim().toLowerCase();
    const val = part.slice(eq + 1).trim();
    if (!val) continue;
    switch (key) {
      case 'server':   config.host     = val; break;
      case 'port':     config.port     = parseInt(val, 10); break;
      case 'database': config.database = val; break;
      case 'user id':
      case 'user':     config.user     = val; break;
      case 'password': config.password = val; break;
      case 'ssl mode':
        config.ssl = val.toLowerCase() === 'disable'
          ? false
          : { rejectUnauthorized: val.toLowerCase() === 'verify-full' };
        break;
    }
  }
  return config;
}

const connStr = process.env.BIBLE_API_CONNSTR;
if (!connStr) {
  throw new Error('BIBLE_API_CONNSTR environment variable is not set.\n' +
    'Example: BIBLE_API_CONNSTR="Server=localhost;Database=bible_api;Port=5432;"');
}

const pool = new Pool({
  ...parseConnStr(connStr),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL client error', err);
});

module.exports = pool;
