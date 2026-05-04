import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

// Use Railway's DATABASE_URL if available (production), otherwise use individual vars (local dev)
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } // Required for Railway PostgreSQL
    })
  : new Pool({
      user:     process.env.DB_USER     || 'postgres',
      host:     process.env.DB_HOST     || 'localhost',
      database: process.env.DB_NAME     || 'bpomate',
      password: process.env.DB_PASSWORD || 'admin',
      port:     process.env.DB_PORT     || 5432,
    });

export default pool;
