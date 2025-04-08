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

function calcularProximaDose(dataUltima) {
    const novaData = new Date(dataUltima);
    novaData.setMonth(novaData.getMonth() + 6); // Exemplo: próxima dose 6 meses depois
    return novaData;
}

function formatarData(data) {
    return data.toLocaleDateString('pt-BR');
}

function filterVaccines() {
    const today = new Date();
    const rows = document.querySelectorAll("#vaccineTableBody tr");

    rows.forEach(row => {
        const proximaDoseStr = row.cells[2].textContent; // Coluna "Próxima dose"
        const [dia, mes, ano] = proximaDoseStr.split('/');
        const proximaDose = new Date(`${ano}-${mes}-${dia}`);

        if (proximaDose < today) {
            row.style.display = "none"; // Esconde se já passou
        } else {
            row.style.display = ""; // Mostra se ainda é válida
        }
    });
}


document.addEventListener("DOMContentLoaded", loadVaccines);
