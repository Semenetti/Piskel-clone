import { clearClassName } from './pen.js';

const canvas = document.getElementById('canvas_block');
const hiddenCanvas = document.getElementById('hidden_canvas');
const ctx = canvas.getContext('2d');
const hiddenCtx = hiddenCanvas.getContext('2d');
const bucket = document.getElementById('bucket');

export { bucket };

const color = document.getElementById('head');

function draw() {
  ctx.fillStyle = color.value;
  hiddenCtx.fillStyle = color.value;
  ctx.fillRect(0, 0, 640, 640);
  hiddenCtx.fillRect(0, 0, 640, 640);
}

export function changeBackground() {
  if (bucket.className === 'Selected') canvas.onmousedown = draw;
}

color.addEventListener('change', changeBackground);

bucket.addEventListener('click', () => {
  clearClassName();
  bucket.className = 'Selected';
  changeBackground();
});
