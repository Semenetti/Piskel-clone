const btn32 = document.getElementById('btn32x32');
const btn64 = document.getElementById('btn64x64');
const btn128 = document.getElementById('btn128x128');

const currentScale = { scaleValue: 20 };

export function drawCanvas(size) {
  const canvas = document.getElementById('canvas_block');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  for (let x = 0; x <= 640; x += size) {
    context.moveTo(x, 0);
    context.lineTo(x, 640);
  }

  for (let y = 0; y <= 640; y += size) {
    context.moveTo(0, y);
    context.lineTo(640, y);
  }

  context.strokeStyle = '#ddd';
  context.stroke();
  localStorage.setItem(canvas, canvas.toDataURL());
}

btn32.addEventListener('click', () => {
  drawCanvas(20);
  currentScale.scaleValue = 20;
});

btn64.addEventListener('click', () => {
  drawCanvas(10);
  currentScale.scaleValue = 10;
});

btn128.addEventListener('click', () => {
  drawCanvas(5);
  currentScale.scaleValue = 5;
});

export { currentScale };
