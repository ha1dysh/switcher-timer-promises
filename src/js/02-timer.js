import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const valuesEl = document.querySelectorAll('.timer .value');
startBtn.disabled = true;

let timerId = null;
let curTime = null;
let msDif = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    setDate();
  }, 1000);
});

let fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    msDif = selectedDate[0].valueOf() - fp.now.valueOf();

    if (msDif <= 0) {
      Notify.failure('Please, choose date in the future');
      startBtn.disabled = true;
      return;
    }

    startBtn.disabled = false;
  },
  onOpen() {
    clearAndReset();
  },
});

function setDate() {
  if (msDif - 1000 <= 0) {
    clearAndReset();
  }
  curTime = convertMs(msDif);
  let curTimeValues = Object.values(curTime);

  for (let i = 0; i < valuesEl.length; i++) {
    valuesEl[i].textContent = curTimeValues[i].toString().padStart(2, 0);
  }
  msDif -= 1000;
}

function clearAndReset() {
  clearInterval(timerId);
  valuesEl.forEach(e => (e.textContent = '00'));
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
