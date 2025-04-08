let funcionarios = [];

function carregarDados() {
  fetch("http://localhost:3000/funcionarios")
    .then(response => response.json())
    .then(data => {
      funcionarios = data;
      atualizarTabela();
    })
    .catch(error => console.error("Erro ao carregar os funcionários:", error));
}

function atualizarTabela() {
  const tabelaBody = document.getElementById("tabela-body");
  tabelaBody.innerHTML = '';

  funcionarios.forEach(funcionario => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${funcionario.id}</th>
      <td>${funcionario.nome}</td>
      <td>${funcionario.cpf}</td>
      <td>${funcionario.registro}</td>
      <td>${funcionario.email}</td>
      <td>${funcionario.telefone}</td>
      <td>${funcionario.secao}</td>
      <td>
        <button class="btn btn-info btn-sm" data-id="${funcionario.id}">
          <i class="bi bi-person-circle"></i> Detalhes
        </button>
        <button class="btn btn-danger btn-sm ms-2" data-id="${funcionario.id}">
          <i class="bi bi-trash"></i> Excluir
        </button>
      </td>
    `;
    tabelaBody.appendChild(row);
  });

  adicionarEventosPerfil();
  adicionarEventosExcluir();
}

function adicionarEventosPerfil() {
  document.querySelectorAll(".btn-info").forEach(button => {
    button.addEventListener("click", event => {
      const id = event.target.closest("button").dataset.id;
      mostrarDetalhes(id);
    });
  });
}

function adicionarEventosExcluir() {
  document.querySelectorAll(".btn-danger").forEach(button => {
    button.addEventListener("click", event => {
      const id = event.target.closest("button").dataset.id;
      excluirFuncionario(id);
    });
  });
}

function mostrarDetalhes(id) {
  const funcionario = funcionarios.find(f => f.id == id);
  if (funcionario) {
    document.getElementById("modal-body").innerHTML = `
      <p><strong>ID:</strong> ${funcionario.id}</p>
      <p><strong>Nome:</strong> ${funcionario.nome}</p>
      <p><strong>CPF:</strong> ${funcionario.cpf}</p>
      <p><strong>Registro:</strong> ${funcionario.registro}</p>
      <p><strong>E-mail:</strong> ${funcionario.email}</p>
      <p><strong>Telefone:</strong> ${funcionario.telefone}</p>
      <p><strong>Seção:</strong> ${funcionario.secao}</p>
    `;
    const modalDetalhes = new bootstrap.Modal(document.getElementById("detalhesModal"));
    modalDetalhes.show();
  }
}

function excluirFuncionario(id) {
  const confirmacao = confirm("Tem certeza de que deseja excluir este funcionário?");
  if (confirmacao) {
    fetch(`http://localhost:3000/funcionarios/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        funcionarios = funcionarios.filter(f => f.id != id);
        atualizarTabela();
      })
      .catch(error => console.error("Erro ao excluir funcionário:", error));
  }
}

document.getElementById("salvar-btn").addEventListener("click", () => {
  const nome = document.getElementById("nomeFuncionario").value;
  const cpf = document.getElementById("cpfFuncionario").value;
  const registro = document.getElementById("registroFuncionario").value;
  const email = document.getElementById("emailFuncionario").value;
  const telefone = document.getElementById("telefoneFuncionario").value;
  const secao = document.getElementById("secaoFuncionario").value;

  if (nome && cpf && registro && email && telefone && secao) {
    const novoFuncionario = { nome, cpf, registro, email, telefone, secao };

    fetch("http://localhost:3000/funcionarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoFuncionario)
    })
      .then(response => response.json())
      .then(data => {
        funcionarios.push(data);
        atualizarTabela();
        const cadastroModal = bootstrap.Modal.getInstance(document.getElementById("cadastrarModal"));
        cadastroModal.hide();
        document.getElementById("form-cadastrar").reset();
      })
      .catch(error => console.error("Erro ao cadastrar funcionário:", error));
  } else {
    alert("Preencha todos os campos!");
  }
});

window.addEventListener("load", carregarDados);
