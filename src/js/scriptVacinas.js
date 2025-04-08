const apiURL = "http://localhost:3000/vacinas";

// Função para carregar vacinas da API e exibir na tabela
async function carregarDados() {
  const tabelaBody = document.getElementById("tabela-body");
  tabelaBody.innerHTML = "";

  const searchValue = document.getElementById("searchInput").value.toLowerCase();

  try {
    const resposta = await fetch(apiURL);
    let vacinas = await resposta.json();

    if (searchValue) {
      vacinas = vacinas.filter(vacina =>
        vacina.nome.toLowerCase().includes(searchValue) ||
        vacina.id.toString().includes(searchValue)
      );
    }

    vacinas.forEach(vacina => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <th scope="row">${vacina.id}</th>
        <td>${vacina.nome}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarVacina(${vacina.id}, '${vacina.nome}')">✏️</button>
          <button class="btn btn-danger btn-sm" onclick="excluirVacina(${vacina.id})">🗑️</button>
        </td>
      `;
      tabelaBody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar vacinas:", error);
  }
}

// Função para adicionar vacina
async function adicionarVacina() {
  const registro = document.getElementById("registroVacina").value.trim();
  const nome = document.getElementById("nomeVacina").value.trim();

  if (!registro || !nome) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const novaVacina = {
    nome: nome,
    registro: registro
  };

  try {
    await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaVacina)
    });

    carregarDados();

    // Fechar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalAdicionarVacina"));
    modal.hide();

    document.getElementById("formVacina").reset();
  } catch (error) {
    console.error("Erro ao adicionar vacina:", error);
  }
}

// Função para editar vacina
async function editarVacina(id, nomeAtual) {
  const novoNome = prompt("Digite o novo nome da vacina:", nomeAtual);
  if (!novoNome || novoNome.trim() === "") return;

  try {
    await fetch(`${apiURL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: novoNome.trim() })
    });

    carregarDados();
  } catch (error) {
    console.error("Erro ao editar vacina:", error);
  }
}

// Função para excluir vacina
async function excluirVacina(id) {
  if (!confirm(`Deseja realmente excluir a vacina de ID ${id}?`)) return;

  try {
    await fetch(`${apiURL}/${id}`, {
      method: "DELETE"
    });

    document.getElementById("searchInput").value = "";
    carregarDados();
  } catch (error) {
    console.error("Erro ao excluir vacina:", error);
  }
}

// Evento para busca
document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();
  carregarDados();
});

// Atualiza a tabela enquanto o usuário digita
document.getElementById("searchInput").addEventListener("input", function() {
  carregarDados();
});

// Carrega os dados ao abrir a página
window.onload = carregarDados;
