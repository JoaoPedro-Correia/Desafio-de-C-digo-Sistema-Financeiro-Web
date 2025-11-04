import express from 'express';

const app = express();

app.get('/usuarios', (req, res) => {
  res.send('Lista de usuários');
});

app.post('/usuarios', (req, res) => {
  res.send('Usuário criado');
});

app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Usuário ${id} atualizado`);
}); 

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Usuário ${id} deletado`);
});