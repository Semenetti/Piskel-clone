let canvas = document.getElementById("canvas_block");
let hiddenCanvas = document.getElementById("hidden_canvas");
let hiddenContext = hiddenCanvas.getContext("2d");
let context = canvas.getContext("2d");
let isDrawing = false;
let eraser = document.getElementById("eraser");

import { scale } from "./change_size.js";
import { clearClassName } from "./pen.js";

export { eraser };

export function autoEraser() {
  canvas.onmousedown = startDrawing;
  canvas.onmouseup = stopDrawing;
  canvas.onmouseout = stopDrawing;
  canvas.onmousemove = draw;
}

function startDrawing(e) {
  context.strokeStyle = "#ffffff";
  hiddenContext.strokeStyle = "#ffffff";
  isDrawing = true;
  context.beginPath();
  hiddenContext.beginPath();
  context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
  hiddenContext.moveTo(
    e.pageX - hiddenCanvas.offsetLeft,
    e.pageY - hiddenCanvas.offsetTop
  );
}

function draw(e) {
  if (isDrawing == true && eraser.className == "Selected") {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;

    context.fillRect(
      Math.floor(x / scale) * scale,
      Math.floor(y / scale) * scale,
      scale,
      scale
    );
    hiddenContext.fillRect(
      Math.floor(x / scale) * scale,
      Math.floor(y / scale) * scale,
      scale,
      scale
    );
    context.fillStyle = "#ffffff";
    hiddenContext.fillStyle = "#ffffff";
    context.stroke();
    hiddenContext.stroke();
  }
}

function stopDrawing() {
  isDrawing = false;
}

eraser.addEventListener("click", () => {
  clearClassName();
  eraser.className = "Selected";
  autoEraser();
});
