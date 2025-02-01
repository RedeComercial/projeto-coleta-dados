const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const lojasFilePath = path.join(__dirname, '../data/lojas.json');

router.post('/login', (req, res) => {
  const { nome, senha } = req.body;

  fs.readFile(lojasFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensagem: 'Erro ao ler dados das lojas' });
    }

    const lojas = JSON.parse(data);
    const loja = lojas.find(l => l.nome === nome && l.senha === senha);

    if (loja) {
      res.json({ sucesso: true, loja: loja.nome });
    } else {
      res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }
  });
});

module.exports = router;
