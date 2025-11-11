import express from 'express';
import pool from '../data/db.js';
const router = express.Router();

// GET all top deals
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM top_deals ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching top deals:', err);
    res.status(500).send('Error fetching top deals');
  }
});

// POST a new deal
router.post('/', async (req, res) => {
  const { title, description, price, image } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO top_deals (title, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, price, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding deal:', err);
    res.status(500).send('Error adding deal');
  }
});

// PUT update deal
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price, image } = req.body;
  try {
    await pool.query(
      'UPDATE top_deals SET title=$1, description=$2, price=$3, image=$4 WHERE id=$5',
      [title, description, price, image, id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error('Error updating deal:', err);
    res.status(500).send('Error updating deal');
  }
});

// DELETE a deal
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM top_deals WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting deal:', err);
    res.status(500).send('Error deleting deal');
  }
});

export default router;
