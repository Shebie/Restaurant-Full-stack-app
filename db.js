import pkg  from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'restaurant',
  password: 'Samsul123',
  port: 5432,
});

export default pool;
