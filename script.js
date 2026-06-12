const DEFAULTS = {
  nome: "Para nossa querida Iris",
  mensagem: "Que esse carinho chegue como um abraco: simples, bonito e cheio de amor.",
  foto:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23ff8ab3'/%3E%3Cstop offset='1' stop-color='%23d91e64'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='800' fill='url(%23g)'/%3E%3Ccircle cx='400' cy='310' r='118' fill='%23fff2f7' opacity='.88'/%3E%3Cpath d='M186 690c36-154 139-236 214-236s178 82 214 236' fill='%23fff2f7' opacity='.88'/%3E%3C/svg%3E",
};

const params = new URLSearchParams(window.location.search);

const personName = document.querySelector("#personName");
const messageText = document.querySelector("#messageText");
const personPhoto = document.querySelector("#personPhoto");
const openButton = document.querySelector("#openButton");
const intro = document.querySelector("#intro");
const surprise = document.querySelector("#surprise");
const hearts = document.querySelector(".hearts");
const bgMusic = document.querySelector("#bgMusic");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

const fotos = [
  {
  foto: "imagens/fotoiris1.jpeg",
  mensagem: "Existem pessoas que passam pela nossas vida e se tornam eternas. E você, Iris, é uma delas! Seu sorriso tem o poder de acalmar, acolher e abraçar 💕"
},
{
  foto: "imagens/fotoiris2.jpeg",
  mensagem: "Iris, você é linda, sua alma esboça amor. Sua beleza vai muito além do que os olhos veem. Ela está na sua delicadeza, no seu coração e na forma como trata todos independentemente de tudo com muito carinho..",
},
{
  foto: "imagens/fotoiris3.jpeg",
  mensagem: "Seu sorriso, sua alegria ilumina qualquer lugar. Você tem um jeito único de transformar nossas vidas com seu amor e cuidado. Somos gratas por cada momento que compartilhamos e por ter você em nossas vidas 💖",
},
{
  foto: "imagens/fotoiris4.jpeg",
  mensagem: "Entre tantas flores bonitas, o que mais chama atenção é a pessoa incrível que está diante delas. Seu coração floresce amor por onde passa.🌻",
},
{
  foto: "imagens/fotoiris5.jpeg",
  mensagem: "Iris, saiba que você é amada por muitos, e que sua presença é um enorme presente para todas nós. Que essa data seja resignificada e que você possa sentir todo o carinho que temos por você. Obrigada por ser nossa parceira de conversas, choros, carinhos e acima de tudo, apoio. Te amamos muuuuuuito! ❤️",
},
];

let fotoAtual = 0;
let animationTimer;
let isTransitioning = false;

const fotoParam = params.get("foto");
const mensagemParam = params.get("mensagem");
const albumFotos = fotoParam
  ? [{ foto: fotoParam, mensagem: mensagemParam || DEFAULTS.mensagem }]
  : fotos;

personName.textContent = params.get("nome") || DEFAULTS.nome;

function atualizarAlbum() {
  const itemAtual = albumFotos[fotoAtual] || {
    foto: DEFAULTS.foto,
    mensagem: DEFAULTS.mensagem,
  };

  personPhoto.src = itemAtual.foto;
  messageText.textContent = mensagemParam || itemAtual.mensagem;
}

atualizarAlbum();

albumFotos.forEach((item) => {
  const image = new Image();
  image.src = item.foto;
});

function trocarFoto(direction) {
  if (albumFotos.length <= 1 || isTransitioning) return;

  isTransitioning = true;
  fotoAtual = (fotoAtual + direction + albumFotos.length) % albumFotos.length;
  personPhoto.classList.add("is-fading");

  window.setTimeout(() => {
    atualizarAlbum();
    personPhoto.classList.remove("is-fading");
    personPhoto.classList.add("is-changing");
    window.clearTimeout(animationTimer);
    animationTimer = window.setTimeout(() => {
      personPhoto.classList.remove("is-changing");
      isTransitioning = false;
    }, 900);
  }, 320);
}

if (albumFotos.length <= 1) {
  prevBtn.hidden = true;
  nextBtn.hidden = true;
}

function createFloatingHeart(index) {
  const heart = document.createElement("span");
  const size = 10 + Math.random() * 24;
  const duration = 6 + Math.random() * 6;
  const delay = index * -0.55;
  const drift = -80 + Math.random() * 160;

  heart.className = "floating-heart";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.setProperty("--size", `${size}px`);
  heart.style.setProperty("--duration", `${duration}s`);
  heart.style.setProperty("--delay", `${delay}s`);
  heart.style.setProperty("--drift", `${drift}px`);
  heart.style.setProperty("--alpha", `${0.28 + Math.random() * 0.5}`);

  hearts.appendChild(heart);
}

Array.from({ length: 30 }, (_, index) => createFloatingHeart(index));

function tocarMusica() {
  if (!bgMusic) return;

  bgMusic.volume = 0.65;
  bgMusic.play().catch(() => {});
}

openButton.addEventListener("click", () => {
  tocarMusica();
  intro.classList.add("is-hidden");
  surprise.classList.add("is-visible");

  window.setTimeout(() => {
    surprise.classList.add("is-open");
    personPhoto.classList.add("is-changing");
  }, 450);
});

prevBtn.addEventListener("click", () => trocarFoto(-1));
nextBtn.addEventListener("click", () => trocarFoto(1));

