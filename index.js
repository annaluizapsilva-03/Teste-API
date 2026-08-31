const express = require('express');
const app = express();

app.use(express.json());

let produtos = [
  { id: 1, descricao: 'Teclado Mecânico', preco: 249.90, categoria: 'Periféricos', estoque: 15 },
  { id: 2, descricao: 'Mouse sem fio', preco: 89.90, categoria: 'Periféricos', estoque: 25 },
  { id: 3, descricao: 'Monitor LED 24"', preco: 899.90, categoria: 'Monitores', estoque: 8 },
  { id: 4, descricao: 'Headset Gamer', preco: 199.90, categoria: 'Áudio', estoque: 20 },
  { id: 5, descricao: 'Webcam Full HD', preco: 149.90, categoria: 'Periféricos', estoque: 12 },
];

let proximoId = 6;

// GET /produtos - retorna todos os produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// GET /produtos/:id - retorna um produto específico
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);
  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }
  res.json(produto);
});

// POST /produtos - cadastra um novo produto
app.post('/produtos', (req, res) => {
  const { descricao, preco, categoria, estoque } = req.body;
  const novoProduto = { id: proximoId++, descricao, preco, categoria, estoque };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// PUT /produtos/:id - altera um produto existente
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }
  const { descricao, preco, categoria, estoque } = req.body;
  produtos[index] = { id, descricao, preco, categoria, estoque };
  res.json(produtos[index]);
});

// DELETE /produtos/:id - exclui um produto
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }
  produtos.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
