const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lastDisplayedSeconds = -1;

function formatTime(time) {
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0')
  );
}

function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;

  const currentSeconds = Math.floor(elapsedTime / 1000);
  if (currentSeconds !== lastDisplayedSeconds) {
    display.textContent = formatTime(elapsedTime);
    lastDisplayedSeconds = currentSeconds;
  }
}

function start() {
  startTime = Date.now() - elapsedTime;
  updateDisplay();
  timerInterval = setInterval(updateDisplay, 100); // check every 100ms
  running = true;
  startPauseBtn.textContent = 'Pause';
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function pause() {
  clearInterval(timerInterval);
  running = false;
  startPauseBtn.textContent = 'Start';
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = '00:00:00';
  lapsList.innerHTML = '';
  running = false;
  startPauseBtn.textContent = 'Start';
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  lastDisplayedSeconds = -1;
}

function lap() {
  const lapItem = document.createElement('li');
  lapItem.textContent = formatTime(elapsedTime);
  lapsList.prepend(lapItem);
}

startPauseBtn.addEventListener('click', () => {
  if (!running) {
    start();
  } else {
    pause();
  }
});

resetBtn.addEventListener('click', () => {
  reset();
});

lapBtn.addEventListener('click', () => {
  lap();
});
