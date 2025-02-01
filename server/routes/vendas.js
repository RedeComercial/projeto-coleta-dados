const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const vendasFilePath = path.join(__dirname, '../data/vendas.json');

router.post('/registrar', (req, res) => {
  const venda = req.body;
  const nomeLoja = req.body.loja; // Recupere o nome da loja

  venda.loja = nomeLoja; // Adicione o campo loja ao objeto venda
  
  fs.readFile(vendasFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensagem: 'Erro ao ler dados das vendas' });
    }

    const vendas = JSON.parse(data);
    vendas.push(venda);

    fs.writeFile(vendasFilePath, JSON.stringify(vendas, null, 2), err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: 'Erro ao salvar venda' });
      }

      res.json({ sucesso: true, mensagem: 'Venda registrada com sucesso' });
    });
  });
});

// Outras rotas para listar vendas e calcular total (implemente conforme necessário)

// Nova rota para listar as vendas (adicione aqui)
router.get('/listar', (req, res) => {
  fs.readFile(vendasFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensagem: 'Erro ao ler dados das vendas' });
    }

// novo código
    const vendas = JSON.parse(data);
    const vendasDaLoja = vendas.filter(venda => venda.loja === nomeLoja); // Filtra as vendas

    res.json(vendasDaLoja);
// Fim do novo código

    
    try {
      const vendas = JSON.parse(data);
      res.json(vendas);
    } catch (error) {
      console.error("Erro ao analisar dados JSON:", error);
      res.status(500).json({ mensagem: "Erro ao processar dados das vendas" });
    }
  });
});

module.exports = router;
