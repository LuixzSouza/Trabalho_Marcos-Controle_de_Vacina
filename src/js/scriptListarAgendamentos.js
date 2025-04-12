export async function carregarAgendamentos() {
  const tabelaBody = document.getElementById("agendamentosTableBody");

  try {
    const resposta = await fetch("http://localhost:3000/agendamentos");
    const agendamentos = await resposta.json();

    tabelaBody.innerHTML = ""; // Limpa a tabela

    agendamentos.forEach(agendamento => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${agendamento.id}</td>
        <td>${agendamento.nomePaciente}</td>
        <td>${agendamento.tipoVacina}</td>
        <td>${agendamento.localVacinacao}</td>
        <td>${agendamento.dataVacinacao}</td>
      `;
      tabelaBody.appendChild(tr);
    });

  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error);
  }
}
