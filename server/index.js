const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/auth');
const vendasRoutes = require('./routes/vendas');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

// Rotas de autenticação e vendas
app.use('/auth', authRoutes);
app.use('/vendas', vendasRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
