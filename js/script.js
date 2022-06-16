var wordsList = ['alura', 'ahorcado', 'oracle', 'html', 'css', 'javascript'];
const word = document.getElementById('word');
const invalid = document.getElementById('invalid');
const invalidLettersText = document.querySelector('#invalid p');
const popup = document.getElementById('popup');
const finalMessage = document.getElementById('final-message');
const message = document.getElementById('message');
const playButton = document.getElementById('play');
const notification = document.getElementById('notification');
const bodyParts = document.getElementsByClassName('body-part');


// Word that is selected to play
let selectedWord = null;
// Stores the count of no.of invalidly typed letters
let invalidCount = 0;
// Correct letters typed by the player
const validLetters = [];
// invalid letters typed by the player
const invalidLetters = [];

// Select a word randomly from wordsList and initialize in the DOM
function randomWord() {
  selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  for (let i = 0; i < selectedWord.length; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('letter');
    word.append(listItem);
  }
}

// Displays an notification sliding from the bottom
function displayNotification() {
  notification.classList.add('visible');

  setTimeout(() => {
    notification.classList.remove('visible');
  }, 2400);
}

// Update the figure when invalid letters typed
function updateFigure() {
  try {
    bodyParts[invalidCount].style.display = 'block';
    invalidCount++;
  } catch (error) {}
}

// When player wins
function playerWins() {
  setTimeout(() => {
    popup.classList.add('visible');
    finalMessage.classList.add('visible');
    message.textContent = 'Hurrah! You won.';
  }, 400);
}

// When player looses
function playerLose() {
  setTimeout(() => {
    popup.classList.add('visible');
    finalMessage.classList.add('visible');
    message.textContent = `Oops! You lost. The right word is "${selectedWord}"`;
  }, 400);
}

// Check if typed key is part of the selected word and update in the DOM if required
function check(ok) {
  const letterElements = document.querySelectorAll('.word .letter');
  const character = ok.key;

  // Handle keyboard okents
  if (!popup.classList.contains('visible') && !notification.classList.contains('visible') && ok.keyCode >= 65 && ok.keyCode <= 90) {
    if (selectedWord.includes(character)) {
      if (validLetters.includes(character)) {
        displayNotification();
      } else {
        validLetters.push(character);
        const indexes = [];
        [...selectedWord].forEach((value, index) => {
          if (value === character) {
            indexes.push(index);
          }
        });
        indexes.forEach((value) => {
          letterElements[value].textContent = character;
        });
      }
    } else {
      if (invalidLetters.includes(character)) {
        displayNotification();
      } else {
        invalidLetters.push(character);
        if (!invalid.classList.contains('visible')) {
          invalid.classList.add('visible');
        }
        invalidLettersText.textContent = `${invalidLetters.join(', ')}`;
        updateFigure();
      }
    }
  }

  // Create a word from all letter items
  let formedWord = '';
  letterElements.forEach((value) => {
    formedWord += value.textContent;
  });

  // Check if created word is correct
  if (formedWord === selectedWord) {
    playerWins();
  }

  // Check if man was hung
  if (invalidCount >= 6) {
    playerLose();
  }
}

// Reset all variables and start a new game
function startNewGame() {
  selectedWord = null;
  invalidCount = 0;
  validLetters.splice(0);
  invalidLetters.splice(0);
  word.innerHTML = '';
  Array.from(bodyParts).forEach((value) => {
    value.style.display = 'none';
  });
  invalid.classList.remove('visible');
  popup.classList.remove('visible');
  finalMessage.classList.remove('visible');
  randomWord();
}

// Start the game
randomWord();

// okent Listeners
window.addEventListener('keyup', check);
playButton.addEventListener('click', startNewGame);
