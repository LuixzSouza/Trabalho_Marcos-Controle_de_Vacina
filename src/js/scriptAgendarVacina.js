import { carregarAgendamentos } from "./scriptListarAgendamentos.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("scheduleForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nomePaciente = document.getElementById("patientName").value;
    const tipoVacina = document.getElementById("vaccineType").value;
    const localVacinacao = document.getElementById("location").value;
    const dataVacinacao = document.getElementById("vaccineDate").value;

    if (!nomePaciente || !tipoVacina || !localVacinacao || !dataVacinacao) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoAgendamento = {
      nomePaciente,
      tipoVacina,
      localVacinacao,
      dataVacinacao
    };

    fetch("http://localhost:3000/agendamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoAgendamento)
    })
      .then(res => res.json())
      .then(data => {
        alert("Agendamento realizado com sucesso!");
        form.reset();
        carregarAgendamentos(); // Atualiza a tabela
      })
      .catch(error => {
        console.error("Erro ao agendar:", error);
        alert("Erro ao agendar. Verifique se o servidor está rodando.");
      });
  });

  carregarAgendamentos(); // Carrega na abertura da página
});
