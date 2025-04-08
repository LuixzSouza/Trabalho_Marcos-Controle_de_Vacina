const data = require('../data/loadData');
let funcionarios = data.funcionarios;

exports.getAll = async () => funcionarios;

exports.create = async (funcionario) => {
  funcionario.id = funcionarios.length + 1;
  funcionarios.push(funcionario);
  return funcionario;
};
