const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

document.body.addEventListener('click', onStartStop);

function changeBgColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  document.body.style.backgroundColor = randomColor;
}

function onStartStop(e) {
  const clickBtn = e.target;

  if (clickBtn === startBtn) {
    startBtn.disabled = true;
    timerId = setInterval(() => changeBgColor(), 500);
  } else if (clickBtn === stopBtn) {
    startBtn.disabled = false;
    clearInterval(timerId);
  }
}
