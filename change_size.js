const btn32 = document.getElementById("btn32x32");
const btn64 = document.getElementById("btn64x64");
const btn128 = document.getElementById("btn128x128");

let scale = 32;

btn32.addEventListener("click", () => {
  drawCanvas(32);
  scale = 32;
});

btn64.addEventListener("click", () => {
  drawCanvas(64);
  scale = 64;
});

btn128.addEventListener("click", () => {
  drawCanvas(128);
  scale = 128;
});

export function drawCanvas(size) {
  let canvas = document.getElementById("canvas_block");
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  for (var x = 0; x <= 512; x += size) {
    context.moveTo(x, 0);
    context.lineTo(x, 512);
  }

  for (var y = 0; y <= 512; y += size) {
    context.moveTo(0, y);
    context.lineTo(512, y);
  }

  context.strokeStyle = "#ddd";
  context.stroke();
}

export { scale };
