let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Function to get emoji for choice
function getChoiceEmoji(choice) {
  if (choice === "rock") {
    return "✊";
  }
  if (choice === "paper") {
    return "✋";
  }
  if (choice === "scissors") {
    return "✌️";
  }
}

function determineWinner(playerChoice, computerChoice) {
  // draw
  if (playerChoice === computerChoice) {
    return "draw";
  }

  // rock beats scissors
  if (playerChoice === "rock") {
    if (computerChoice === "scissors") {
      return "player";
    }
    if (computerChoice === "paper") {
      return "computer";
    }
  }

  // paper beats rock
  if (playerChoice === "paper") {
    if (computerChoice === "rock") {
      return "player";
    }
    if (computerChoice === "scissors") {
      return "computer";
    }
  }

  // scissors beats paper
  if (playerChoice === "scissors") {
    if (computerChoice === "paper") {
      return "player";
    }
    if (computerChoice === "rock") {
      return "computer";
    }
  }
}

function updateDisplay(playerChoice, computerChoice, winner) {
  const resultMessage = document.getElementById("resultMessage");
  const resultDetails = document.getElementById("resultDetails");
  const resultExplanation = document.getElementById("resultExplanation");
  const resultEmoji = document.getElementById("resultEmoji");

  const playerEmoji = getChoiceEmoji(playerChoice);
  const computerEmoji = getChoiceEmoji(computerChoice);

  resultDetails.textContent = `You: ${playerEmoji} ${playerChoice.toUpperCase()} ⚡ Computer: ${computerEmoji} ${computerChoice.toUpperCase()}`;

  if (winner === "player") {
    resultMessage.textContent = "🎉 You Win!";
    resultMessage.style.color = "#10b981";
    resultEmoji.textContent = "🏆";

    if (playerChoice === "rock" && computerChoice === "scissors") {
      resultExplanation.textContent = "Rock crushes Scissors!";
    }
    if (playerChoice === "paper" && computerChoice === "rock") {
      resultExplanation.textContent = "Paper covers Rock!";
    }
    if (playerChoice === "scissors" && computerChoice === "paper") {
      resultExplanation.textContent = "Scissors cuts Paper!";
    }
  }

  if (winner === "computer") {
    resultMessage.textContent = "😞 Computer Wins!";
    resultMessage.style.color = "#ef4444";
    resultEmoji.textContent = "💻";

    if (computerChoice === "rock" && playerChoice === "scissors") {
      resultExplanation.textContent = "Rock crushes Scissors!";
    }
    if (computerChoice === "paper" && playerChoice === "rock") {
      resultExplanation.textContent = "Paper covers Rock!";
    }
    if (computerChoice === "scissors" && playerChoice === "paper") {
      resultExplanation.textContent = "Scissors cuts Paper!";
    }
  }

  if (winner === "draw") {
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

function playGame(playerChoice) {
  const computerChoice = getComputerChoice();

  const winner = determineWinner(playerChoice, computerChoice);

  if (winner === "player") {
    playerScore = playerScore + 1;
  }
  if (winner === "computer") {
    computerScore = computerScore + 1;
  }
  if (winner === "draw") {
    drawScore = drawScore + 1;
  }

  updateDisplay(playerChoice, computerChoice, winner);
  updateScores();
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  drawScore = 0;
  updateScores();

  document.getElementById("resultMessage").textContent = "Make your choice!";
  document.getElementById("resultMessage").style.color = "#333";
  document.getElementById("resultDetails").textContent = "";
  document.getElementById("resultEmoji").textContent = "";
}
