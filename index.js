// Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
const mongoose = require('mongoose');

// Configurações - Início
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Mongoose
mongoose
  .connect('mongodb://localhost/blogapp')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.log('Erro ao conectar ao MongoDB: ' + err);
  });

// Configurações - Fim

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
  res.send('home');
});
app.get('/posts', (req, res) => {
  res.send('posts');
});
app.use('/admin', admin);

// Outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log('Servidor rodando');
});
