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
        vacinasFiltradas = vacinas.filter(vacina => 
            vacina.nome.toLowerCase().includes(searchValue) || 
            vacina.id.toString().includes(searchValue) // Busca pelo ID
        );
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

// Função para editar a vacina
function editarVacina(id) {
    const vacina = vacinas.find(v => v.id === id);
    if (vacina) {
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

// Função para adicionar vacina
function adicionarVacina() {
    const registro = document.getElementById("registroVacina").value.trim();
    const nome = document.getElementById("nomeVacina").value.trim();

    if (!registro || !nome) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const novaVacina = {
        id: Math.floor(Math.random() * 10000), // Gera um ID aleatório
        nome: nome
    };

    vacinas.push(novaVacina);
    carregarDados();

    // Fechar modal após adicionar vacina
    let modalElement = document.getElementById("modalAdicionarVacina");
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    
    // Limpar campos do formulário
    document.getElementById("formVacina").reset();
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