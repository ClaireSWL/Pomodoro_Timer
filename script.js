const workTitle = document.getElementById("work");
const shortBreakTitle = document.getElementById("shortbreak");
const longBreakTitle = document.getElementById("longbreak");

let workTime = 25;
let shortBreakTime = 5;
let longBreakTime = 15;

let timer = null;
let currentMinutes = 0;
let currentSeconds = 0;
let isRunning = false;

// display
window.onload = () => {
  setTimer("work");
  workTitle.classList.add("active");
};

function setTimer(mode) {
  stop();
  if (mode === "work") {
    currentMinutes = workTime;
    workTitle.classList.add("active");
    shortBreakTitle.classList.remove("active");
    longBreakTitle.classList.remove("active");
  } else if (mode === "shortBreak") {
    currentMinutes = shortBreakTime;
    shortBreakTitle.classList.add("active");
    workTitle.classList.remove("active");
    longBreakTitle.classList.remove("active");
  } else if (mode === "longBreak") {
    currentMinutes = longBreakTime;
    longBreakTitle.classList.add("active");
    workTitle.classList.remove("active");
    shortBreakTitle.classList.remove("active");
  }

  currentSeconds = 0;
  updateDisplay();
}

// 確保分鐘數和秒數始終顯示為兩位數
function updateDisplay() {
  document.getElementById("minutes").textContent = String(
    currentMinutes
  ).padStart(2, "0");
  document.getElementById("seconds").textContent = String(
    currentSeconds
  ).padStart(2, "0");
}

// Start Time
function start() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (currentMinutes === 0 && currentSeconds === 0) {
      clearInterval(timer);
      isRunning = false;
      alert(getAlertMessage());
    } else {
      if (currentSeconds === 0) {
        if (currentMinutes > 0) {
          currentSeconds = 59;
          currentMinutes--;
        }
      } else {
        currentSeconds--;
      }
      updateDisplay();
    }
  }, 1000);
}

function stop() {
  clearInterval(timer);
  isRunning = false;
}

function reset() {
  stop();
  currentMinutes = 0;
  currentSeconds = 0;
  updateDisplay();
}

function getAlertMessage() {
  if (workTitle.classList.contains("active")) {
    return "Time for a break";
  } else {
    return "Time to focus";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimer("work");
});
