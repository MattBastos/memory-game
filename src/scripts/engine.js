const state = {
  view: {
    resetBtn: document.getElementById("reset-btn"),
  },
};

const { view } = state;

const resetGame = () => location.reload();

view.resetBtn.addEventListener("click", resetGame);
