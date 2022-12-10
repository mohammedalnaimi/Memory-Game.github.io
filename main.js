// Prompt Window To Ask For Name
window.onload = function () {
  let yourName = prompt("Whats Your Name?");

  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown";

    // Name Is Not Empty
  } else {
    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;
  }
};

let startGame = document.querySelector(".control-buttons")

// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();

  timeOut()
};

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);
// let blocks = Array.from(gameblock);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange)
shuffle(orderRange);
// console.log(orderRange)

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = orderRange[index];
  
  block.addEventListener("click", () => {
    flipping(block);
  });
});

function flipping(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  
  allFlippedBlock = blocks.filter((flippedBlock) =>
  flippedBlock.classList.contains("is-flipped")
  );
  // console.log(allFlippedBlock);
  if (allFlippedBlock.length === 2) {
    stopClick();
    
    checkMatchedBlocks(allFlippedBlock[0], allFlippedBlock[1]);
  }
}

function stopClick() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  let tries = document.querySelector(".info-container .tries span");
  
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    allmatchedBlock = blocks.filter((matchedBlock) =>
      matchedBlock.classList.contains("has-match")
    );
    if (allmatchedBlock.length === 20) {
      let goodJobEL = document.createElement("div");

      let button = document.createElement("button");
      button.className = "reload-btn";

      goodJobEL.classList.add("result");

      document.body.appendChild(goodJobEL);

      document.body.appendChild(button);

      goodJobEL.innerHTML = "Good Job " + document.querySelector(".name span").innerHTML + "&#128516;";
      button.innerHTML = "Play Again";
      button.onclick = function () {
        window.location.reload();
      };
    }

    document.getElementById("success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}

// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}

function timeOut() {
  let seconds = Math.floor(((1000 * 80)) / 1000);
  let counter = setInterval(() => {
    seconds--
    // document.querySelector(".time").innerHTML = seconds;
    if (seconds == 75) {
      clearInterval(counter);
      let timeOutEL = document.createElement("div");

      let button = document.createElement("button");
      button.className = "reload-btn";

      timeOutEL.classList.add("time-out");

      document.body.appendChild(timeOutEL);

      document.body.appendChild(button);

      timeOutEL.innerHTML =
        "Time Out You Lost!&#128543;";
      button.innerHTML = "Play Again";
      button.onclick = function () {
        window.location.reload();
      };
    }
    if (allmatchedBlock.length === 20) {
      clearInterval(counter)
    }
  }, 1000);
}