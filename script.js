let startTime = 0;
let elapsed = 0;
let timerInterval = null;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const centiseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return (
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds + '.' +
    (centiseconds < 10 ? '0' : '') + centiseconds
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsed);
}

function startTimer() {
  if (running) return;
  running = true;
  startTime = Date.now() - elapsed;
  timerInterval = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay();
  }, 10);
}

function pauseTimer() {
  if (!running) return;
  running = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  pauseTimer();
  elapsed = 0;
  updateDisplay();
  lapsList.innerHTML = '';
  lapCount = 0;
}

function addLap() {
  if (!running) return;
  lapCount++;
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCount}: ${formatTime(elapsed)}`;
  lapsList.appendChild(li);
  lapsList.scrollTop = lapsList.scrollHeight;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

updateDisplay(); 