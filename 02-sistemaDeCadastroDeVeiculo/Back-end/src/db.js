const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:052002Joao@@db.xradffjfmtjwlmgwvkjm.supabase.co:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch(err => console.error('Erro de conexão com o banco de dados:', err));

module.exports = pool;
