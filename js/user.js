// Verifica se estamos na tela de login
if (window.location.pathname.includes("TelaLogin.html")) {
    // Fazer Login
    document.getElementById("loginForm").addEventListener("submit", async function(e) {
      e.preventDefault();
      const cpf = document.getElementById("cpf").value;
      const senha = document.getElementById("senha").value;
  
      try {
        const res = await fetch("http://localhost:3000/funcionarios?cpf=" + cpf + "&senha=" + senha);
        const data = await res.json();
  
        if (data.length > 0) {
          localStorage.setItem("usuarioLogado", JSON.stringify(data[0]));
          window.location.href = "/pages/TelaPerfilUsuario.html";
        } else {
          alert("CPF ou senha incorretos.");
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao tentar logar.");
      }
    });
  }
  
  // Verifica se estamos na tela de perfil
  if (window.location.pathname.includes("TelaPerfilUsuario.html")) {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
  
    if (!user) {
      alert("Você precisa estar logado.");
      window.location.href = "/pages/TelaLogin.html";
    } else {
      document.getElementById("perfilUsuario").innerHTML = `
        <p><strong>Nome:</strong> ${user.nome}</p>
        <p><strong>CPF:</strong> ${user.cpf}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Cargo:</strong> ${user.cargo}</p>
        <a href="/pages/TelaCartaoVacinaAtual.html" class="btn btn-primary mt-3">Ver Cartão de Vacina</a>
        <button class="btn btn-warning mt-3" onclick="editarDados()">Atualizar Dados</button>
        <button class="btn btn-secondary mt-3" onclick="alterarSenha()">Alterar Senha</button>
        <button class="btn btn-danger mt-3" onclick="logout()">Sair</button>
      `;
    }
  
    window.logout = function () {
      localStorage.removeItem("usuarioLogado");
      window.location.href = "/pages/TelaLogin.html";
    }
  
    window.editarDados = function () {
      document.getElementById("editNome").value = user.nome;
      document.getElementById("editEmail").value = user.email;
      document.getElementById("editCargo").value = user.cargo;
      document.getElementById("modalEditar").style.display = "flex";
    }
  
    window.salvarEdicao = async function () {
      const nome = document.getElementById("editNome").value;
      const email = document.getElementById("editEmail").value;
      const cargo = document.getElementById("editCargo").value;
  
      const atualizado = { ...user, nome, email, cargo };
  
      try {
        await fetch(`http://localhost:3000/funcionarios/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(atualizado),
        });
  
        localStorage.setItem("usuarioLogado", JSON.stringify(atualizado));
        location.reload();
      } catch (err) {
        alert("Erro ao atualizar dados.");
        console.error(err);
      }
    }
  
    window.alterarSenha = function () {
      document.getElementById("senhaAtual").value = "";
      document.getElementById("novaSenha").value = "";
      document.getElementById("confirmaSenha").value = "";
      document.getElementById("modalSenha").style.display = "flex";
    }
  
    window.salvarNovaSenha = async function () {
      const atual = document.getElementById("senhaAtual").value;
      const nova = document.getElementById("novaSenha").value;
      const confirma = document.getElementById("confirmaSenha").value;
  
      if (atual !== user.senha) {
        return alert("Senha atual incorreta.");
      }
  
      if (nova !== confirma) {
        return alert("A nova senha e a confirmação não coincidem.");
      }
  
      const atualizado = { ...user, senha: nova };
  
      try {
        await fetch(`http://localhost:3000/funcionarios/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(atualizado),
        });
  
        localStorage.setItem("usuarioLogado", JSON.stringify(atualizado));
        alert("Senha alterada com sucesso!");
        fecharModal('modalSenha');
      } catch (err) {
        alert("Erro ao alterar a senha.");
        console.error(err);
      }
    }
  
    window.fecharModal = function (id) {
      document.getElementById(id).style.display = "none";
    }
  }
  
  