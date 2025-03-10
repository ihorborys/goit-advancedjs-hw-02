import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const button = document.querySelector('.datetime-btn')
const input = document.querySelector('.datetime-input')
button.addEventListener('click',  () => {
  timer.start()

  button.classList.remove('active')
  input.classList.add('disable')
  button.disabled = true;
  input.disabled = true;
})

let userSelectedDate;

alert = function (message) {
  iziToast.error({
    title: 'Please choose a date in the future',
    message: message,
    position: 'topRight',
    color: 'red'
  });
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      alert('');
      button.classList.remove('active')

    } else {
      button.classList.add('active')
      userSelectedDate = selectedDates[0];

      timer.deadline = userSelectedDate;
    }
  },
};

flatpickr("#datetime-picker", options);

const timer=  {
  deadline: null,
  intervalID: null,

  refs: {
    days: document.querySelector('.js-timer-days'),
    hours: document.querySelector('.js-timer-hours'),
    minutes: document.querySelector('.js-timer-minutes'),
    seconds: document.querySelector('.js-timer-seconds')
  },

  start() {
    this.intervalID = setInterval(() => {
      const diff = this.deadline - Date.now();

      if (diff <= 0) {
        this.stop();
        return;
      }

      const timeComponents = this.getTimeComponents(diff);

      this.refs.days.textContent = this.pad(timeComponents.days);
      this.refs.hours.textContent = this.pad(timeComponents.hours);
      this.refs.minutes.textContent = this.pad(timeComponents.minutes);
      this.refs.seconds.textContent = this.pad(timeComponents.seconds);

    },1000)
  },

  stop() {
    clearInterval(this.intervalID)

    input.classList.remove('disable')
    button.disabled = false;
    input.disabled = false;
  },

  getTimeComponents(diff) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(diff / day);
  // Remaining hours
  const hours = Math.floor((diff % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((diff % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((diff % day) % hour) % minute) / second);

  return {
    days,
    hours,
    minutes,
    seconds }
  },

  pad(value) {
    return String(value).padStart(2, '0')
  },

};

