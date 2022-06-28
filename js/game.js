var wordsList = ['ALURA', 'AHORCADO', 'ORACLE', 'HTML', 'CSS', 'JAVASCRIPT'];
var secondContainer = document.getElementById('second-container');
var btnSection = document.getElementById('btn-section3');
var textAdd = document.getElementById('add-text-section');
const word = document.getElementById('word');
const invalid = document.getElementById('invalid');
const invalidLettersText = document.querySelector('#invalid p');
const popup = document.getElementById('popup');
const finalMessage = document.getElementById('final-message');
const message = document.getElementById('message');
const playButton = document.getElementById('play');
const notification = document.getElementById('notification');
const bodyParts = document.getElementsByClassName('body-part');
let selectedWord = null;
let invalidCount = 0;
const validLetters = [];
const invalidLetters = [];

function randomWord() {
  selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)].toUpperCase();
  for (let i = 0; i < selectedWord.length; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('letter');
    word.append(listItem);
  }
}

function saveWord() {
    addWord = document.querySelector('#textInput').value;
    newSecretWord = addWord.toUpperCase();
    wordsList.push(newSecretWord);
    console.log(wordsList);
    document.getElementById('second-container').style.display = 'block'
    document.getElementById('btn-section3').style.display = 'block'
    document.getElementById('add-text-section').style.display = 'none'
  }

function displayNotification() {
  notification.classList.add('visible');

  setTimeout(() => {
    notification.classList.remove('visible');
  }, 2400);
}

function updateFigure() {
  try {
    bodyParts[invalidCount].style.display = 'block';
    invalidCount++;
  } catch (error) {}
}

function playerWins() {
  setTimeout(() => {
    popup.classList.add('visible');
    finalMessage.classList.add('visible');
    message.textContent = 'Que bien! has Ganado.';
  }, 400);
}

function playerLose() {
  setTimeout(() => {
    popup.classList.add('visible');
    finalMessage.classList.add('visible');
    message.textContent = `Ups! Perdiste. La palabra es "${selectedWord}"`;
  }, 400);
}

function check(ok) {
  const letterElements = document.querySelectorAll('.word .letter');
  const character = ok.key.toUpperCase();

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

  let formedWord = '';
  letterElements.forEach((value) => {
    formedWord += value.textContent;
  });

  if (formedWord === selectedWord) {
    playerWins();
  }

  if (invalidCount >= 6) {
    playerLose();
  }
}

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

window.addEventListener('keyup', check);
playButton.addEventListener('click', startNewGame);