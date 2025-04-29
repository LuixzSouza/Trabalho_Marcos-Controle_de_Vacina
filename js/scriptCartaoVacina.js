document.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.getElementById("historicoVacinas");

  // Obtém a data atual considerando o fuso horário local
  const hojeDate = new Date();
  const ano = hojeDate.getFullYear();
  const mes = String(hojeDate.getMonth() + 1).padStart(2, "0");
  const dia = String(hojeDate.getDate()).padStart(2, "0");
  const hoje = `${ano}-${mes}-${dia}`;

  try {
    const response = await fetch("http://localhost:3000/cartaoVacina");
    const data = await response.json();

    tabela.innerHTML = "";

    // Filtra as vacinas com status "aplicada" cuja data de aplicação seja a data de hoje
    const vacinasHoje = data.filter(vacina => 
      vacina.status === "aplicada" && vacina.dataAplicacao === hoje
    );

    if (vacinasHoje.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 5;
      td.classList.add("text-center");
      td.textContent = "Nenhuma vacina aplicada hoje.";
      tr.appendChild(td);
      tabela.appendChild(tr);
      return;
    }

    vacinasHoje.forEach(vacina => {
      const tr = document.createElement("tr");

      const tdTipo = document.createElement("td");
      tdTipo.textContent = vacina.tipoVacina;

      const tdData = document.createElement("td");
      tdData.textContent = vacina.dataAplicacao;

      const tdResponsavel = document.createElement("td");
      tdResponsavel.textContent = vacina.responsavel;

      const tdLote = document.createElement("td");
      tdLote.textContent = vacina.lote;

      const tdFuncionario = document.createElement("td");
      tdFuncionario.textContent = vacina.funcionario;

      tr.appendChild(tdTipo);
      tr.appendChild(tdData);
      tr.appendChild(tdResponsavel);
      tr.appendChild(tdLote);
      tr.appendChild(tdFuncionario);

      tabela.appendChild(tr);
    });
  } catch (error) {
    console.error("Erro ao buscar dados da vacina:", error);
    tabela.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">
          Erro ao carregar dados. Verifique o servidor.
        </td>
      </tr>
    `;
  }
});