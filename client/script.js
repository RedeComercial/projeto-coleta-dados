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
