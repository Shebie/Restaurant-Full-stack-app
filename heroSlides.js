import express from 'express';
import pool from '../data/db.js'; 

const router = express.Router();

// GET all hero slides
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hero_slides ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching slides:', err);
    res.status(500).send('Error fetching slides');
  }
});

// POST new hero slide
router.post('/', async (req, res) => {
  const { title, subtitle, image } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO hero_slides (title, subtitle, image) VALUES ($1, $2, $3) RETURNING *',
      [title, subtitle, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding slide:', err);
    res.status(500).send('Error adding slide');
  }
});


// UPDATE a hero slide by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, image } = req.body;

  try {
    const result = await pool.query(
      'UPDATE hero_slides SET title = $1, subtitle = $2, image = $3 WHERE id = $4 RETURNING *',
      [title, subtitle, image, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating slide:', err);
    res.status(500).send('Error updating slide');
  }
});
// DELETE a slide
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM hero_slides WHERE id = $1', [id]);
    res.status(204).send(); // 204 No Content
  } catch (err) {
    console.error('Error deleting slide:', err);
    res.status(500).send('Error deleting slide');
  }
});


export default router;
