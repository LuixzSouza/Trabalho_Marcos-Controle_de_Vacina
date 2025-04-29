// script.js

// ============================
// 1. Configurações de rotas
// ============================
const pages = [
    { name: "home", url: "/index.html", keywords: ["início", "home", "principal"] },
    { name: "listar funcionario", url: "/pages/TelaListarFuncionarios.html", keywords: ["funcionario", "funcionários", "listar funcionarios", "colaborador"] },
    { name: "listar vacinas", url: "/pages/TelaListarVacinas.html", keywords: ["vacina", "vacinas", "listar", "todas as vacinas"] },
    { name: "registro vacina", url: "/pages/TelaRegistroVacina.html", keywords: ["registro", "nova vacina", "adicionar vacina"] },
    { name: "agendamento vacina", url: "/pages/TelaAgendamentoVacina.html", keywords: ["agendar", "agendamento", "vacina futura", "marcar vacina"] },
    { name: "filtro vacinas", url: "/pages/TelaFiltroVacinas.html", keywords: ["filtro", "buscar vacina", "procurar vacina"] },
    { name: "cartão vacina", url: "/pages/TelaCartaoVacinaAtual.html", keywords: ["cartão", "meu cartão", "vacinas tomadas", "histórico"] },
    { name: "perfil", url: "/pages/TelaPerfilUsuario.html", keywords: ["usuario", "login", "entrar", "perfil"] }
  ];
  
  // ============================
  // 2. Função de pesquisa
  // ============================
  function pesquisarPagina(event) {
    event.preventDefault();
    const input = event.target.querySelector("input[type='search']");
    const query = input.value.toLowerCase().trim();
  
    const foundPage = pages.find(page =>
      page.name.includes(query) || page.keywords.some(keyword => keyword.includes(query))
    );
  
    if (foundPage) {
      window.location.href = foundPage.url;
    } else {
      const sugestoes = pages
        .filter(p => p.keywords.some(k => k.includes(query)))
        .map(p => `<li><a href="${p.url}">${p.name}</a></li>`)
        .join("");
  
      const mensagem = sugestoes
        ? `<h2>Você quis dizer:</h2><ul>${sugestoes}</ul>`
        : `<h2>Nenhuma página encontrada para: <em>${query}</em></h2><p>Tente usar palavras como "vacina", "registro", "funcionário", etc.</p>`;
  
      localStorage.setItem("notFoundMensagem", mensagem);
      window.location.href = `/pages/NotFound.html?search=${encodeURIComponent(query)}`;
    }
  }

  // Aplica a função para o formulário do header
  document.getElementById("headerSearchForm")?.addEventListener("submit", pesquisarPagina);

  // Aplica a função para o formulário da página NotFound
  document.getElementById("notFoundSearchForm")?.addEventListener("submit", pesquisarPagina);

  
  // Função debounce para uso futuro
  export function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  // ============================
  // 3. Inicializações e eventos
  // ============================
  window.addEventListener("DOMContentLoaded", () => {
    // Pesquisa no header
    const headerSearchForm = document.getElementById("headerSearchForm");
    if (headerSearchForm) {
      headerSearchForm.addEventListener("submit", pesquisarPagina);
    }
  
    // Toggle da sidebar
    const toggleButton = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    if (toggleButton && sidebar) {
      toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }
  
    // Inicializa cartões e gráficos
    initListarVacinasCard();
    initCartaoVacinaCard();
    initRegistroAplicacoesCard();
    initAgendamentoVacinasCard();
    initStatusChart();
    drawMiniCalendar();
    initSparklines();
  });
  
  // ============================
  // 4. Funções de inicialização
  // ============================
  
  // 4.1 Listar Vacinas (gráfico de barras horizontal)
  function initListarVacinasCard() {
    const totalVacinas = 27;
    const lowStock = 3;
    const populares = [
      { nome: "Covid-19", aplicacoes: 12 },
      { nome: "Influenza", aplicacoes: 9 },
      { nome: "Hepatite B", aplicacoes: 6 },
      { nome: "Tétano", aplicacoes: 4 },
      { nome: "HPV", aplicacoes: 2 }
    ];
  
    document.getElementById("totalVacinas").textContent = totalVacinas;
    document.getElementById("lowStock").innerHTML =
      `<i class="bi bi-exclamation-triangle-fill text-warning"></i> ${lowStock} em estoque baixo`;
  
    const ctx = document.getElementById("chartVacinasPopulares");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: populares.map(v => v.nome),
        datasets: [{ data: populares.map(v => v.aplicacoes) }]
      },
      options: {
        indexAxis: "y",
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }
  
  // 4.2 Cartão Vacina (progress bar)
  function initCartaoVacinaCard() {
    const dosesTomadas = 4;
    const totalDoses = 5;
    const proximaDose = "2025-05-21";
    const pct = Math.round((dosesTomadas / totalDoses) * 100);
  
    document.getElementById("dosesTomadas").textContent = dosesTomadas;
    document.getElementById("proximaDose").textContent = proximaDose;
  
    const bar = document.querySelector(".progress-bar-cartao");
    bar.style.width = pct + "%";
    bar.textContent = pct + "%";
  }
  
  // 4.3 Registro de Aplicações (últimos 7 dias)
  function initRegistroAplicacoesCard() {
    const counts = [2, 4, 3, 5, 1, 0, 6];
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labels.push(`${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}`);
    }
    document.getElementById("aplicacoesHoje").textContent = counts[counts.length - 1];
  
    const ctx = document.getElementById("chartAplicacoes7d");
    new Chart(ctx, {
      type: "line",
      data: { labels, datasets: [{ data: counts, fill: true, tension: 0.3, pointRadius: 3 }] },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }
  
  // 4.4 Agendamento de Vacinas (lista simples)
  function initAgendamentoVacinasCard() {
    const proximos = [
      { data: "29/04/2025", funcionario: "João Silva" },
      { data: "30/04/2025", funcionario: "Maria Souza" },
      { data: "01/05/2025", funcionario: "Pedro Lima" }
    ];
    document.getElementById("agendPendentesCount").textContent = proximos.length;
    const list = document.getElementById("agendPendentesList");
    proximos.forEach(a => {
      const li = document.createElement("li");
      li.textContent = `${a.data} – ${a.funcionario}`;
      list.appendChild(li);
    });
  }
  
  // 4.5 Gráfico de setores de status de vacinação
  function initStatusChart() {
    // Exemplo de dados – substitua por valores reais da sua API:
    const totalNaoVacinados     = 20;
    const totalParcialmente     = 30;
    const totalTotalmente       = 50;

    // Seleciona o contexto do canvas
    const ctx = document.getElementById('statusChart').getContext('2d');

    // Cria o gráfico de pizza
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
            'Não vacinados',
            'Parcialmente vacinados',
            'Totalmente vacinados'
            ],
            datasets: [{
            data: [
                totalNaoVacinados,
                totalParcialmente,
                totalTotalmente
            ],
            backgroundColor: [
                '#dc3545', // vermelho
                '#0d6efd', // azul
                '#28a745'  // verde
            ],
            borderWidth: 1
            }]
        },
        options: {
            plugins: {
            legend: {
                position: 'bottom'
            }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
  }
  
  // 4.6 Mini Calendário (canvas)
  function drawMiniCalendar() {
    const canvas = document.getElementById("miniCalendar");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
    const cellW = canvas.width / 7;
    const cellH = (canvas.height - 20) / 2;
    const hoje = new Date();
  
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  
    daysOfWeek.forEach((day, i) => {
      ctx.fillStyle = "#6c757d";
      ctx.fillText(day, (i + 0.5) * cellW, cellH / 2);
    });
  
    for (let i = 0; i < 7; i++) {
      const dia = new Date(); dia.setDate(hoje.getDate() + i);
      const col = dia.getDay();
      const x = col * cellW + cellW / 2;
      const y = cellH + cellH / 2;
      ctx.fillStyle = i === 0 ? "#0d6efd" : "#212529";
      ctx.fillText(dia.getDate(), x, y);
    }
  }
  
  // 4.7 Sparklines (trends)
  function initSparklines() {
    const dataToday = [2, 5, 3, 6, 4, 7, 5];
    const dataPending = [10, 8, 12, 9, 11, 10, 8];
    const dataTotal = [20, 25, 30, 28, 32, 35, 38];
  
    document.getElementById('metricToday').textContent = dataToday[dataToday.length - 1];
    document.getElementById('metricPending').textContent = dataPending[dataPending.length - 1];
    document.getElementById('metricTotal').textContent = dataTotal[dataTotal.length - 1];
  
    createSparkline('sparklineToday', dataToday);
    createSparkline('sparklinePending', dataPending);
    createSparkline('sparklineTotal', dataTotal);
  }
  
  // Função genérica de sparkline
  function createSparkline(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array(data.length).fill(''),
        datasets: [{
          data,
          borderWidth: 2,
          borderColor: 'white', // <- Define a cor da linha como branca
          pointRadius: 0,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        elements: {
          line: { capBezierPoints: true }
        }
      }
    });
  }
  
