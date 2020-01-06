let canvas = document.getElementById("canvas_block");
let ctx = canvas.getContext("2d");

let eyeDropper = document.getElementById("eyeDropper");
let pickedcolor = document.getElementById("pickedcolor");
let currentColor = document.getElementById("head");

import { clearClassName } from "./pen.js";
export { eyeDropper };

export function pickColor() {
  canvas.onmousedown = down;
}

function down(e) {
  let canvasX = Math.floor(e.pageX - canvas.offsetLeft);
  let canvasY = Math.floor(e.pageY - canvas.offsetTop);
  let imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
  let pixel = imageData.data;
  let pickedColor = pixel[0] + "," + pixel[1] + "," + pixel[2] + "," + pixel[3];
  let hex = "#" + ("000000" + rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6);

  pickedcolor.style.background = "rgba(" + pickedColor + ")";
  pickedcolor.addEventListener("click", () => {
    currentColor.value = hex;
  });
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

eyeDropper.addEventListener("click", () => {
  clearClassName();
  eyeDropper.className = "Selected";
  pickColor();
});
