# 👨‍⚕️ Gerenciador de Vacinas

O objetivo deste projeto é desenvolver um **sistema completo para a gestão de funcionários e o controle de vacinas**, contemplando as seguintes funcionalidades:

## 🚀 Como rodar o projeto

```bash
# Acessar pasta do Projeto
cd ./[CAMINHO] # Tab para aparecer

# Instalar pacotes
npm install

# Instalar Json Server
npm install -g json-server

# Rodar o Projeto na porta 3000 (para utilizar o JSON Server)
set PORT=3000 && npm start       # Windows
PORT=3000 npm start              # Linux / macOS

# Rodar Json Server
json-server --watch src/api/data/db.json --port 3000

```

## 👨‍💻 Desenvolvedores

Luiz Antônio de Souza: 
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](https://luixzsouza.com.br/contact)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LuixzSouza)

Renan Carlos:
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/renan-carlos-51a422280/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](https://github.com/RRenann)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RRenann)

Italo Andrade:
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](italloam123@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/italloandrade)


## 🛠️ Tecnologias Utilizadas
- HTML
- CSS
- JavaScript
- BootStrap
- Node.js

### 💻 Acesse o site do projeto:
👉 [Clique aqui para acessar o site](https://SEU-LINK-AQUI)

## 📅 Cronograma e Entregas

### Entrega 01 (05/03/2025)
#### Simulação de dados: Construção de arrays simulando os dados vindos de uma base.

- Tela de listagem de funcionários: Tabela com nome, CPF, registro e ícones para visualizar, editar e excluir; campo de busca que filtra os registros conforme o nome.
- Tela de cadastro de funcionários: Formulário com os campos necessários para o cadastro.
- Tela de listagem e cadastro de tipos de vacina: Tabela com os tipos de vacina e campo de busca para filtragem.

### Entrega 02 (30/03/2025)
#### Filtro de funcionários: Implementar o filtro da lista de funcionários utilizando o evento change para filtrar conforme a pesquisa.

- Validações de formulário: Validar todos os campos dos formulários (registro de vacina e agendamento) no evento submit.
- Registro de vacina: Criação da tela para registro de aplicação da vacina.
- Cartão de vacina: Tela para que o funcionário visualize seu histórico de vacina.
- Agendamento de vacina: Tela para agendamento com validação para aceitar somente datas futuras.
- Listagem de vacinas do dia: Filtro que exiba as vacinas a serem aplicadas na data atual.

### Entrega Final (08/04/2025)
#### Integração com API: Implementar a lógica de salvar e buscar dados da API para todos os formulários.

- Uso de API para listagens: Buscar e exibir dados reais para funcionários e vacinas.

## 🧠 Divisão de Tarefas (Equipe)
Renan Carlos:

- Responsável pela Tela para Cadastro de Funcionários.
- Filtro de pesquisa na listagem de funcionários.
- Validação dos formulários (registro de vacina e agendamento) no evento submit.
- Teste da API (Corrigir Bug)

Itallo Andrade:

- Responsável pela Tela para Cadastro de Funcionários.
- Desenvolvimento da tela de registro da vacina.
- Criação da tela do cartão de vacina, com histórico das vacinas aplicadas.
- Teste da API (Corrigir Bug)

Luiz Antônio:

- Responsável pela Tela para tipo de Vacina.
- Desenvolvimento da tela de agendamento de vacina com validação de data.
- Criação da tela para filtragem dos tipos de vacina, incluindo o tempo para a próxima aplicação.
- Integração da API
