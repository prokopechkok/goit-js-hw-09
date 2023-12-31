import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  datetimeInput: document.querySelector('#datetime-picker'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
};

let selectedDate;
refs.startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate <= options.defaultDate) {
      Notify.warning('Please choose date in the future!', {
        position: 'right-top',
        clickToClose: true,
      });
    } else {
      refs.startBtn.removeAttribute('disabled');
      refs.startBtn.addEventListener('click', onStartBtnClick);
    }
  },
};

flatpickr('#datetime-picker', options);

function onStartBtnClick() {
  refs.startBtn.setAttribute('disabled', 'true');
  refs.datetimeInput.setAttribute('disabled', 'true');

  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const timeLeftObj = convertMs(selectedDate - currentDate);

    refs.daysSpan.textContent = addLeadingZero(timeLeftObj.days);
    refs.hoursSpan.textContent = addLeadingZero(timeLeftObj.hours);
    refs.minutesSpan.textContent = addLeadingZero(timeLeftObj.minutes);
    refs.secondsSpan.textContent = addLeadingZero(timeLeftObj.seconds);

    if (
      !timeLeftObj.days &&
      !timeLeftObj.hours &&
      !timeLeftObj.minutes &&
      !timeLeftObj.seconds
    ) {
      clearInterval(intervalId);
      refs.datetimeInput.removeAttribute('disabled');
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
