const btn32 = document.getElementById("btn32x32");
const btn64 = document.getElementById("btn64x64");
const btn128 = document.getElementById("btn128x128");

let scale = 20;

btn32.addEventListener("click", () => {
  drawCanvas(20);
  scale = 20;
});

btn64.addEventListener("click", () => {
  drawCanvas(10);
  scale = 10;
});

btn128.addEventListener("click", () => {
  drawCanvas(5);
  scale = 5;
});

export function drawCanvas(size) {
  let canvas = document.getElementById("canvas_block");
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  for (var x = 0; x <= 640; x += size) {
    context.moveTo(x, 0);
    context.lineTo(x, 640);
  }

  for (var y = 0; y <= 640; y += size) {
    context.moveTo(0, y);
    context.lineTo(640, y);
  }

  context.strokeStyle = "#ddd";
  context.stroke();
}

export { scale };
