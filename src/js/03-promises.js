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
  for (let i = 0, position = 1; i < amount.value; i += 1, position += 1) {
    // Обчислення загальної затримки для кожного промісу
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
