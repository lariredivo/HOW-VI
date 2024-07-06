import pool from './db.js';

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        telefone VARCHAR(15) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id SERIAL PRIMARY KEY,
        cliente_id INTEGER NOT NULL,
        data_pedido DATE NOT NULL,
        quantidade INTEGER NOT NULL,
        preco_total DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS livros (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        autor VARCHAR(255) NOT NULL,
        preco DECIMAL(10, 2) NOT NULL
      );
    `);

    await client.query(`
      INSERT INTO clientes (nome, email, telefone) VALUES 
      ('João Silva', 'joao.silva@example.com', '11987654321'),
      ('Maria Oliveira', 'maria.oliveira@example.com', '11987654322'),
      ('Carlos Santos', 'carlos.santos@example.com', '11987654323');
    `);

    await client.query(`
      INSERT INTO pedidos (cliente_id, data_pedido, quantidade, preco_total) VALUES 
      (1, '2024-07-01', 3, 90.00),
      (2, '2024-07-02', 2, 60.00),
      (3, '2024-07-03', 1, 30.00);
    `);

    await client.query(`
      INSERT INTO livros (titulo, autor, preco) VALUES 
      ('Livro A', 'Autor A', 29.99),
      ('Livro B', 'Autor B', 39.99),
      ('Livro C', 'Autor C', 19.99);
    `);

    console.log('Tabelas criadas e dados inseridos com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas ou inserir dados', err);
  } finally {
    client.release();
  }
};

export default createTables;
