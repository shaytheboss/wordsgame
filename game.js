let timeLeft = 30;
let word = '';
let score = 0;
let timerInterval, letterInterval;

// Predefined list of valid words
const validWords = ['CAT', 'DOG', 'BAT', 'CUP', 'HAT', 'MAT', 'TABLE', 'CHAIR', 'HOUSE', 'MOON', 'STAR', 'PLANET'];

// Start the timer and update every second
function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Function to create falling letters
function createFallingLetter() {
    const letterElement = document.createElement('div');
    letterElement.className = 'letter';
    letterElement.innerText = lettersForToday[Math.floor(Math.random() * lettersForToday.length)];
    letterElement.style.left = (25 + Math.random() * 50) + '%'; // Restrict to the middle 50% of the screen
    letterElement.style.top = '-50px';
    document.getElementById('gameArea').appendChild(letterElement);
    
    // Adjust the falling speed
    let fallInterval = setInterval(() => {
        const currentTop = parseInt(letterElement.style.top);
        if (currentTop < window.innerHeight - 150) {
            letterElement.style.top = currentTop + 3 + 'px'; // Slower fall speed
        } else {
            clearInterval(fallInterval);
            letterElement.remove();
        }
    }, 30); // Slower interval update for smoother and slower falling effect

    // Add event listener to capture the letter
    letterElement.addEventListener('click', () => {
        word += letterElement.innerText;
        document.getElementById('word').innerText = `Your word: ${word}`;
        letterElement.remove();
        clearInterval(fallInterval);
    });
}

// Start the game and reset word and score
function startGame() {
    // Reset the game state
    word = '';
    score = 0;
    timeLeft = 30;
    document.getElementById('word').innerText = 'Your word: ';
    document.getElementById('scoreboard').innerText = 'Score: 0';
    document.getElementById('newGameButton').style.display = 'none'; // Hide the New Game button
    startTimer();
    
    // Create letters every 1 second
    letterInterval = setInterval(createFallingLetter, 1000);
    setTimeout(() => clearInterval(letterInterval), 30000);
}

// Function to validate if the word is correct (based on local list)
function validateWord(word) {
    return validWords.includes(word.toUpperCase());
}

// End game and calculate score based on the word formed
function endGame() {
    clearInterval(letterInterval);
    if (validateWord(word)) {
        score = word.length; // Score based on word length
    } else {
        score = 0; // No points if the word is invalid
    }
    document.getElementById('scoreboard').innerText = `Score: ${score}`;
    alert(`Game Over! Your word is: ${word}. Your score is: ${score}`);
    
    // Show the New Game button when the game ends
    document.getElementById('newGameButton').style.display = 'block';
}

// Start the game on page load
window.onload = startGame;
