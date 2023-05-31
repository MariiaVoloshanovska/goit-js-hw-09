//  посилання на кнопки
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
// ідентифікатор інтервалу
let timerId = null;

// Ф-ція призначення кольору для body
function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    changeColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

// Ф-ція випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
