import { currentScale } from './change_size.js';
import { eyeDropper } from './eye_dropper.js';
import { bucket } from './bucket.js';
import { eraser } from './eraser.js';

const canvas = document.getElementById('canvas_block');
const hiddenCanvas = document.getElementById('hidden_canvas');
const hiddenContext = hiddenCanvas.getContext('2d');
const context = canvas.getContext('2d');
const head = document.getElementById('head');
let isDrawing = false;
const pen = document.getElementById('Pen');
const scale = currentScale.scaleValue;

export function getColor() {
  return head.value;
}

function changeColor() {
  // Меняем текущий цвет рисования
  context.strokeStyle = getColor();
  hiddenContext.strokeStyle = getColor();
}

head.addEventListener('input', changeColor, false);

function startDrawing(e) {
  // Начинаем рисовать
  isDrawing = true;

  // Создаем новый путь (с текущим цветом и толщиной линии)
  context.beginPath();
  hiddenContext.beginPath();

  // Нажатием левой кнопки мыши помещаем "кисть" на холст
  context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
  hiddenContext.moveTo(
    e.pageX - hiddenCanvas.offsetLeft,
    e.pageY - hiddenCanvas.offsetTop,
  );
}

function draw(e) {
  if (isDrawing === true && pen.className === 'Selected') {
    // Определяем текущие координаты указателя мыши
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;

    // Рисуем линию до новой координаты
    // context.lineTo(x, y);
    context.fillRect(
      Math.floor(x / scale) * scale,
      Math.floor(y / scale) * scale,
      scale,
      scale,
    );
    hiddenContext.fillRect(
      Math.floor(x / scale) * scale,
      Math.floor(y / scale) * scale,
      scale,
      scale,
    );
    context.fillStyle = getColor();
    hiddenContext.fillStyle = getColor();
    context.stroke();
    hiddenContext.stroke();
  }
}

function stopDrawing() {
  isDrawing = false;
}

export function autoDrawing() {
  // Подключаем требуемые для рисования события
  canvas.onmousedown = startDrawing;
  canvas.onmouseup = stopDrawing;
  canvas.onmouseout = stopDrawing;
  canvas.onmousemove = draw;
}

function clearClassName() {
  pen.className = '';
  eyeDropper.className = '';
  bucket.className = '';
  eraser.className = '';
}

pen.addEventListener('click', () => {
  clearClassName();
  pen.className = 'Selected';
  autoDrawing();
});

export { clearClassName, pen };
