'use strict';
//selecting elements
let name0 = document.getElementById('name--0');
let name1 = document.getElementById('name--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let diceEl = document.querySelector('.dice');
let rollBtn = document.querySelector('.btn--roll');
let holdBtn = document.querySelector('.btn--hold');
let newBtn = document.querySelector('.btn--new');
let playerSection0 = document.querySelector('.player--0');
let playerSection1 = document.querySelector('.player--1');
let currentSection0 = document.getElementById('current--0');
let currentSection1 = document.getElementById('current--1');

//state variables
let currentScore0;
let currentScore1;
let totalScore0;
let totalScore1;
let activePlayer;
let gameStatus;

//starting conditions
const resetGame = function () {
  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';
  currentScore0 = 0;
  currentScore1 = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  activePlayer = 0;
  gameStatus = 1;
  score0El.textContent = totalScore0;
  score1El.textContent = totalScore1;
  currentSection0.textContent = currentScore0;
  currentSection1.textContent = currentScore1;
  diceEl.classList.add('hidden');
};

resetGame(); //intializing game

const switchPlayer = function () {
  if (playerSection0.classList.contains('player--active')) {
    playerSection0.classList.toggle('player--active');
    playerSection1.classList.toggle('player--active');
    currentScore0 = 0;
    currentSection0.textContent = 0;
    activePlayer = 1;
  } else {
    playerSection1.classList.toggle('player--active');
    playerSection0.classList.toggle('player--active');
    currentScore1 = 0;
    currentSection1.textContent = 0;
    activePlayer = 0;
  }
};

const holdScore = function () {
  if (gameStatus != 1) {
    alert('Game has ended, try new game!');
  } else {
    if (activePlayer == 0) {
      totalScore0 += currentScore0;
      score0El.textContent = totalScore0;
    } else {
      totalScore1 += currentScore1;
      score1El.textContent = totalScore1;
    }
    switchPlayer();
  }
};

const rollDice = function () {
  if (gameStatus != 1) {
    alert('Game has ended, try new game!');
  } else {
    let num = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${num}.png`;
    diceEl.classList.remove('hidden');
    if (num == 1) {
      switchPlayer();
    } else {
      if (activePlayer == 0) {
        currentScore0 += num;
        currentSection0.textContent = currentScore0;
        if (totalScore0 + currentScore0 >= 30) {
          name0.textContent = '🎊You Win🎉';
          gameStatus = 0;
        }
      } else {
        currentScore1 += num;
        currentSection1.textContent = currentScore1;
        if (totalScore1 + currentScore1 >= 30) {
          name1.textContent = '🎊You Win🎉';
          gameStatus = 0;
        }
      }
    }
  }
};

rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);
newBtn.addEventListener('click', resetGame);
