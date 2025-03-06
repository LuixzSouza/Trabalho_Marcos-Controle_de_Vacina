// Pesquisa no Header
// Lista de páginas
const pages = [
    { name: "home", url: "/index.html" },
    { name: "listar funcionario", url: "/pages/TelaListarFuncionarios.html" },
    { name: "listar vacinas", url: "/pages/TelaListarVacinas.html" }
];

// Função de pesquisa para o formulário
// Função de pesquisa para o formulário
function pesquisarPagina(event) {
    event.preventDefault();
    const query = event.target.querySelector("input[type='search']").value.toLowerCase().trim();
    const foundPage = pages.find(page => page.name.includes(query));
    
    // Se a página for encontrada, redireciona para ela, senão para uma página de erro com o termo de busca na URL
    if (foundPage) {
        window.location.href = foundPage.url;
    } else {
        window.location.href = `/pages/NotFound.html?search=${encodeURIComponent(query)}`;
    }
}


// Adiciona o evento de pesquisa no header
const headerSearchForm = document.getElementById("headerSearchForm");
headerSearchForm.addEventListener("submit", pesquisarPagina);

// Adiciona o evento de pesquisa no formulário da seção principal
const mainSearchForm = document.getElementById("mainSearchForm");
mainSearchForm.addEventListener("submit", pesquisarPagina);

