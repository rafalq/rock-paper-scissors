let playerScore = 0;
let computerScore = 0;
let drawScore = 0;
let currentRound = 1;
let maxRounds = 5;
let gameActive = true;
let roundHistory = [];
let previousComputerChoice = null;

let userGuesses = [];
let computerGuesses = [];
let roundResults = [];

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  let availableChoices = choices.filter(
    (choice) => choice !== previousComputerChoice
  );

  if (availableChoices.length === 0) {
    availableChoices = choices;
  }

  const randomIndex = Math.floor(Math.random() * availableChoices.length);
  const choice = availableChoices[randomIndex];
  previousComputerChoice = choice;
  return choice;
}

function getChoiceEmoji(choice) {
  if (choice === "rock") return "✊";
  if (choice === "paper") return "✋";
  if (choice === "scissors") return "✌️";
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "draw";

  if (playerChoice === "rock") {
    return computerChoice === "scissors" ? "player" : "computer";
  }
  if (playerChoice === "paper") {
    return computerChoice === "rock" ? "player" : "computer";
  }
  if (playerChoice === "scissors") {
    return computerChoice === "paper" ? "player" : "computer";
  }
}

function getExplanation(winner, playerChoice, computerChoice) {
  if (winner === "draw") return "Same choice!";

  const winningChoice = winner === "player" ? playerChoice : computerChoice;
  const losingChoice = winner === "player" ? computerChoice : playerChoice;

  if (winningChoice === "rock") return "Rock crushes Scissors!";
  if (winningChoice === "paper") return "Paper covers Rock!";
  if (winningChoice === "scissors") return "Scissors cuts Paper!";
}

function updateDisplay(playerChoice, computerChoice, winner) {
  const resultMessage = document.getElementById("resultMessage");
  const resultDetails = document.getElementById("resultDetails");
  const resultExplanation = document.getElementById("resultExplanation");
  const resultEmoji = document.getElementById("resultEmoji");

  const playerEmoji = getChoiceEmoji(playerChoice);
  const computerEmoji = getChoiceEmoji(computerChoice);

  resultDetails.textContent = `You: ${playerEmoji} ${playerChoice.toUpperCase()} ⚡ Computer: ${computerEmoji} ${computerChoice.toUpperCase()}`;
  resultExplanation.textContent = getExplanation(
    winner,
    playerChoice,
    computerChoice
  );

  if (winner === "player") {
    resultMessage.textContent = "🎉 You Win This Round!";
    resultMessage.style.color = "#10b981";
    resultEmoji.textContent = "🏆";
  } else if (winner === "computer") {
    resultMessage.textContent = "😞 Computer Wins This Round!";
    resultMessage.style.color = "#ef4444";
    resultEmoji.textContent = "💻";
  } else {
    resultMessage.textContent = "🤝 It's a Draw!";
    resultMessage.style.color = "#f59e0b";
    resultEmoji.textContent = "⚖️";
  }
}

function updateScores() {
  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("computerScore").textContent = computerScore;
  document.getElementById("drawScore").textContent = drawScore;
}

function updateRoundCounter() {
  document.getElementById(
    "roundCounter"
  ).textContent = `Round ${currentRound} of ${maxRounds}`;
}

function addToHistory(round, playerChoice, computerChoice, winner) {
  const historyList = document.getElementById("historyList");
  const historyItem = document.createElement("div");
  historyItem.className = "history-item";

  const result =
    winner === "player"
      ? "✅ You won"
      : winner === "computer"
      ? "❌ Computer won"
      : "➖ Draw";

  historyItem.textContent = `Round ${round}: ${getChoiceEmoji(
    playerChoice
  )} vs ${getChoiceEmoji(computerChoice)} - ${result}`;
  historyList.appendChild(historyItem);

  document.getElementById("roundHistory").style.display = "block";
}

function disableButtons() {
  document.getElementById("rockBtn").disabled = true;
  document.getElementById("paperBtn").disabled = true;
  document.getElementById("scissorsBtn").disabled = true;
}

function enableButtons() {
  document.getElementById("rockBtn").disabled = false;
  document.getElementById("paperBtn").disabled = false;
  document.getElementById("scissorsBtn").disabled = false;
}

function displayUserGuesses() {
  const displayDiv = document.getElementById("userGuessesDisplay");
  displayDiv.className = "user-guesses-section";

  const guessesWithEmojis = userGuesses.map((guess, index) => {
    return {
      round: index + 1,
      choice: guess,
      emoji: getChoiceEmoji(guess),
    };
  });

  let guessesList = "";

  guessesWithEmojis.forEach((item) => {
    guessesList += `
            <div class="guess-item">
              <span class="guess-emoji">${item.emoji}</span>
              <span>Round ${
                item.round
              }: You chose <strong>${item.choice.toUpperCase()}</strong></span>
            </div>
          `;
  });

  displayDiv.innerHTML = `
          <h3>📊 Your Guesses Throughout The Game</h3>
          <div class="guesses-list">
            ${guessesList}
          </div>
        `;
}

function showFinalResult() {
  const finalResult = document.getElementById("finalResult");
  finalResult.className = "final-result";

  let message = "";

  if (playerScore > computerScore) {
    message = "CONGRATULATIONS! YOU WON THE GAME!";
  } else if (computerScore > playerScore) {
    message = "Computer won the game. Better luck next time!";
  } else {
    message = "🤝 It's a tie overall!";
  }

  finalResult.innerHTML = `
          <h2 style="text-align: center;">${message}</h2>
          <p style="margin-top: 10px; font-size: 1.1em; text-align: center;">
            Final Score - You: ${playerScore} | Computer: ${computerScore} | Draws: ${drawScore}
          </p>
          <p style="margin-top: 10px; color: #667eea; font-weight: bold; text-align: center;">
            You played ${userGuesses.length} rounds total!
          </p>
        `;

  displayUserGuesses();
}

function playGame(playerChoice) {
  if (!gameActive) return;

  userGuesses.push(playerChoice);

  const computerChoice = getComputerChoice();
  computerGuesses.push(computerChoice);

  const winner = determineWinner(playerChoice, computerChoice);

  roundResults.push(winner);

  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  } else {
    drawScore++;
  }

  updateDisplay(playerChoice, computerChoice, winner);
  updateScores();
  addToHistory(currentRound, playerChoice, computerChoice, winner);

  if (currentRound >= maxRounds) {
    gameActive = false;
    disableButtons();
    showFinalResult();
  } else {
    currentRound++;
    updateRoundCounter();
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  drawScore = 0;
  currentRound = 1;
  gameActive = true;
  previousComputerChoice = null;
  roundHistory = [];

  userGuesses = [];
  computerGuesses = [];
  roundResults = [];

  updateScores();
  updateRoundCounter();
  enableButtons();

  document.getElementById("resultMessage").textContent = "Make your choice!";
  document.getElementById("resultMessage").style.color = "#333";
  document.getElementById("resultDetails").textContent = "";
  document.getElementById("resultEmoji").textContent = "";
  document.getElementById("resultExplanation").textContent = "";
  document.getElementById("finalResult").innerHTML = "";
  document.getElementById("finalResult").classList.remove("final-result");
  document.getElementById("userGuessesDisplay").innerHTML = "";
  document
    .getElementById("userGuessesDisplay")
    .classList.remove("user-guesses-section");
  document.getElementById("historyList").innerHTML = "";
  document.getElementById("roundHistory").style.display = "none";
}