// Notificação
document.addEventListener('DOMContentLoaded', function() {
  // Referências
  const btn = document.getElementById('btnNotifications');
  const badge = btn.querySelector('.badge');
  const toastEl = document.getElementById('notificationToast');
  const toastBody = document.getElementById('toastBody');
  const toastTime = document.getElementById('toastTime');
  const toast = new bootstrap.Toast(toastEl);

  // Exemplo de notificações (troque por fetch/AJAX real)
  const notifications = [
    { text: 'Paciente João Silva recebeu a dose 2 de Covid-19', time: 'há 5 min' },
    { text: 'Nova vacina “Influenza” adicionada ao catálogo', time: 'há 30 min' },
    { text: 'Agendamento pendente para Maria Souza em 01/05/2025', time: 'há 1 h' }
  ];

  // Atualiza contagem da badge
  function updateBadge() {
    badge.textContent = notifications.length;
  }

  // Preenche o corpo do toast
  function populateToast() {
    toastBody.innerHTML = '';
    notifications.forEach(n => {
      const item = document.createElement('div');
      item.className = 'mb-2';
      item.innerHTML = `
        <div>${n.text}</div>
        <small class="text-muted">${n.time}</small>
      `;
      toastBody.appendChild(item);
    });
    toastTime.textContent = new Date().toLocaleTimeString();
  }

  // Ao clicar no sino, exibe o toast
  btn.addEventListener('click', () => {
    populateToast();
    toast.show();
  });

  // Inicializa badge
  updateBadge();
});