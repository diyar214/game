"use strict";

const playerElement0 = document.querySelector(".player--0");
const playerElement1 = document.querySelector(".player--1");

const scoreElement0 = document.getElementById("score--0");
const scoreElement1 = document.getElementById("score--1");
const currentElement0 = document.getElementById("current--0");
const currentElement1 = document.getElementById("current--1");
const diceElement = document.querySelector(".dice");

const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");

let finalPlayersScore, currentScore, activePlayer, isPlaying;

const init = function () {
  finalPlayersScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;
  currentElement0.textContent = 0;
  currentElement1.textContent = 0;

  diceElement.classList.add("hidden");
  playerElement0.classList.remove("player--winner");
  playerElement1.classList.remove("player--winner");
  playerElement0.classList.add("player--active");
  playerElement1.classList.remove("player--active");
};

init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  playerElement0.classList.toggle("player--active");
  playerElement1.classList.toggle("player--active");
};

diceElement.classList.add("hidden");

btnRollDice.addEventListener("click", function () {
  if (isPlaying) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    diceElement.classList.remove("hidden");
    diceElement.src = `./imgs/dice-${diceNum}.png`;

    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    finalPlayersScore[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      finalPlayersScore[activePlayer];

    if (finalPlayersScore[activePlayer] >= 100) {
      isPlaying = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener("click", init);
