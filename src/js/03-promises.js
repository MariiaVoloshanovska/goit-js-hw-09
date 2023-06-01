import Notiflix from 'notiflix';

const ourForm = document.querySelector('.form');

// Додавання події `submit` до форми і прив'язка функції `onSubmit` як обробника події
ourForm.addEventListener('submit', turnOnOurSubmit);

// Функція, яка створює проміс з випадковими значеннями
function newPromises(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    // Встановлення таймеру, який викликається після затримки
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
// Функція, яка виконується при подачі форми
function turnOnOurSubmit(evt) {
  // Запобігання перезавантаження сторінки
  evt.preventDefault();
  // Отримання значень полів форми за допомогою властивості `elements`
  const { delay, step, amount } = evt.currentTarget.elements;

  // Цикл, який генерує проміси в залежності від значення `amount`
  for (let i = 0; i < amount.value; i++) {
    const position = i + 1;
    const delayAll = Number(delay.value) + step.value * i;
    // Виклик функції `createPromise` для створення промісу з позицією та затримкою
    newPromises(position, delayAll)
      .then(({ position, delay }) => {
        // Якщо проміс виконується, виводиться повідомлення про успіх
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        // Якщо проміс не виконується - помилкa
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}


// const pageForm = document.querySelector('.form'); // Вибірка форми з класом `.form`
// const onBtnclick = (event) => { // Функція-обробник події `click` на кнопці форми
//   event.preventDefault(); // Запобігання перезавантаженню сторінки
//   let delay = Number(event.currentTarget.delay.value); // Отримання значення поля `delay` та перетворення його в число
//   const step = Number(event.currentTarget.step.value); // Отримання значення поля `step` та перетворення його в число
//   const amount = Number(event.currentTarget.amount.value); // Отримання значення поля `amount` та перетворення його в число
//   let position = 0; // Ініціалізація змінної `position` зі значенням 0

//   for (let i = 1; i <= amount; i += 1) { // Цикл, який генерує проміси залежно від значення `amount`
//     position = i; // Оновлення значення `position` з поточним значенням ітерації циклу
//     createPromise(position, delay) // Виклик функції `createPromise` зі значеннями `position` та `delay`
//       .then(({ position, delay }) => { // Обробка випадку, коли проміс виконується (резолвиться)
//         Notiflix.Notify.success(`:white_tick: Fulfilled promise ${position} in ${delay}ms`); // Виведення повідомлення про успіх за допомогою `Notiflix.Notify.success()`
//       })
//       .catch(({ position, delay }) => { // Обробка випадку, коли проміс не виконується (відхиляється)
//         Notiflix.Notify.failure(`:x: Rejected promise ${position} in ${delay}ms`); // Виведення повідомлення про помилку за допомогою `Notiflix.Notify.failure()`
//       });

//     delay += step; // Оновлення значення `delay`, додаючи до нього значення `step`
//   }
// }

// pageForm.addEventListener('submit', onBtnclick); // Додавання обробника події `submit` до форми

// function createPromise(position, delay) { // Визначення функції `createPromise`, яка створює новий проміс зі змінними `position` та `delay`
//   return new Promise((resolve, reject) => { // Створення нового промісу
//     const shouldResolve = Math.random() > 0.3; // Генерація випадкового значення для визначення, чи проміс повинен бути виконаний чи відхилений
//     setTimeout(() => { // Встановлення таймеру
//       if (shouldResolve) {
//         resolve({ position, delay }); // Виклик `resolve` для виконання промісу
//       } else {
//         reject({ position, delay }); // Виклик `reject` для відхилення промісу
//       }
//     }, delay);
//   });
// }
