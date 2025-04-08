document.addEventListener("DOMContentLoaded", async () => {
    const tabela = document.getElementById("historicoVacinas");
    const hoje = new Date().toISOString().split("T")[0]; // data no formato YYYY-MM-DD
  
    try {
      const response = await fetch("http://localhost:3000/cartaoVacina");
      const data = await response.json();
  
      tabela.innerHTML = "";
  
      const vacinasHoje = data.filter(vacina => vacina.status === "aplicada" && vacina.dataAplicacao === hoje);
  
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
  