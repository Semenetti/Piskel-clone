import { clearClassName } from "./pen.js";

let canvas = document.getElementById("canvas_block");
let ctx = canvas.getContext("2d");
let bucket = document.getElementById("bucket");

export { bucket };

let head = document.getElementById("head");

export function changeBackground() {
  canvas.onmousedown = draw;
  ctx.fillStyle = head.value;
}

function draw() {
  ctx.fillRect(0, 0, 640, 640);
}

bucket.addEventListener("click", () => {
  clearClassName();
  bucket.className = "Selected";
  changeBackground();
});
