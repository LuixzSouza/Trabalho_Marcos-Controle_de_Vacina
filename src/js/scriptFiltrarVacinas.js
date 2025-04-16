async function loadVaccines() {
    try {
        const response = await fetch("http://localhost:3000/cartaoVacina");
        const data = await response.json();
        const tableBody = document.getElementById("vaccineTableBody");
        tableBody.innerHTML = "";

        data.forEach(vacina => {
            const dataAplicacao = new Date(vacina.dataAplicacao);
            const proximaDose = calcularProximaDose(dataAplicacao);

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${vacina.tipoVacina}</td>
                <td>${formatarData(dataAplicacao)}</td>
                <td>${formatarData(proximaDose)}</td>
            `;
            tr.dataset.proximaDose = proximaDose.toISOString();
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao buscar vacinas:", error);
    }
}

function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}  

function calcularProximaDose(dataUltima) {
    const novaData = new Date(dataUltima);
    novaData.setMonth(novaData.getMonth() + 6); // Exemplo: próxima dose 6 meses depois
    return novaData;
}

function formatarData(data) {
    return data.toLocaleDateString('pt-BR');
}

const loadingMessage = document.getElementById("loadingMessage");

function filterVaccinesReal() {
  loadingMessage.style.display = "block";

  setTimeout(() => { // Simula tempo de carregamento
    const today = new Date();
    const rows = document.querySelectorAll("#vaccineTableBody tr");

    rows.forEach(row => {
      const proximaDoseStr = row.cells[2].textContent;
      const [dia, mes, ano] = proximaDoseStr.split('/');
      const proximaDose = new Date(`${ano}-${mes}-${dia}`);

      row.style.display = proximaDose < today ? "none" : "";
    });

    loadingMessage.style.display = "none";
  }, 800); // Espera só pra mostrar o "Carregando..."
}

const filterVaccines = debounce(filterVaccinesReal, 300); // Evita clique rápido demais
document.addEventListener("DOMContentLoaded", loadVaccines);
