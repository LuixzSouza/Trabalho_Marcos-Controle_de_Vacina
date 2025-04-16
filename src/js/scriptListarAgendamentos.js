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

// VALIDAÇÃO E ENVIO DO FORMULÁRIO
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("scheduleForm");
  const inputData = document.getElementById("vaccineDate");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nomePaciente = document.getElementById("patientName").value.trim();
    const tipoVacina = document.getElementById("vaccineType").value;
    const localVacinacao = document.getElementById("location").value.trim();
    const dataVacinacao = inputData.value;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataSelecionada = new Date(dataVacinacao);

    if (!dataVacinacao || dataSelecionada < hoje) {
      inputData.classList.add("is-invalid");
      return;
    } else {
      inputData.classList.remove("is-invalid");
    }

    const novoAgendamento = {
      nomePaciente,
      tipoVacina,
      localVacinacao,
      dataVacinacao
    };

    try {
      const resposta = await fetch("http://localhost:3000/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoAgendamento)
      });

      if (resposta.ok) {
        alert("Agendamento realizado com sucesso!");
        form.reset();
        inputData.classList.remove("is-invalid");

        carregarAgendamentos(); // Atualiza a tabela após agendar
      } else {
        alert("Erro ao agendar vacina.");
      }
    } catch (error) {
      console.error("Erro ao enviar agendamento:", error);
    }
  });
});
