// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// кнопка не активна (Вимкнення кнопки "startBtn" (disabled))
refs.startBtn.disabled = true;

// Об'єкт параметрів для Flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

// вибір дати та часу (Ініціалізація Flatpickr з використанням вхідного поля та параметрів)
flatpickr(refs.input, options);

// Додавання обробника події на кнопку "startBtn"
refs.startBtn.addEventListener('click', startTime);

// старт відліку часу
let timerId = null;
function startTime() {
  refs.startBtn.disabled = true;
  timerId = setInterval(changeTime, 1000);
}

// // Функція для зміни відображення часу
function changeTime() {
  const selectedDate = new Date(refs.input.value).getTime();
  const currentDate = new Date().getTime();
  const differenceTime = selectedDate - currentDate;

  const ourtimeData = convertMs(differenceTime);

  if (differenceTime <= 1) {
    return clearInterval(intervalTime);
  }
  refs.days.textContent = contentadded(ourtimeData.days);
  refs.hours.textContent = contentadded(ourtimeData.hours);
  refs.minutes.textContent = contentadded(ourtimeData.minutes);
  refs.seconds.textContent = contentadded(ourtimeData.seconds);
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

// Функція для додавання ведучих нулів до значень
function contentadded(value) {
  return String(value).padStart(2, '0');
}

// Цей код використовує бібліотеку Flatpickr для створення вікна вибору дати та часу. Основна функціональність цього коду полягає у відліку часу від обраної дати до поточного моменту.

// Основні етапи виконання коду:

// 1. Імпортується бібліотека Flatpickr та додаткові стилі для неї.
// 2. Визначаються посилання на елементи DOM, такі як вхідне поле дати, кнопка "Start", та елементи, які відображатимуть розрахований час.
// 3. Кнопка "Start" вимкнена (disabled).
// 4. Визначаються параметри для Flatpickr, такі як включений режим вибору часу, формат 24-годинного часу, початкова дата за замовчуванням, тощо. При закритті вікна вибору дати, перевіряється, чи обрана дата є майбутньою. Якщо ні, то виводиться повідомлення про помилку за допомогою бібліотеки Notiflix, і кнопка "Start" залишається вимкненою. Якщо обрана дата є майбутньою, кнопка "Start" активується (disabled = false).
// 5. Ініціалізується Flatpickr на вхідному полі дати з використанням визначених параметрів.
// 6. Додається обробник події на кнопку "Start", який викликає функцію `startTime()`.
// 7. Функція `startTime()` вимикає кнопку "Start" (disabled = true) та запускає таймер, який викликає функцію `changeTime()` кожну секунду.
// 8. Функція `changeTime()` розраховує різницю між обраною датою та поточним моментом, конвертує цю різницю в дні, години, хвилини та секунди за допомогою функції `convertMs()`, та відображає ці значення на сторінці.
// 9. Функція `convertMs()` приймає мілі
