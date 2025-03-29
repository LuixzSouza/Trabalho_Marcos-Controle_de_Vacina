document.getElementById('form-registro-vacina').addEventListener('submit', function(event) {
    // Previne o envio do formulário para poder validar os campos primeiro
    event.preventDefault();

    // Obtém os valores dos campos
    const funcionarioVacinado = document.getElementById('funcionarioVacinado').value.trim();
    const responsavel = document.getElementById('responsavel').value.trim();
    const dataAplicacao = document.getElementById('dataAplicacao').value.trim();
    const tipoVacina = document.getElementById('tipoVacina').value.trim();

    // Flag de validação
    let valid = true;

    // Validação dos campos
    if (!funcionarioVacinado) {
        alert("O nome do funcionário vacinado é obrigatório!");
        valid = false;
    }
    
    if (!responsavel) {
        alert("O nome do responsável é obrigatório!");
        valid = false;
    }
    
    if (!dataAplicacao) {
        alert("A data de aplicação é obrigatória!");
        valid = false;
    }
    
    if (!tipoVacina) {
        alert("O tipo de vacina é obrigatório!");
        valid = false;
    }

    // Se todos os campos estiverem válidos, envia o formulário
    if (valid) {
        // Aqui você pode enviar os dados ou processá-los como necessário
        alert("Vacina registrada com sucesso!");
        // Para fins de exemplo, podemos limpar o formulário
        document.getElementById('form-registro-vacina').reset();
    }
});