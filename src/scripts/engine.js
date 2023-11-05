const heroImageSources = {
  junkerQueen: "src/assets/junker-queen.png",
  zarya: "src/assets/zarya.png",
  hanzo: "src/assets/hanzo.png",
  genji: "src/assets/genji.png",
  tracer: "src/assets/tracer.png",
  cassidy: "src/assets/cassidy.png",
  kiriko: "src/assets/kiriko.png",
  ana: "src/assets/ana.png",
};

const { junkerQueen, zarya, hanzo, genji, tracer, cassidy, kiriko, ana } =
  heroImageSources;

const state = {
  view: {
    game: document.querySelector(".game"),
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

const showGameResult = () => {
  if (
    document.querySelectorAll(".match-card").length === view.heroCards.length
  ) {
    console.log("Win");
  }
};

const addMatchCardClass = () => {
  view.openCards[0].classList.add("match-card");
  view.openCards[1].classList.add("match-card");
};

const removeOpenCardClass = () => {
  view.openCards[0].classList.remove("open-card");
  view.openCards[1].classList.remove("open-card");
};

const checkMatch = () => {
  const firstClickedCard = view.openCards[0].firstChild.src;
  const secondClickedCard = view.openCards[1].firstChild.src;

  if (firstClickedCard === secondClickedCard) {
    addMatchCardClass();
  } else {
    removeOpenCardClass();
  }

  view.openCards = [];

  showGameResult();
};

const handleClickCard = (heroCard) => {
  if (view.openCards.length < 2) {
    heroCard.classList.add("open-card");
    view.openCards.push(heroCard);
  }

  if (view.openCards.length === 2) setTimeout(checkMatch, 500);
};

view.heroCards.forEach((card) => {
  let heroCard = document.createElement("div");
  let heroImage = document.createElement("img");

  heroImage.src = card;
  heroImage.className = "hero-image";

  heroCard.className = "card";
  heroCard.appendChild(heroImage);
  heroCard.onclick = () => handleClickCard(heroCard);

  view.game.appendChild(heroCard);
});

const resetGame = () => location.reload();

view.resetBtn.addEventListener("click", resetGame);
