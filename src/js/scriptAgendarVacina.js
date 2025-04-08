document.getElementById("scheduleForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita o recarregamento da página
  
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
        console.log("Agendamento salvo na API:", data);
        document.getElementById("scheduleForm").reset(); // Limpa o formulário
      })
      .catch(error => {
        console.error("Erro ao agendar:", error);
        alert("Erro ao agendar. Verifique se o servidor está rodando.");
      });
  });