'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentEl0 = document.querySelector('#current--0');
const currentEl1 = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// //Set Initial value
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
//Rolling dice functionality
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener(
  'click',
  function () {
    if (playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;

      //display dice
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;
      console.log(dice);

      //check for rolled 1: if true, switch to next player
      if (dice !== 1) {
        //add to the currentscore
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        //switch to next player
        switchPlayer();
      }
    }
  }
  //generating a random dice roll
);

btnHold.addEventListener(
  'click',
  function () {
    if (playing) {
      scores[activePlayer] += currentScore;
      //scores[1] = scores[1] +=currentScore
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      //finish the game.

      if (scores[activePlayer] >= 100) {
        playing = false;
        diceEl.classList.add('hidden');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
      } else {
        switchPlayer();
      }

      //switch to next player
      switchPlayer();
    }
  }
  // add current score to active players.
);

btnNew.addEventListener('click', init);
