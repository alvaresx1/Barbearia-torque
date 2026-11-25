/* =========================================================
   CONFIGURAÇÃO DA BARBEARIA
   Para usar o site com outro cliente, basta trocar os dados
   deste objeto. O resto do site é montado automaticamente.
   ========================================================= */
const CONFIG = {
  nome: "Torque Barbearia",
  whatsapp: "5511900000000", // número fictício (DDI + DDD + número)
  telefoneExibicao: "(11) 90000-0000",
  endereco: "Rua das Navalhas, 123 – Centro, São Paulo - SP",
  horario: "Ter a Sex, 9h às 20h · Sáb, 8h às 18h",
  horaAbertura: 9,
  horaFechamento: 20,
  intervaloMinutos: 30,

  servicos: [
    {
      categoria: "Cabelo",
      itens: [
        { nome: "Corte", preco: 40 },
        { nome: "Corte infantil", preco: 30, obs: "Até 5 anos" },
        { nome: "Pezinho", preco: 15 }
      ]
    },
    {
      categoria: "Barba e sobrancelha",
      itens: [
        { nome: "Barba", preco: 25 },
        { nome: "Sobrancelha", preco: 10 }
      ]
    },
    {
      categoria: "Combos",
      itens: [
        { nome: "Corte + barba", preco: 60 },
        { nome: "Corte + sobrancelha", preco: 45 }
      ]
    },
    {
      categoria: "Luzes",
      itens: [
        { nome: "Luzes", preco: 45 }
      ]
    }
  ],

  equipe: [
    { nome: "Rafael Costa", funcao: "Barbeiro · Fundador" },
    { nome: "Diego Martins", funcao: "Barbeiro" },
    { nome: "Lucas Pereira", funcao: "Barbeiro" }
  ]
};

/* ===== Utilitários ===== */
const formatarPreco = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

const iniciais = (nome) =>
  nome.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

const linkWhatsApp = (mensagem) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;

function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

/* ===== Serviços ===== */
function montarServicos() {
  const lista = document.getElementById("lista-servicos");

  CONFIG.servicos.forEach((grupo) => {
    const card = criarElemento("div", "service-card");
    card.appendChild(criarElemento("h3", null, grupo.categoria));

    grupo.itens.forEach((item) => {
      const linha = criarElemento("div", "service-item");

      const nome = criarElemento("span", "service-item__name", item.nome);
      if (item.obs) nome.appendChild(criarElemento("span", "service-item__note", item.obs));

      linha.appendChild(nome);
      linha.appendChild(criarElemento("span", "service-item__dots"));
      linha.appendChild(criarElemento("span", "service-item__price", formatarPreco(item.preco)));
      card.appendChild(linha);
    });

    lista.appendChild(card);
  });
}

/* ===== Equipe ===== */
function montarEquipe() {
  const lista = document.getElementById("lista-equipe");

  CONFIG.equipe.forEach((barbeiro) => {
    const card = criarElemento("div", "barber");
    const avatar = criarElemento("div", "barber__avatar", iniciais(barbeiro.nome));
    avatar.setAttribute("aria-hidden", "true");

    const info = criarElemento("div");
    info.appendChild(criarElemento("p", "barber__name", barbeiro.nome));
    info.appendChild(criarElemento("p", "barber__role", barbeiro.funcao));

    card.appendChild(avatar);
    card.appendChild(info);
    lista.appendChild(card);
  });
}

/* ===== Informações de contato ===== */
function montarContato() {
  document.getElementById("info-endereco").textContent = CONFIG.endereco;
  document.getElementById("info-horario").textContent = CONFIG.horario;
  document.getElementById("info-telefone").textContent = CONFIG.telefoneExibicao;
  document.getElementById("link-mapa").href =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.endereco)}`;

  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    const msg = link.dataset.msg || `Olá! Vim pelo site da ${CONFIG.nome}.`;
    link.href = linkWhatsApp(msg);
    link.target = "_blank";
    link.rel = "noopener";
  });
}

/* ===== Formulário de agendamento ===== */
function montarFormulario() {
  const selServico = document.getElementById("servico");
  const selBarbeiro = document.getElementById("barbeiro");
  const selHora = document.getElementById("hora");
  const inputData = document.getElementById("data");

  selServico.appendChild(new Option("Selecione um serviço", ""));
  CONFIG.servicos.forEach((grupo) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = grupo.categoria;
    grupo.itens.forEach((item) => {
      const texto = `${item.nome} – ${formatarPreco(item.preco)}`;
      optgroup.appendChild(new Option(texto, texto));
    });
    selServico.appendChild(optgroup);
  });

  selBarbeiro.appendChild(new Option("Qualquer barbeiro disponível", "Qualquer barbeiro"));
  CONFIG.equipe.forEach((b) => selBarbeiro.appendChild(new Option(b.nome, b.nome)));

  selHora.appendChild(new Option("Selecione", ""));
  for (let min = CONFIG.horaAbertura * 60; min < CONFIG.horaFechamento * 60; min += CONFIG.intervaloMinutos) {
    const h = String(Math.floor(min / 60)).padStart(2, "0");
    const m = String(min % 60).padStart(2, "0");
    selHora.appendChild(new Option(`${h}:${m}`, `${h}:${m}`));
  }

  // Não deixa escolher datas passadas
  const hoje = new Date();
  hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
  inputData.min = hoje.toISOString().split("T")[0];

  document.getElementById("form-agendamento").addEventListener("submit", (evento) => {
    evento.preventDefault();
    const erro = document.getElementById("form-erro");
    const dados = new FormData(evento.target);

    const nome = dados.get("nome").trim();
    const servico = dados.get("servico");
    const barbeiro = dados.get("barbeiro");
    const data = dados.get("data");
    const hora = dados.get("hora");

    if (!nome || !servico || !data || !hora) {
      erro.textContent = "Preencha todos os campos para continuar.";
      return;
    }
    erro.textContent = "";

    const dataFormatada = data.split("-").reverse().join("/");
    const mensagem =
      `Olá! Gostaria de agendar um horário na ${CONFIG.nome}.\n\n` +
      `Nome: ${nome}\n` +
      `Serviço: ${servico}\n` +
      `Barbeiro: ${barbeiro}\n` +
      `Data: ${dataFormatada}\n` +
      `Horário: ${hora}`;

    window.open(linkWhatsApp(mensagem), "_blank", "noopener");
  });
}

/* ===== Inicialização ===== */
document.addEventListener("DOMContentLoaded", () => {
  montarServicos();
  montarEquipe();
  montarContato();
  montarFormulario();
});
