import { clearClassName } from "./pen.js";

let canvas = document.getElementById("canvas_block");
let hiddenCanvas = document.getElementById("hidden_canvas");
let ctx = canvas.getContext("2d");
let hiddenCtx = hiddenCanvas.getContext("2d");
let bucket = document.getElementById("bucket");

export { bucket };

let color = document.getElementById("head");
color.addEventListener("change", changeBackground, false);

function changeBackground() {
  bucket.className === "Selected" ? (canvas.onmousedown = draw) : false;
}

function draw() {
  ctx.fillStyle = color.value;
  hiddenCtx.fillStyle = color.value;
  ctx.fillRect(0, 0, 640, 640);
  hiddenCtx.fillRect(0, 0, 640, 640);
}

bucket.addEventListener("click", () => {
  clearClassName();
  bucket.className = "Selected";
  changeBackground();
});
