let botDoorPath = "https://content.codecademy.com/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://content.codecademy.com/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://content.codecademy.com/projects/chore-door/images/space.svg";
let closedDoorPath = "https://content.codecademy.com/projects/chore-door/images/closed_door.svg";

let doorImage1 = document.querySelector("#door1");
let doorImage2 = document.querySelector("#door2");
let doorImage3 = document.querySelector("#door3");
let openDoor1;
let openDoor2;
let openDoor3;

let startButton = document.querySelector("#start");
let gameStatus;
let numClosedDoors = 3;
let currentlyPlaying = true;

let bestScore = 0;
let bestScoreEl = document.querySelectorAll('.score-total')[0];
let currentScore = 0;
let currentScoreEl = document.querySelectorAll('.score-total')[1];

/**
 * Randomly generates the door that hides the ChoreBot
 */
const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  switch (choreDoor) {
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 1:
      openDoor1 = beachDoorPath;
      openDoor2 = botDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 2:
      openDoor1 = beachDoorPath;
      openDoor2 = spaceDoorPath;
      openDoor3 = botDoorPath;
  }
};

/**
 * @param {string} gameStatus
 * Updates the button's text to a relevant message based on whether the player had won or lost the game
 * Updates the scores for best score and current score
 */

// document.body.addEventListener("click", party.confetti)

const gameOver = (gameStatus) => {
  if (gameStatus === "win") {
    // this function is imported via a cdn in the index.html file
    party.confetti(document.body, {
      count: party.variation.range(60, 100),
      shapes: ["star", "circle", "roundedSquare"],
      size: 1.5
    });
    currentScore++;
    currentScoreEl.textContent = currentScore;
    if (currentScore > bestScore) {
      bestScore = currentScore;
      bestScoreEl.textContent = bestScore;
    }
  }
  if (gameStatus === "lose") {
    startButton.textContent = "Game over! Play again?";
    startButton.style.backgroundColor = "var(--color-1)";
    currentScore = 0;
    currentScoreEl.textContent = currentScore;
  }
};

/**
 * The function checks if a door had been clicked (opened)
 * @param {string} door 
 * @returns a boolean value
 */
const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
};

/**
 * The function checks if the opened door is the ChoreBot
 * @param {string} door 
 * @returns a boolean value
 */
const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

/**
 * @param {string} door
 * When a closed door is clicked:
 * 1) The number of closed doors decreases (decreases the numClosedDoors variable). 
 * 2) We check if a game over condition is met, ie., all doors have been successfully opened or the ChoreBot appeared before all doors could be opened.
 */
const playDoor = (door) => {
  numClosedDoors -= 1;
  
  if (numClosedDoors === 0) {
    gameStatus = "win";
    gameOver(gameStatus);
    currentlyPlaying = false;
  }

  if (numClosedDoors > 0 && isBot(door)) {
    gameStatus = "lose";
    gameOver(gameStatus);
    currentlyPlaying = false;
  }

};

/**
 * Starts a new round.
 * Resets properties and values of elements back to their initial states.
 */
const startRound = () => {
  currentlyPlaying = true;

  startButton.innerHTML = "Good Luck!";
  startButton.style.backgroundColor = "var(--color-5)";

  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;

  numClosedDoors = 3;
  randomChoreDoorGenerator();
};

// Click Events 
doorImage1.onclick = () => {
  if (!isClicked(doorImage1) && currentlyPlaying) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};

doorImage2.onclick = () => {
  if (!isClicked(doorImage2) && currentlyPlaying) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  if (!isClicked(doorImage3) && currentlyPlaying) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

startButton.onclick = () => {
  // Checks if the currentlyPlaying variable is false before starting a new round so that a player cannot reset the game mid-round.
  if (!currentlyPlaying) {
    startRound();
  };
};

// start every new round with @function startRound
startRound();

