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

// Get Start Game Button
let startGame = document.querySelector(".control-buttons");

// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();
  timeOut();
};

// Effect Duration
let duration = 1000;
// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");
// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);
// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());
// CallBack Shuffle Function
shuffle(orderRange);
// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = orderRange[index];
  block.addEventListener("click", () => {
    flipping(block);
  });
});

// Flip Block Function
function flipping(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");
  // Collect All Flipped Cards
  allFlippedBlock = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  // If Theres Two Selected Blocks
  if (allFlippedBlock.length === 2) {
    // Stop Clicking Function
    stopClick();
    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlock[0], allFlippedBlock[1]);
  }
}

// Stop Clicking Function
function stopClick() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add("no-clicking");
  // Wait Duration
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let tries = document.querySelector(".info-container .tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    // Play Success Audio
    document.getElementById("success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    // Play Fail Audio
    // document.getElementById("fail").play();
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
  // Return Order Range
  return array;
}
// Time Out Function
function timeOut() {
  let seconds = Math.floor((1000 * 60) / 1000);
  let counter = setInterval(() => {
    seconds--;
    // document.querySelector(".time").innerHTML = seconds;
    // Collect All Has-Match Cards
    allmatchedBlock = blocks.filter((matchedBlock) =>
      matchedBlock.classList.contains("has-match")
    );
    // If Selected 20 True Blocks
    if (allmatchedBlock.length === 20) {
      clearInterval(counter);
      let goodJobEL = document.createElement("div");
      let button = document.createElement("span");
      button.className = "reload-btn";
      goodJobEL.classList.add("result");
      goodJobEL.innerHTML =
        "Good Job " +
        document.querySelector(".name span").innerHTML +
        "&#128516;";
      button.innerHTML = "Play Again";
      goodJobEL.appendChild(button);
      document.body.appendChild(goodJobEL);
      // Play Win Audio
      document.getElementById("win").play();
      // Click To Play Again
      button.onclick = function () {
        window.location.reload();
      };
    }
    // If Time Equel Zero
    if (seconds === 0) {
      clearInterval(counter);
      let timeOutEL = document.createElement("div");
      let button = document.createElement("span");
      button.className = "reload-btn";
      timeOutEL.classList.add("time-out");
      timeOutEL.innerHTML = "Time Out You Lost!&#128543;";
      button.innerHTML = "Play Again";
      timeOutEL.appendChild(button);
      document.body.appendChild(timeOutEL);
      // Play Loss Audio
      document.getElementById("loss").play();
      // Click To Play Again
      button.onclick = function () {
        window.location.reload();
      };
    }
  }, 1000);
}
