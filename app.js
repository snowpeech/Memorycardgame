const imgSrc = [
  "/batman",
  "/beast",
  "/capt",
  "/cyclops",
  "/daredevil",
  "/hawkeye",
  "/hulk",
  "/ironman",
  "/lantern",
  "/robin",
  "/spiderman",
  "/superman",
  "/thor"
];

const container = document.getElementById("container");
const scoreDiv = document.getElementById("score");
const bestScoreDiv = document.getElementById("bestScore");
const newGamebtn = document.getElementById("newGame");

var gameCounter = 0;
var score = 0;

newGamebtn.addEventListener("click", function() {
  location.reload();
});

// SETTING UP THE BOARD
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let gameImgs = shuffleArray(imgSrc).slice(0, 3);
let dblImgs = shuffleArray([...gameImgs, ...gameImgs]);

window.addEventListener("load", drawTable(dblImgs));

function setBestScore() {
  if (localStorage.length == 0) {
    bestScoreDiv.innerHTML = "Set a new best score &#9786 ";
  } else {
    bestScoreDiv.innerText = `Best Score: ${localStorage.getItem(
      "best-score"
    )}`;
  }
}

setBestScore();

function drawTable(imgAry) {
  let count = 1;
  for (var i of imgAry) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("grid-item");
    newDiv.innerHTML = `<img class="tile hidden" id="${count}" src="./images${i}.png" />`;

    count++;
    container.appendChild(newDiv);
  }
}

// GAMEPLAY
let pairID = ["x", "x"];
let pairSrc = "";

function validClick() {
  gameCounter++;
  score = Math.floor(gameCounter / 2);
  scoreDiv.innerHTML = `Score: ${score}`;
}

function resetSet() {
  pairID[0] = "x";
  pairID[1] = "x";
  pairSrc = "";
}

container.addEventListener("click", function(e) {
  if (
    !e.target.classList.contains("matched") &&
    e.target.classList.contains("tile") &&
    !container.classList.contains("animating")
  ) {
    //First Click
    if (pairID[0] === "x") {
      e.target.classList.toggle("hidden");
      validClick();

      pairID[0] = e.target.getAttribute("id");
      pairSrc = e.target.getAttribute("src");
    }

    //Second Click
    if (
      e.target.getAttribute("id") !== pairID[0] &&
      e.target.getAttribute("id") !== pairID[1]
    ) {
      pairID[1] = e.target.getAttribute("id");
      e.target.classList.toggle("hidden");
      validClick();

      //Tiles Match
      if (e.target.getAttribute("src") == pairSrc) {
        e.target.classList.add("matched");
        let firstMatch = document.getElementById(pairID[0]);
        firstMatch.classList.add("matched");
        resetSet();
        setTimeout(evaluateWin, 1000);
      } else {
        //Tiles don't match
        container.classList.add("animating");
        setTimeout(function() {
          document.getElementById(pairID[0]).classList.add("hidden");
          document.getElementById(pairID[1]).classList.add("hidden");
          resetSet();
          container.classList.remove("animating");
        }, 1100);
      }
    }
  }
});

function evaluateWin() {
  if (document.querySelectorAll(".hidden").length === 0) {
    alert(`Congrats! Your score is ${score}`);
      parseInt(localStorage.getItem("best-score"))
    );

    if (score < parseInt(localStorage.getItem("best-score"))) {
      localStorage.setItem("best-score", score);
      console.log("am i here?", score)
      setBestScore();
    }
  }
}
