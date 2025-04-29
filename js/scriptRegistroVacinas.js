// Registrando Vacinas
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registro-vacina');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const funcionarioVacinado = document.getElementById('funcionarioVacinado').value.trim();
        const responsavel = document.getElementById('responsavel').value.trim();
        const dataAplicacao = document.getElementById('dataAplicacao').value;
        const tipoVacina = document.getElementById('tipoVacina').value.trim();

        if (!funcionarioVacinado || !responsavel || !dataAplicacao || !tipoVacina) {
        alert("Preencha todos os campos obrigatórios!");
        return;
        }

        const dadosVacina = {
        funcionario: funcionarioVacinado,
        responsavel: responsavel,
        dataAplicacao: dataAplicacao,
        tipoVacina: tipoVacina
        };

        try {
        const response = await fetch('http://localhost:3000/registros', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosVacina)
        });

        if (!response.ok) {
            throw new Error(`Erro ao registrar: ${response.status}`);
        }

        const resposta = await response.json();
        console.log("Resposta do servidor:", resposta);

        alert("Vacina registrada com sucesso!");
        form.reset();
        } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao registrar a vacina. Verifique se o servidor está ativo.");
        }
    });
});

// Pegando nomes do Funcionarios
document.addEventListener('DOMContentLoaded', async () => {
    const funcionarioSelect = document.getElementById('funcionarioVacinado');

    try {
        const response = await fetch('http://localhost:3000/funcionarios');
        const funcionarios = await response.json();

        funcionarios.forEach(func => {
            const option = document.createElement('option');
            option.value = func.nome; // ou func.id, dependendo de como você quer salvar
            option.textContent = func.nome;
            funcionarioSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar funcionários:", error);
        alert("Não foi possível carregar os funcionários. Verifique o servidor.");
    }
});

// Carregando tipos de vacinas
document.addEventListener('DOMContentLoaded', async () => {
    const vacinaSelect = document.getElementById('tipoVacina');

    try {
        const response = await fetch('http://localhost:3000/vacinas');
        const vacinas = await response.json();

        vacinas.forEach(vacina => {
            if (vacina.nome) {
                const option = document.createElement('option');
                option.value = vacina.nome;
                option.textContent = vacina.nome;
                vacinaSelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Erro ao carregar vacinas:", error);
        alert("Não foi possível carregar os tipos de vacinas. Verifique o servidor.");
    }
});
