import express from 'express';
import cors from 'cors';
import pool from './db.js';
import natural from 'natural';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    process.env.FRONTEND_URL || 'https://your-app.vercel.app'
  ],
  credentials: true
}));
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

// Get full database tree
app.get('/api/database', async (req, res) => {
  try {
    const categoriesResult = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    const regulationsResult = await pool.query('SELECT * FROM regulations');
    const parametersResult = await pool.query('SELECT * FROM parameters');

    const categories = categoriesResult.rows.map(cat => {
      return {
        id: cat.id,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        colorLight: cat.color_light,
        active: cat.active,
        keywords: {
          high: cat.keywords_high || [],
          medium: cat.keywords_medium || [],
          low: cat.keywords_low || []
        },
        regulations: regulationsResult.rows
          .filter(r => r.category_id === cat.id)
          .map(r => ({ code: r.code, title: r.title })),
        parameters: parametersResult.rows
          .filter(p => p.category_id === cat.id)
          .map(p => ({
            name: p.name,
            unit: p.unit,
            limit: p.limit_val,
            method: p.method,
            type: p.type,
            group: p.group_name
          }))
      };
    });

    res.json({ categories });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle category active status
app.put('/api/categories/:id/toggle', async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  if (typeof active !== 'boolean') return res.status(400).json({ error: 'Invalid active status' });

  try {
    const result = await pool.query(
      'UPDATE categories SET active = $1 WHERE id = $2 RETURNING id, name, active',
      [active, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error during update' });
  }
});

// Advanced NLP Analysis Endpoint using 'natural'
app.post('/api/analyze', async (req, res) => {
  const { query } = req.body;
  if (!query || query.trim().length < 5) return res.status(400).json({ error: 'Query too short' });

  try {
    // 1. Fetch active categories
    const catResult = await pool.query('SELECT * FROM categories WHERE active = true');
    const categories = catResult.rows;

    // 2. Tokenize and stem the input query
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(query.toLowerCase());
    const stemmer = natural.PorterStemmer;
    const stemmedTokens = tokens.map(t => stemmer.stem(t));

    // 3. Score categories (Fuzzy matching + Stemming)
    const scores = {};
    for (const cat of categories) {
      let score = 0;
      const checkMatch = (kwList, weight) => {
        if (!kwList) return;
        for (const kw of kwList) {
          const stemmedKw = stemmer.stem(kw.toLowerCase());
          if (stemmedTokens.includes(stemmedKw)) { score += weight; continue; }
          // Jaro-Winkler distance for fuzzy matching typos
          for (const token of tokens) {
            if (natural.JaroWinklerDistance(token, kw.toLowerCase()) > 0.85) {
               score += (weight * 0.8);
               break;
            }
          }
        }
      };
      
      checkMatch(cat.keywords_high, 10);
      checkMatch(cat.keywords_medium, 5);
      checkMatch(cat.keywords_low, 2);
      
      scores[cat.id] = score;
    }

    const ranked = Object.entries(scores).sort(([, a], [, b]) => b - a).filter(([, s]) => s > 0);
    if (!ranked.length) return res.json({ result: null });

    const [[topId, topScore], second = [null, 0]] = ranked;
    const [, secondScore] = second;
    
    // Calculate confidence
    const base = Math.min(topScore * 3.8, 100);
    const margin = secondScore > 0 ? (topScore - secondScore) / topScore : 1;
    const confidence = Math.min(Math.round(base * (0.6 + 0.4 * margin)), 99);
    const level = confidence >= 82 ? 'high' : confidence >= 58 ? 'medium' : 'low';

    // 4. Fetch regulations and parameters for the matched categories
    const fetchDetails = async (id) => {
       const catRow = categories.find(c => c.id === id);
       const regs = await pool.query('SELECT code, title FROM regulations WHERE category_id = $1', [id]);
       const params = await pool.query('SELECT name, unit, limit_val, method, type, group_name FROM parameters WHERE category_id = $1', [id]);
       return {
         id: catRow.id,
         name: catRow.name,
         description: catRow.description,
         icon: catRow.icon,
         color: catRow.color,
         colorLight: catRow.color_light,
         regulations: regs.rows,
         parameters: params.rows.map(p => ({
            name: p.name,
            unit: p.unit,
            limit: p.limit_val,
            method: p.method,
            type: p.type,
            group: p.group_name
         }))
       };
    };

    const validMatches = ranked.filter(([, score]) => score >= topScore * 0.75);
    
    let topCategory;
    if (validMatches.length > 1) {
       let compositeParams = [], compositeRegs = [], names = [];
       for (const [id] of validMatches) {
          const details = await fetchDetails(id);
          names.push(details.name);
          details.regulations.forEach(r => { if (!compositeRegs.find(x => x.code === r.code)) compositeRegs.push(r); });
          details.parameters.forEach(p => { if (!compositeParams.find(x => x.name === p.name)) compositeParams.push(p); });
       }
       const firstDetails = await fetchDetails(validMatches[0][0]);
       topCategory = {
         id: validMatches.map(([id]) => id).join('_'),
         name: names.join(' + '),
         description: 'Composite classification spanning multiple BPOM regulatory categories.',
         icon: firstDetails.icon, color: firstDetails.color, colorLight: firstDetails.colorLight,
         regulations: compositeRegs, parameters: compositeParams
       };
    } else {
       topCategory = await fetchDetails(topId);
    }
    
    const alternatives = [];
    for (const [id] of ranked.slice(validMatches.length, validMatches.length + 3)) {
       const catRow = categories.find(c => c.id === id);
       alternatives.push({ id: catRow.id, name: catRow.name });
    }

    res.json({
      result: { topCategory, confidence, level, alternatives }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error during analysis' });
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
