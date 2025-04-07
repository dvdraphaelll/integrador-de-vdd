const botaoAbrir = document.getElementById("abrir-demanda");
const modal = document.getElementById("minha-demanda");
const overlay = document.getElementById("overlay");
const botaoConcluido = document.getElementById("concluido");

botaoAbrir.addEventListener("click", () => {
  modal.style.display = "flex";
  overlay.style.display = "block"; // escurece o fundo
});

botaoConcluido.addEventListener("click", () => {
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();

  if (titulo !== '' && descricao !== '') {
    console.log("Título:", titulo);
    console.log("Descrição:", descricao);

    // Cria a nova demanda
    const novaDemanda = document.createElement("div");
    novaDemanda.classList.add("caixa-demanda");
    novaDemanda.innerHTML = `
  <h3 class="titulo-demanda">${titulo}</h3>
  <div class="descricao-container">
    <p class="descricao-demanda">${descricao}</p>
  </div>
`;

    // Adiciona na lista ao lado do botão
    const lista = document.getElementById("listaDemandas");
    lista.appendChild(novaDemanda);
  }

  // Fecha o modal e limpa campos
  modal.style.display = "none";
  overlay.style.display = "none";
  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
});
