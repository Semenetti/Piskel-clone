import { clearClassName } from './pen.js';

const canvas = document.getElementById('canvas_block');
const ctx = canvas.getContext('2d');

const eyeDropper = document.getElementById('eyeDropper');
const pickedcolor = document.getElementById('pickedcolor');
const currentColor = document.getElementById('head');

export { eyeDropper };

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw new Error('Invalid color component');
  return ((r < 16) || (g < 8) || b).toString(16);
}

function down(e) {
  const canvasX = Math.floor(e.pageX - canvas.offsetLeft);
  const canvasY = Math.floor(e.pageY - canvas.offsetTop);
  const imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
  const pixel = imageData.data;
  const pickedColor = `${pixel[0]},${pixel[1]},${pixel[2]},${pixel[3]}`;
  const hex = `#${`000000${rgbToHex(pixel[0], pixel[1], pixel[2])}`.slice(-6)}`;

  pickedcolor.style.background = `rgba(${pickedColor})`;
  pickedcolor.addEventListener('click', () => {
    currentColor.value = hex;
  });
}

export function pickColor() {
  canvas.onmousedown = down;
}

eyeDropper.addEventListener('click', () => {
  clearClassName();
  eyeDropper.className = 'Selected';
  pickColor();
});
