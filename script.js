const botaoAbrir = document.getElementById("abrir-demanda");
const modal = document.getElementById("minha-demanda");
const overlay = document.getElementById("overlay");
const botaoConcluido = document.getElementById("concluido");
const lista = document.getElementById("listaDemandas");
const visualizacao = document.getElementById("visualizarDemanda");
const visualTitulo = document.getElementById("visualTitulo");
const visualDescricao = document.getElementById("visualDescricao");

let demandaEmEdicao = null;

// Carrega demandas do localStorage ao carregar a página
window.addEventListener("load", () => {
  const demandasSalvas = JSON.parse(localStorage.getItem("demandas")) || [];
  demandasSalvas.forEach(demanda => {
    criarCaixaDemanda(demanda.titulo, demanda.descricao);
  });
});

// Abrir modal para nova demanda
botaoAbrir.addEventListener("click", () => {
  modal.style.display = "flex";
  overlay.style.display = "block";
  demandaEmEdicao = null;
});

// Concluir criação ou edição de demanda
botaoConcluido.addEventListener("click", () => {
  const setorSelecionado = document.getElementById("titulo").value.trim();
  const titulo = setorSelecionado ? `Problema: Setor de ${setorSelecionado}` : "";
  const descricao = document.getElementById("descricao").value.trim();

  // Se descrição estiver vazia, fecha o modal
  if (descricao === "") {
    modal.style.display = "none";
    overlay.style.display = "none";
    return;
  }

  // Se título e descrição estiverem preenchidos
  if (titulo !== '' && descricao !== '') {
    if (demandaEmEdicao) {
      demandaEmEdicao.querySelector(".titulo-demanda").textContent = titulo;
      demandaEmEdicao.querySelector(".descricao-demanda").textContent = descricao;
      salvarDemandas();
    } else {
      criarCaixaDemanda(titulo, descricao);
    }

    modal.style.display = "none";
    overlay.style.display = "none";
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
  }
});

function criarCaixaDemanda(titulo, descricao) {
  const novaDemanda = document.createElement("div");
  novaDemanda.classList.add("caixa-demanda");
  novaDemanda.innerHTML = `
    <h3 class="titulo-demanda">${titulo}</h3>
    <div class="descricao-container">
      <p class="descricao-demanda">${descricao}</p>
    </div>
  `;

  novaDemanda.addEventListener("click", () => {
    visualTitulo.textContent = titulo;
    visualDescricao.textContent = descricao;

    // Remove menus antigos antes de adicionar um novo
    const visualConteudo = visualizacao.querySelector(".demanda-conteudo");
    visualConteudo.querySelectorAll(".menu-opcoes").forEach(el => el.remove());

    // Adiciona três pontinhos e opções dentro da visualização
    const menu = document.createElement("div");
    menu.classList.add("menu-opcoes");
    menu.innerHTML = `
      <span class="tres-pontos">⋮</span>
      <div class="opcoes" style="display: none;">
        <button class="editar">Editar</button>
        <button class="excluir">Excluir</button>
      </div>
    `;
    visualConteudo.appendChild(menu);

    // Interações com os botões do menu
    menu.querySelector(".tres-pontos").addEventListener("click", (e) => {
      e.stopPropagation();
      const opcoes = menu.querySelector(".opcoes");
      opcoes.style.display = opcoes.style.display === "none" ? "block" : "none";
    });

    menu.querySelector(".editar").addEventListener("click", () => {
      const setor = titulo.replace("Problema: Setor de ", "");
      document.getElementById("titulo").value = setor;
      document.getElementById("descricao").value = descricao;
      demandaEmEdicao = novaDemanda;
      visualizacao.style.display = "none";
      overlay.style.display = "none";
      modal.style.display = "flex";
    });

    menu.querySelector(".excluir").addEventListener("click", () => {
      novaDemanda.remove();
      salvarDemandas();
      visualizacao.style.display = "none";
      overlay.style.display = "none";
    });

    visualizacao.style.display = "flex";
    overlay.style.display = "block";
  });

  lista.appendChild(novaDemanda);
  salvarDemandas();
}

// Salva todas as demandas no localStorage
function salvarDemandas() {
  const todasAsDemandas = Array.from(document.querySelectorAll(".caixa-demanda")).map(demanda => ({
    titulo: demanda.querySelector(".titulo-demanda").textContent,
    descricao: demanda.querySelector(".descricao-demanda").textContent
  }));
  localStorage.setItem("demandas", JSON.stringify(todasAsDemandas));
}

// Fecha visualização ou modal de criação ao clicar fora
overlay.addEventListener("click", () => {
  visualizacao.style.display = "none";
  modal.style.display = "none";
  overlay.style.display = "none";
});
