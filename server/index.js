import express from 'express';
import cors from 'cors';
import pool from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single category by id
app.get('/api/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get regulations for a specific category
app.get('/api/categories/:id/regulations', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM regulations WHERE category_id = $1 ORDER BY id ASC', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get parameters for a specific category
app.get('/api/categories/:id/parameters', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM parameters WHERE category_id = $1 ORDER BY group_name ASC, id ASC', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Unified Search Endpoint (to mimic the front-end search)
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  
  const queryText = `
    SELECT id, name, description, icon, color, color_light, active
    FROM categories
    WHERE 
      name ILIKE $1 OR 
      description ILIKE $1 OR 
      $2 = ANY(keywords_high) OR
      $2 = ANY(keywords_medium) OR
      $2 = ANY(keywords_low)
  `;
  
  try {
    const result = await pool.query(queryText, [`%${q}%`, q.toLowerCase()]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
