function login() {
  const nome = document.getElementById('nome').value;
  const senha = document.getElementById('senha').value;

  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, senha })
  })
  .then(response => response.json())
  .then(data => {
    if (data.sucesso) {

// novo código
//      document.getElementById('nome-loja').value = data.loja; // Define o nome da loja no campo oculto
//      localStorage.setItem('loja', data.loja); // Armazena o nome da loja no localStorage
// fim do novo código
      
      // Redirecionar para a página de registro de vendas
      window.location.href = 'registro_vendas.html';
    } else {
      document.getElementById('mensagem-login').textContent = data.mensagem;
    }
  });
}

// Outras funções para registrar venda, listar vendas, etc.
function registrarVenda() {
  const formulario = document.getElementById('formulario-venda');
  const dadosVenda = {
    data: formulario.data.value,
    cliente: formulario.cliente.value,
    tipoAparelho: formulario['tipo-aparelho'].value,
    valorAparelho: formulario['valor-aparelho'].value,
    dataPagamento: formulario['data-pagamento'].value,
    dataEntrega: formulario['data-entrega'].value
  };
// novo código
//  const nomeLoja = document.getElementById('nome-loja').value || localStorage.getItem('loja');
//  dadosVenda.loja = nomeLoja;
//
  fetch('/vendas/registrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosVenda)
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('mensagem-registro').textContent = data.mensagem;
    formulario.reset(); // Limpar o formulário após o registro
  });
}

function carregarVendas() {
// novo código
//  const nomeLoja = document.getElementById('nome-loja').value || localStorage.getItem('loja');
//
  
  fetch('/vendas/listar') // Nova rota no servidor
    .then(response => response.json())
    .then(vendas => {
      const tabelaVendas = document.getElementById('tabela-vendas').getElementsByTagName('tbody')[0];
      tabelaVendas.innerHTML = ''; // Limpa a tabela antes de adicionar as novas vendas

      vendas.forEach(venda => {
        const linha = tabelaVendas.insertRow();
        const celulaData = linha.insertCell();
        const celulaCliente = linha.insertCell();
        const celulaTipo = linha.insertCell();
        const celulaValor = linha.insertCell();
        const celulaPagamento = linha.insertCell();
        const celulaEntrega = linha.insertCell();

        celulaData.textContent = venda.data;
        celulaCliente.textContent = venda.cliente;
        celulaTipo.textContent = venda.tipoAparelho;
        celulaValor.textContent = venda.valorAparelho;
        celulaPagamento.textContent = venda.dataPagamento;
        celulaEntrega.textContent = venda.dataEntrega;
      });
    });
}

// Chama a função carregarVendas quando a página carregar
window.onload = carregarVendas;
