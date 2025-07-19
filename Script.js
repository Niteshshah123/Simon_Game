let pink = document.querySelector("#pink");
let green = document.querySelector("#green");
let orange = document.querySelector("#orange");
let purple = document.querySelector("#purple");

let box_container = document.querySelector(".box");

let levelText = document.querySelector("#level");
let level =0;
let started = false;
let restarted = false;

let colors = ["pink", "green", "orange", "purple"]

let colorMap = {
  pink: pink,
  green: green,
  orange: orange,
  purple: purple
};

let computerColors = [];
let userColors = [];

const startBtn = document.getElementById("start-btn");
const countdownOverlay = document.getElementById("countdown-overlay");
const countdownText = document.getElementById("countdown-text");

// Actions
startBtn.addEventListener("click", startCountdown);

let btns = document.querySelectorAll(".btns");
for(btn of btns){
  btn.addEventListener("click", (e)=>{
    btnPressed(e);
  });
}

function startCountdown() {
  let count = 3;
  countdownText.textContent = count;
  countdownOverlay.classList.add("active");
  document.body.classList.add("disable-interaction");
  startBtn.style.visibility = "hidden";

  const interval = setInterval(() => {
    count--;
    if (count === 0) {
      countdownText.textContent = "Start!";
    } else if (count < 0) {
      clearInterval(interval);
      countdownOverlay.classList.remove("active");
      document.body.classList.remove("disable-interaction");
      
      // Start the game logic here
      levelUp();

    } else {
      countdownText.textContent = count;
    }
  }, 1000);
}

function levelUp(){
  level++;
  if(restarted){
    levelText.innerText = `Level : ${level}`;
  }
  if(!started){
    box_container.classList.remove("box"); 
    started = true;
    let rand = Math.floor(Math.random()*4);
    let color = colors[rand];
    setTimeout(() => {
      levelText.innerText = `Level : ${level}`;
      computerFlash(color);
      computerColors.push(color);
    }, 500);
  }
  else{
    userColors = [];
    let rand = Math.floor(Math.random()*4);
    let color = colors[rand];
    levelText.innerText = `Level : ${level}`;
    computerColors.push(color);
    setTimeout(() => {
      computerFlash(color);
    }, 100);
  }
}

function computerFlash(colorName) {
  let color = colorMap[colorName];
  color.classList.add("computer_flash");

  setTimeout(() => {
    color.classList.remove("computer_flash");
  }, 250);
}

function userFlash(color) {
  color.classList.add("user_flash");

  setTimeout(() => {
    color.classList.remove("user_flash");
  }, 150);
}

function btnPressed(e){

  let colorName = e.srcElement.id;
  let color = colorMap[colorName];
  userFlash(color);
  userColors.push(colorName);
  Match();
}

function Match(){
  
  let idx = userColors.length-1;

  if(userColors[idx]===computerColors[idx]){
    if(idx+1==computerColors.length){
      setTimeout(() => {
        levelUp();
      }, 300);
    }
  }
  else{
    restartGame();
    // return;
  }
}

function restartGame(){
  computerColors = [];
  userColors = [];
  box_container.classList.add("box");
  startBtn.style.visibility = "visible"; 
  startBtn.innerText = "Restart game";
  levelText.innerHTML = `Game Over! <br> Your Score is <b>${level}</b>`;
  started = false;
  level = 0;
  box_container.classList.add("box");
  restarted = true;
}
