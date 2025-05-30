const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres.xradffjfmtjwlmgwvkjm:052002Joao@@aws-0-sa-east-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
