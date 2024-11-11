// script.js
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let interval;
let lapCount = 0;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

function updateDisplay() {
  const time = Date.now() - startTime + elapsedTime;
  const milliseconds = Math.floor(time % 1000).toString().padStart(3, "0");
  const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, "0");
  const minutes = Math.floor((time / 60000) % 60).toString().padStart(2, "0");
  display.innerText = `${minutes}:${seconds}:${milliseconds}`;
}

function startPause() {
  if (isRunning) {
    // Pause the timer
    clearInterval(interval);
    elapsedTime += Date.now() - startTime;
    startPauseBtn.textContent = "Start";
    lapBtn.disabled = true;
  } else {
    // Start the timer
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
    startPauseBtn.textContent = "Pause";
    lapBtn.disabled = false;
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(interval);
  startTime = 0;
  elapsedTime = 0;
  lapCount = 0;
  isRunning = false;
  display.innerText = "00:00:00.000";
  startPauseBtn.textContent = "Start";
  lapBtn.disabled = true;
  lapsList.innerHTML = ""; // Clear lap times
}

function recordLap() {
  if (isRunning) {
    lapCount++;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${display.innerText}`;
    lapsList.appendChild(lapItem);
  }
}
