const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Endpoints de envio de mensagens
// CRUD -> Create, Read (Read All e Read Single), Update and Delete
// CRUD -> Criar, Ler (Ler tudo e ler individualmente), atualizar e remover

const mensagens = [
  { id: 0, mensagem: 'Essa é uma mensagem' },
  { id: 1, mensagem: 'Essa é outra mensagem' },
];

// Read All
app.get('/mensagens', (req, res) => {
  res.json(mensagens);
});

// Create
app.post('/mensagens', (req, res) => {
  // Obtendo a mensagem que foi recebida através do body da requisição
  const mensagem = req.body;

  const id = mensagens.length;

  // Insiro a mensagem na lista de mensagens
  mensagem.id = id;

  mensagens.push(mensagem);

  // Exibido o ID da mensagem, que no caso é o índice que ela foi adicionada
  res.send(`Mensagem ${mensagem.mensagem} criada. ID: ${id}.`);
});

// Read Single
app.get('/mensagens/:id', (req, res) => {
  const id = req.params.id;
  const mensagem = mensagens[id];
  res.json({ id, mensagem });
});

// Update
app.put('/mensagens/:id', (req, res) => {
  const id = req.params.id;

  const novaMensagem = req.body.mensagem;

  mensagens[id].mensagem = novaMensagem;

  res.send(`Mensagem ${id}: ${req.body.mensagem} atualizada`);
});

// Delete
app.delete('/mensagens/:id', (req, res) => {
  const id = req.params.id;

  delete mensagens[id];

  res.send(`Mensage: ${id} removida com sucesso!`);
});

app.get('/mensagens', (req, res) => {
  res.json(mensagens.filter(Boolean));
});

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});
