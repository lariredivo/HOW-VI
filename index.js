

const app = express();
const PORT = 8080;

import express from 'express';
import bodyParser from 'body-parser';
import pool from './db.js'; // Certifique-se de que db.js exporta corretamente o pool de conexão

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.route('/clientes')
  .get(async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM clientes');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .post(async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
      await pool.query(
        'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3)',
        [nome, email, telefone]
      );
      res.json({ message: 'Cliente adicionado com sucesso!' });
 }  catch (err) {
    }
    
  });
  

app.route('/compras')
  .get(async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM compras');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .post(async (req, res) => {
    const { data, valor, cliente_id } = req.body;
    try {
      await pool.query(
        'INSERT INTO compras (data, valor, cliente_id) VALUES ($1, $2, $3)',
        [data, valor, cliente_id]
      );
      res.json({ message: 'Compra adicionada com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});