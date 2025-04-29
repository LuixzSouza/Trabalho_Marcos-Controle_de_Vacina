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
  <td>${vacina.registro}</td>
  <td>
    <button class="btn btn-warning btn-sm" onclick="editarVacina('${vacina.id}', '${vacina.nome}')">✏️</button>
    <button class="btn btn-danger btn-sm" onclick="excluirVacina(${Number(vacina.id)})">🗑️</button>
`;


      tabelaBody.appendChild(row);
    });    
  } catch (error) {
    console.error("Erro ao carregar vacinas:", error);
  }
}

async function adicionarVacina() {
  const registro = document.getElementById("registroVacina").value.trim();
  const nome = document.getElementById("nomeVacina").value.trim();

  if (!registro || !nome) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Buscar a lista atual de vacinas para gerar o próximo ID
  let novoId = "0";  // Definindo o ID inicial como string
  try {
    const resposta = await fetch(apiURL);
    const vacinas = await resposta.json();

    const idsNumericos = vacinas.map(v => parseInt(v.id)).filter(n => !isNaN(n));
    if (idsNumericos.length > 0) {
      novoId = (Math.max(...idsNumericos) + 1).toString();  // Convertendo ID para string
    }
  } catch (e) {
    console.error("Erro ao buscar vacinas para gerar ID:", e);
  }

  const novaVacina = {
    id: novoId,  // Usando o ID como string
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
  const idString = id.toString(); // Força o ID a ser uma string

  if (!confirm(`Deseja realmente excluir a vacina de ID ${idString}?`)) return;

  try {
    const resposta = await fetch(`${apiURL}/${idString}`, {
      method: "DELETE"
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao excluir vacina: ${resposta.status}`);
    }

    carregarDados();
  } catch (error) {
    console.error("Erro ao excluir vacina:", error);
    alert("Erro ao excluir vacina. Tente novamente.");
  }
}

// Atualiza a tabela enquanto o usuário digita
document.getElementById("searchInput").addEventListener("input", function() {
  carregarDados();
});

// Carrega os dados ao abrir a página
window.onload = carregarDados;
