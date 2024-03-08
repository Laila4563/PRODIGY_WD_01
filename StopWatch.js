let timer;
let isRunning = false;
let elapsedTime = 0;
let laps = [];

function formatTime(time) {
  let hours = Math.floor(time / 360000);
  let minutes = Math.floor((time % 360000) / 6000);
  let seconds = Math.floor((time % 6000) / 100);
  let milliseconds = time % 100;

  return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} : ${milliseconds.toString().padStart(2, '0')}`;
}

function displayTime() {
  document.querySelector('.timer-display').textContent = formatTime(elapsedTime);
}

function startTimer() {
  isRunning = true;
  timer = setInterval(() => {
    elapsedTime++;
    displayTime();
  }, 10); // Update every 10 milliseconds for hundredths of a second
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
}

function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  displayTime();
  laps = [];
  updateLaps();
}

function lapTime() {
  laps.push(elapsedTime);
  updateLaps();
  elapsedTime = 0; // Reset elapsed time for the next lap
}

function updateLaps() {
  const lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  if (laps.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No laps recorded yet';
    lapsList.appendChild(li);
  } else {
    laps.forEach((lap, index) => {
      const li = document.createElement('li');
      li.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
      lapsList.appendChild(li);
    });
  }
}


document.getElementById('start-button').addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
    document.getElementById('pause-button').removeAttribute('disabled');
    document.getElementById('reset-button').removeAttribute('disabled');
  }
});

document.getElementById('pause-button').addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
  }
});

document.getElementById('reset-button').addEventListener('click', () => {
  resetTimer();
});

document.getElementById('lap-button').addEventListener('click', () => {
  if (isRunning) {
    lapTime();
  }
});

document.getElementById('reset-laps-button').addEventListener('click', () => {
  laps = [];
  updateLaps();
});

resetTimer(); // Initialize display
