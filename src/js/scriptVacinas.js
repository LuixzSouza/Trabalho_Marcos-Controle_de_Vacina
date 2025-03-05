 // Array com os dados das vacinas
 let vacinas = [
    { id: 1, nome: "Hepatite B" },
    { id: 2, nome: "BCG" },
    { id: 3, nome: "Febre Amarela" },
    { id: 4, nome: "Tríplice Viral" },
    { id: 5, nome: "Covid-19" }
];

function carregarDados() {
    const tabelaBody = document.getElementById("tabela-body");
    tabelaBody.innerHTML = "";

    const searchValue = document.getElementById("searchInput").value.toLowerCase();

    let vacinasFiltradas = vacinas;
    if (searchValue) {
        vacinasFiltradas = vacinas.filter(vacina => vacina.nome.toLowerCase().includes(searchValue));
    }
    
    // Mostrar na tela
    vacinasFiltradas.forEach(vacina => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${vacina.id}</th>
            <td>${vacina.nome}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editarVacina(${vacina.id})">✏️</button>
              <button class="btn btn-danger btn-sm" onclick="excluirVacina(${vacina.id})">🗑️</button>
            </td>
        `;
        tabelaBody.appendChild(row);
    });
}

// Função para editar a vacina (exemplo: abrir modal, etc.)
function editarVacina(id) {
    const vacina = vacinas.find(v => v.id === id);
    if (vacina && confirm(`Deseja editar -> ${vacina.nome}?`)) {
      const novoNome = prompt("Digite o novo nome da vacina:", vacina.nome);
      if (novoNome && novoNome.trim() !== "") {
        vacina.nome = novoNome.trim();
        carregarDados(); 
      }
    }
  }
  

// Função para excluir a vacina
function excluirVacina(id) {
    if (confirm(`Deseja realmente excluir a vacina de ID ${id}?`)) {
        vacinas = vacinas.filter(vacina => vacina.id !== id);
        document.getElementById("searchInput").value = "";
        carregarDados();
    }
}

// Evento para o formulário de busca: evita o recarregamento da página e chama a função de filtro
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    carregarDados();
});

// Atualiza a tabela enquanto o usuário digita (filtro dinâmico)
document.getElementById("searchInput").addEventListener("input", function() {
    carregarDados();
});

window.onload = carregarDados;