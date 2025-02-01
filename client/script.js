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
