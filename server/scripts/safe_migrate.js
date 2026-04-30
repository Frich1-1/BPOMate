import BPOM_DB from '../../data/regulations.js';
import pool from '../db.js';

async function migrate() {
  try {
    console.log('Successfully loaded data from regulations.js');
    console.log('Connecting to PostgreSQL to run migrations...');

    // CREATE TABLES
    await pool.query(`
      DROP TABLE IF EXISTS parameters;
      DROP TABLE IF EXISTS regulations;
      DROP TABLE IF EXISTS categories;
      
      CREATE TABLE categories (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(255),
        color VARCHAR(255),
        color_light VARCHAR(255),
        active BOOLEAN,
        keywords_high TEXT[],
        keywords_medium TEXT[],
        keywords_low TEXT[]
      );

      CREATE TABLE regulations (
        id SERIAL PRIMARY KEY,
        category_id VARCHAR(255) REFERENCES categories(id) ON DELETE CASCADE,
        code VARCHAR(255),
        title TEXT
      );

      CREATE TABLE parameters (
        id SERIAL PRIMARY KEY,
        category_id VARCHAR(255) REFERENCES categories(id) ON DELETE CASCADE,
        name VARCHAR(255),
        unit VARCHAR(255),
        limit_val VARCHAR(255),
        method TEXT,
        type VARCHAR(255),
        group_name VARCHAR(255)
      );
    `);

    console.log('Tables created successfully.');

    // INSERT DATA
    for (const cat of BPOM_DB.categories) {
      // Insert category
      await pool.query(
        `INSERT INTO categories 
         (id, name, description, icon, color, color_light, active, keywords_high, keywords_medium, keywords_low)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          cat.id, cat.name, cat.description, cat.icon, cat.color, cat.colorLight, cat.active,
          cat.keywords?.high || [], cat.keywords?.medium || [], cat.keywords?.low || []
        ]
      );

      // Insert regulations
      if (cat.regulations) {
        for (const reg of cat.regulations) {
          await pool.query(
            `INSERT INTO regulations (category_id, code, title) VALUES ($1, $2, $3)`,
            [cat.id, reg.code, reg.title]
          );
        }
      }

      // Insert parameters
      if (cat.parameters) {
        for (const param of cat.parameters) {
          await pool.query(
            `INSERT INTO parameters (category_id, name, unit, limit_val, method, type, group_name) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [cat.id, param.name, param.unit, param.limit, param.method, param.type, param.group]
          );
        }
      }
    }

    console.log('Data migration completed successfully!');
    process.exit(0);

  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
