const historicoVacinas = [
    { tipo: 'Covid-19', data: '2025-03-15', responsavel: 'Dr. João Silva' },
    { tipo: 'Influenza', data: '2024-08-10', responsavel: 'Dr. Maria Oliveira' }
];

// Preencher a tabela com os dados
const tabela = document.getElementById('historicoVacinas');
historicoVacinas.forEach(vacina => {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${vacina.tipo}</td>
        <td>${vacina.data}</td>
        <td>${vacina.responsavel}</td>
    `;
    tabela.appendChild(novaLinha);
});