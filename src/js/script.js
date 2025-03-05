const funcionarios = [
    { id: 1, nome: "João Silva", cpf: "123.456.789-00", registro: "3213"},
    { id: 2, nome: "Maria Oliveira", cpf: "987.654.321-00", registro: "21421421"},
    { id: 3, nome: "Carlos Souza", cpf: "456.789.123-00", registro: "654321"},
    { id: 4, nome: "Renan Carlos", cpf: "321.231.221-00", registro: "213212"},
    { id: 5, nome: "Itallo Andrade", cpf: "231.212.312-00", registro: "412412"},
    { id: 6, nome: "Luiz Antônio", cpf: "221.789.886-00", registro: "412895"},
];

function carregarDados() {
    const tabelaBody = document.getElementById("tabela-body");
    funcionarios.forEach(funcionario => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${funcionario.id}</th>
            <td>${funcionario.nome}</td>
            <td>${funcionario.cpf}</td>
            <td>${funcionario.registro}</td>
            <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle perfil-icon" viewBox="0 0 16 16" data-id="${funcionario.id}">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
            </td>
        `;
        tabelaBody.appendChild(row);
    });
    adicionarEventosPerfil();
}

function adicionarEventosPerfil() {
    document.querySelectorAll(".perfil-icon").forEach(icon => {
        icon.addEventListener("click", (event) => {
            const id = event.target.getAttribute("data-id");
            mostrarDetalhes(id);
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
        `;
        new bootstrap.Modal(document.getElementById("detalhesModal")).show();
    }
}

// Carregar os dados ao carregar a página
window.onload = carregarDados;