import { currentScale } from './change_size.js';
import { clearClassName } from './pen.js';

const canvas = document.getElementById('canvas_block');
const hiddenCanvas = document.getElementById('hidden_canvas');
const hiddenContext = hiddenCanvas.getContext('2d');
const context = canvas.getContext('2d');
let isDrawing = false;
const eraser = document.getElementById('eraser');
const scale = currentScale.scaleValue;

export { eraser };

function startDrawing(e) {
  context.strokeStyle = '#ffffff';
  hiddenContext.strokeStyle = '#ffffff';
  isDrawing = true;
  context.beginPath();
  hiddenContext.beginPath();
  context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
  hiddenContext.moveTo(
    e.pageX - hiddenCanvas.offsetLeft,
    e.pageY - hiddenCanvas.offsetTop,
  );
}

function draw(e) {
  if (isDrawing === true && eraser.className === 'Selected') {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;

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
    context.fillStyle = '#ffffff';
    hiddenContext.fillStyle = '#ffffff';
    context.stroke();
    hiddenContext.stroke();
  }
}

function stopDrawing() {
  isDrawing = false;
}

export function autoEraser() {
  canvas.onmousedown = startDrawing;
  canvas.onmouseup = stopDrawing;
  canvas.onmouseout = stopDrawing;
  canvas.onmousemove = draw;
}

eraser.addEventListener('click', () => {
  clearClassName();
  eraser.className = 'Selected';
  autoEraser();
});
