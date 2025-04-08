// Pesquisa no Header
// Lista de páginas
const pages = [
    { name: "home", url: "/index.html", keywords: ["início", "home", "principal"] },
    { name: "listar funcionario", url: "/pages/TelaListarFuncionarios.html", keywords: ["funcionario", "funcionários", "listar funcionarios", "colaborador"] },
    { name: "listar vacinas", url: "/pages/TelaListarVacinas.html", keywords: ["vacina", "vacinas", "listar", "todas as vacinas"] },
    { name: "registro vacina", url: "/pages/TelaRegistroVacina.html", keywords: ["registro", "nova vacina", "adicionar vacina"] },
    { name: "agendamento vacina", url: "/pages/TelaAgendamentoVacina.html", keywords: ["agendar", "agendamento", "vacina futura", "marcar vacina"] },
    { name: "filtro vacinas", url: "/pages/TelaFiltroVacinas.html", keywords: ["filtro", "buscar vacina", "procurar vacina"] },
    { name: "cartão vacina", url: "/pages/TelaCartaoVacinaAtual.html", keywords: ["cartão", "meu cartão", "vacinas tomadas", "histórico"] },
    { name: "perfil", url: "./pages/TelaPerfilUsuario.html", keywords: ["usuario", "login", "entrar", "perfil"] }
];


// Função de pesquisa para o formulário
// Função de pesquisa para o formulário
function pesquisarPagina(event) {
    event.preventDefault();
    const query = event.target.querySelector("input[type='search']").value.toLowerCase().trim();

    const foundPage = pages.find(page =>
        page.name.includes(query) || page.keywords.some(keyword => keyword.includes(query))
    );

    if (foundPage) {
        window.location.href = foundPage.url;
    } else {
        // Se não achou, leva pra NotFound com sugestões
        const sugestoes = pages
            .filter(p => p.keywords.some(k => k.includes(query)))
            .map(p => `<li><a href="${p.url}">${p.name}</a></li>`)
            .join("");

        const mensagem = sugestoes
            ? `<h2>Você quis dizer:</h2><ul>${sugestoes}</ul>`
            : `<h2>Nenhuma página encontrada para: <em>${query}</em></h2><p>Tente usar palavras como "vacina", "registro", "funcionário", etc.</p>`;

        localStorage.setItem("notFoundMensagem", mensagem);
        window.location.href = `/pages/NotFound.html?search=${encodeURIComponent(query)}`;
    }
}

// Adiciona o evento de pesquisa no header
const headerSearchForm = document.getElementById("headerSearchForm");
headerSearchForm.addEventListener("submit", pesquisarPagina);

// Adiciona o evento de pesquisa no formulário da seção principal
const mainSearchForm = document.getElementById("mainSearchForm");
mainSearchForm.addEventListener("submit", pesquisarPagina);

