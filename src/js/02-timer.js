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

// Властивість "disabled" для кнопки "Start" у значення "true" (неактивна)
refs.startBtn.disabled = true;

// Об'єкт параметрів для Flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose() {
    const currentDay = new Date(); // Поточна дата/час
    const dedline = new Date(refs.input.value); // Дата/час, вибрана користувачем

// Перевіряємо, чи вибрана дата/час менше поточної
    if (dedline < currentDay) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future'); // Відображаємо повідомлення про помилку за допомогою бібліотеки Notiflix
    } else {
      refs.startBtn.disabled = false; //Властивість "disabled" для кнопки "Start" у значення "false" (активна)
    }
  },
};

refs.startBtn.addEventListener('click', () => {
  const timerID = setInterval(() => {
    const currentDay = new Date(); // Поточна дата/час
    const dedline = new Date(refs.input.value); // Дата/час, вибрана користувачем
    const difference = dedline - currentDay; // Різниця між дедлайном і поточним часом в мілісекундах


    if (difference <= 0) { // Якщо різниця менше або дорівнює 0, то таймер закінчився
      Notiflix.Notify.success(); // Відображаємо повідомлення про успішне завершення таймера за допомогою бібліотеки Notiflix
      clearInterval(timerID); // Зупиняємо інтервал таймера
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference); // Конвертуємо різницю в дні, години, хвилини і секунди

    refs.days.textContent = contentadded(days);
    refs.hours.textContent = contentadded(hours);
    refs.minutes.textContent = contentadded(minutes);
    refs.seconds.textContent = contentadded(seconds);
  }, 1000);
});

// Функція для додавання ведучих нулів до значень
function contentadded(value) {
  return String(value).padStart(2, '0'); // Додаємо ведучі нулі до числа, якщо воно має менше двох розрядів
}
flatpickr(refs.input, options); // Ініціалізуємо Flatpickr з вказаними параметрами

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

  return { days, hours, minutes, seconds }; // Повертаємо об'єкт з розрахунковими значеннями
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
