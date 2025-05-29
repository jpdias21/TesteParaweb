const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'db.xradffjfmtjwlmgwvkjm.supabase.co',
    database: 'postgres',
    password: '052002Joao@',
    port: 5432,
    ssl: { rejectUnauthorized: false }
  });
  

module.exports = pool