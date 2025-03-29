const funcionarios = [
    { id: 1, nome: "João Silva", cpf: "123.456.789-00", registro: "3213" },
    { id: 2, nome: "Maria Oliveira", cpf: "987.654.321-00", registro: "21421421" },
    { id: 3, nome: "Carlos Souza", cpf: "456.789.123-00", registro: "654321" },
    { id: 4, nome: "Renan Carlos", cpf: "321.231.221-00", registro: "213212" },
    { id: 5, nome: "Itallo Andrade", cpf: "231.212.312-00", registro: "412412" },
    { id: 6, nome: "Luiz Antônio", cpf: "221.789.886-00", registro: "412895" },
];

// Função para carregar os funcionários na tabela
function carregarDados() {
    const tabelaBody = document.getElementById("tabela-body");
    tabelaBody.innerHTML = ''; // Limpa a tabela antes de carregar os dados novamente
    funcionarios.forEach(funcionario => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${funcionario.id}</th>
            <td>${funcionario.nome}</td>
            <td>${funcionario.cpf}</td>
            <td>${funcionario.registro}</td>
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
    adicionarEventosPerfil(); // Adiciona eventos aos botões de detalhes
    adicionarEventosExcluir(); // Adiciona eventos aos botões de excluir
}

// Função para adicionar os eventos aos botões de detalhes
function adicionarEventosPerfil() {
    document.querySelectorAll(".btn-info").forEach(button => {
        button.addEventListener("click", (event) => {
            const id = event.target.getAttribute("data-id");
            mostrarDetalhes(id);
        });
    });
}

// Função para adicionar os eventos aos botões de exclusão
function adicionarEventosExcluir() {
    document.querySelectorAll(".btn-danger").forEach(button => {
        button.addEventListener("click", (event) => {
            const id = event.target.getAttribute("data-id");
            excluirFuncionario(id);
        });
    });
}

// Função para mostrar os detalhes do funcionário
function mostrarDetalhes(id) {
    const funcionario = funcionarios.find(f => f.id == id);
    if (funcionario) {
        document.getElementById("modal-body").innerHTML = `
            <p><strong>ID:</strong> ${funcionario.id}</p>
            <p><strong>Nome:</strong> ${funcionario.nome}</p>
            <p><strong>CPF:</strong> ${funcionario.cpf}</p>
            <p><strong>Registro:</strong> ${funcionario.registro}</p>
        `;
        const modalDetalhes = new bootstrap.Modal(document.getElementById("detalhesModal"));
        modalDetalhes.show();
    }
}

// Função para excluir um funcionário
function excluirFuncionario(id) {
    // Confirmação antes de excluir
    const confirmacao = confirm("Tem certeza de que deseja excluir este funcionário?");
    if (confirmacao) {
        // Remove o funcionário da lista
        const index = funcionarios.findIndex(f => f.id == id);
        if (index !== -1) {
            funcionarios.splice(index, 1);
            carregarDados(); // Recarrega a tabela após exclusão
        }
    }
}

// Função para adicionar um novo funcionário
document.getElementById("salvar-btn").addEventListener("click", () => {
    const nome = document.getElementById("nomeFuncionario").value;
    const cpf = document.getElementById("cpfFuncionario").value;
    const registro = document.getElementById("registroFuncionario").value;

    if (nome && cpf && registro) {
        const novoFuncionario = {
            id: funcionarios.length + 1,
            nome,
            cpf,
            registro
        };

        funcionarios.push(novoFuncionario);
        carregarDados();

        const cadastroModal = bootstrap.Modal.getInstance(document.getElementById("cadastrarModal"));
        cadastroModal.hide();

        document.getElementById("form-cadastrar").reset();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
});

// Função de busca na tabela
document.getElementById("searchInput").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const rows = document.querySelectorAll("#tabela-body tr");

    rows.forEach(row => {   
        const nome = row.children[1].textContent.toLowerCase();
        row.style.display = nome.includes(searchText) ? "" : "none";
    });
});

// Carrega os dados ao carregar a página
window.onload = carregarDados;
