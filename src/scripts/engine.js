const heroes = {
  ana: {
    voicelines: [
      "src/audios/ana/hello-1.ogg",
      "src/audios/ana/hello-2.ogg",
      "src/audios/ana/hello-3.ogg",
    ],
    image: "src/assets/ana.png",
  },
  cassidy: {
    voicelines: [
      "src/audios/cassidy/hello-1.ogg",
      "src/audios/cassidy/hello-2.ogg",
      "src/audios/cassidy/hello-3.ogg",
    ],
    image: "src/assets/cassidy.png",
  },
  genji: {
    voicelines: [
      "src/audios/genji/hello-1.ogg",
      "src/audios/genji/hello-2.ogg",
      "src/audios/genji/hello-3.ogg",
    ],
    image: "src/assets/genji.png",
  },
  hanzo: {
    voicelines: [
      "src/audios/hanzo/hello-1.ogg",
      "src/audios/hanzo/hello-2.ogg",
      "src/audios/hanzo/hello-3.ogg",
    ],
    image: "src/assets/hanzo.png",
  },
  junkerQueen: {
    voicelines: [
      "src/audios/junkerQueen/hello-1.ogg",
      "src/audios/junkerQueen/hello-2.ogg",
      "src/audios/junkerQueen/hello-3.ogg",
    ],
    image: "src/assets/junkerQueen.png",
  },
  kiriko: {
    voicelines: [
      "src/audios/kiriko/hello-1.ogg",
      "src/audios/kiriko/hello-2.ogg",
    ],
    image: "src/assets/kiriko.png",
  },
  tracer: {
    voicelines: [
      "src/audios/tracer/hello-1.ogg",
      "src/audios/tracer/hello-2.ogg",
      "src/audios/tracer/hello-3.ogg",
    ],
    image: "src/assets/tracer.png",
  },
  zarya: {
    voicelines: [
      "src/audios/zarya/hello-1.ogg",
      "src/audios/zarya/hello-2.ogg",
      "src/audios/zarya/hello-3.ogg",
    ],
    image: "src/assets/zarya.png",
  },
};

const state = {
  view: {
    game: document.querySelector(".game"),
    heroCards: [
      heroes.ana.image,
      heroes.ana.image,
      heroes.cassidy.image,
      heroes.cassidy.image,
      heroes.genji.image,
      heroes.genji.image,
      heroes.hanzo.image,
      heroes.hanzo.image,
      heroes.junkerQueen.image,
      heroes.junkerQueen.image,
      heroes.kiriko.image,
      heroes.kiriko.image,
      heroes.tracer.image,
      heroes.tracer.image,
      heroes.zarya.image,
      heroes.zarya.image,
    ],
    openCards: [],
    resetBtn: document.getElementById("reset-btn"),
    gameResult: document.getElementById("game-result"),
  },
};

const { view } = state;

let shuffledCards = view.heroCards.sort(() => (Math.random() > 0.5 ? 2 : -1));

let consecutiveClicks = 0;

const isClickLimitReached = () => consecutiveClicks >= 2;

const isCardInOpenCards = (heroCard) => view.openCards.includes(heroCard);

const getHeroNameFromImageSource = (imageSource) => {
  const startIndex = imageSource.indexOf("assets/") + "assets/".length;
  const endIndex = imageSource.lastIndexOf(".");

  return imageSource.slice(startIndex, endIndex);
};

const getRandomHeroVoiceline = (heroName) => {
  const voicelines = heroes[heroName].voicelines;

  if (voicelines) {
    const randomVoicelineIndex = Math.floor(Math.random() * voicelines.length);

    return voicelines[randomVoicelineIndex];
  }
};

const playHeroVoiceline = (heroName) => {
  const heroVoiceLine = getRandomHeroVoiceline(heroName);

  const audio = new Audio(heroVoiceLine);
  audio.volume = 0.3;
  audio.play();
};

const playGameOverSoundtrack = (soundtrack) => {
  let audio = new Audio(`./src/audios/${soundtrack}`);

  audio.volume = 0.1;
  audio.play();
};

const showGameResult = () => {
  if (
    document.querySelectorAll(".match-card").length === view.heroCards.length
  ) {
    view.gameResult.classList.add("show");
    playGameOverSoundtrack("vitory-theme.mp3");
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

    const heroName = getHeroNameFromImageSource(firstClickedCard);
    playHeroVoiceline(heroName);
  } else {
    removeOpenCardClass();
  }

  view.openCards = [];

  showGameResult();
};

const addCardToOpenCards = (heroCard) => {
  heroCard.classList.add("open-card");
  view.openCards.push(heroCard);
  consecutiveClicks += 1;
};

const handleClickCard = (heroCard) => {
  if (isClickLimitReached()) return;

  if (view.openCards.length < 2) {
    if (isCardInOpenCards(heroCard)) return;

    addCardToOpenCards(heroCard);
  }

  if (view.openCards.length === 2)
    setTimeout(() => {
      checkMatch();
      consecutiveClicks = 0;
    }, 500);
};

const createHeroCardElement = () => {
  let heroCard = document.createElement("div");
  let heroImage = document.createElement("img");

  return { heroCard, heroImage };
};

const addHeroImageAttributes = (heroImage, card) => {
  heroImage.src = card;
  heroImage.className = "hero-image";
};

const addHeroCardAttributes = (heroCard, heroImage) => {
  heroCard.className = "card";
  heroCard.appendChild(heroImage);
};

view.heroCards.forEach((card) => {
  let { heroCard, heroImage } = createHeroCardElement();

  addHeroImageAttributes(heroImage, card);
  addHeroCardAttributes(heroCard, heroImage);

  heroCard.onclick = () => handleClickCard(heroCard);

  view.game.appendChild(heroCard);
});

const resetGame = () => location.reload();

view.resetBtn.addEventListener("click", resetGame);
