import express from 'express';
import pool from '../data/db.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Add a new menu item
router.post('/', async (req, res) => {
  const { title, description, price, image, category } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO menu_items (title, description, price, image, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, price, image, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add menu item' });
  }
});

// Edit menu item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price, image, category } = req.body;
  try {
    const result = await pool.query(
      'UPDATE menu_items SET title=$1, description=$2, price=$3, image=$4, category=$5 WHERE id=$6 RETURNING *',
      [title, description, price, image, category, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM menu_items WHERE id=$1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

export default router;
