const heroImageSources = {
  junkerQueen: "../assets/junker-queen.png",
  zarya: "../assets/zarya.png",
  hanzo: "../assets/hanzo.png",
  genji: "../assets/genji.png",
  tracer: "../assets/tracer.png",
  cassidy: "../assets/cassidy.png",
  kiriko: "../assets/kiriko.png",
  ana: "../assets/ana.png",
};

const { junkerQueen, zarya, hanzo, genji, tracer, cassidy, kiriko, ana } =
  heroImageSources;

const state = {
  view: {
    heroCards: [
      junkerQueen,
      junkerQueen,
      zarya,
      zarya,
      hanzo,
      hanzo,
      genji,
      genji,
      tracer,
      tracer,
      cassidy,
      cassidy,
      kiriko,
      kiriko,
      ana,
      ana,
    ],
    openCards: [],
    resetBtn: document.getElementById("reset-btn"),
  },
};

const { view } = state;

let shuffledCards = view.heroCards.sort(() => (Math.random() > 0.5 ? 2 : -1));

const resetGame = () => location.reload();

view.resetBtn.addEventListener("click", resetGame);
