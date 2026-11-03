const TELEFONE = "5527988862107";
let qtdMesas = 0;
let corSelecionada = "Nenhuma selecionada";

const cores = [
  { nome: "Branca", hex: "#FFFFFF" },
  { nome: "Off-White / Palha", hex: "#F5F5DC" },
  { nome: "Preta", hex: "#000000" },
  { nome: "Azul Bebê", hex: "#87CEEB" },
  { nome: "Azul Royal", hex: "#4169E1" },
  { nome: "Azul Marinho", hex: "#000080" },
  { nome: "Rosa Bebê", hex: "#FFB6C1" },
  { nome: "Rosa Chiclete", hex: "#FF1493" },
  { nome: "Rosa Pink", hex: "#E0115F" },
  { nome: "Lilás", hex: "#E6E6FA" },
  { nome: "Vinho / Marsala", hex: "#722F37" },
  { nome: "Vermelha", hex: "#FF0000" },
  { nome: "Amarela", hex: "#FFD700" },
  { nome: "Verde Bandeira", hex: "#008000" }
];

// Gerar lista de cores de forma acessível no carregamento
const catalog = document.getElementById("catalog");
cores.forEach(c => {
  const div = document.createElement("div");
  div.className = "color-strip";
  
  div.innerHTML = `
    <div class="color-info">
      <div class="color-preview" style="background: ${c.hex};"></div>
      <span class="color-name">Toalha ${c.nome}</span>
    </div>
    <span class="check"></span>
  `;
  
  div.addEventListener("click", () => selecionarCor(div, c.nome));
  catalog.appendChild(div);
});

function alterarQtd(val) {
  qtdMesas = Math.max(0, qtdMesas + val);
  document.getElementById("qtd-mesas").innerText = qtdMesas;
}

function selecionarCor(elemento, nome) {
  document.querySelectorAll(".color-strip").forEach(el => el.classList.remove("selected"));
  elemento.classList.add("selected");
  corSelecionada = nome;
}

function enviarPedido() {
  const endereco = document.getElementById("endereco").value.trim();

  if (qtdMesas === 0 && corSelecionada === "Nenhuma selecionada") {
    alert("Por favor, selecione ao menos os jogos de mesa ou a cor da toalha!");
    return;
  }

  let texto = `Olá! Gostaria de um orçamento:\n\n`;
  texto += `🪑 *Jogos de Mesa:* ${qtdMesas}\n`;
  texto += `🎨 *Cor da Toalha:* ${corSelecionada}\n`;
  
  if (endereco) {
    texto += `📍 *Endereço de Entrega:* ${endereco}\n`;
  } else {
    texto += `📍 *Endereço de Entrega:* (Não informado)\n`;
  }

  const link = `https://wa.me{TELEFONE}?text=${encodeURIComponent(texto)}`;
  window.open(link, "_blank");
}

// Conecta os botões e eventos do HTML sem usar atributos inline
document.getElementById("btn-menos").addEventListener("click", () => alterarQtd(-1));
document.getElementById("btn-mais").addEventListener("click", () => alterarQtd(1));
document.getElementById("btn-enviar").addEventListener("click", enviarPedido);
