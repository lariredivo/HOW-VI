import pool from '../db.js';

export const getBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM livros');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addBook = async (req, res) => {
  const { titulo, autor, preco } = req.body;
  try {
    const result = await pool.query('INSERT INTO livros (titulo, autor, preco) VALUES ($1, $2, $3) RETURNING *', [titulo, autor, preco]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM livros WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
