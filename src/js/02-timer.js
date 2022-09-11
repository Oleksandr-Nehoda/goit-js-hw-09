// Описаний в документації
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    btnStart: document.querySelector('[data-start]'),
    inputTime: document.querySelector('#datetime-picker'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),

}

refs.btnStart.disabled = true;
let selectedTime = null

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedTime = selectedDates[0].getTime()

      if (selectedDates[0].getTime() > options.defaultDate.getTime()){
      refs.btnStart.disabled = false;
    } else {
        Notiflix.Notify.info("Please choose a date in the future")
    }
  },
}

refs.btnStart.addEventListener('click', onStart);

flatpickr("#datetime-picker", options);

function onStart () {
    refs.btnStart.disabled = true;
    refs.inputTime.disabled = true;
  
    const timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTime - currentTime;
    if (currentTime <= selectedTime){
    const {days, hours, minutes, seconds} = convertMs(deltaTime);
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}else{
    clearInterval(timerId);
}}, 1000)
    
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
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

