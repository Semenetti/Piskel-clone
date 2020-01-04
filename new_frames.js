let dataURL;
let cashedImg;
let downloadedImg = new Image();
let ctx;
const canvas = document.getElementById("canvas_block");

import { drawCanvas, scale } from "./change_size.js";

export function onloadImage() {
  ctx = canvas.getContext("2d");
  cashedImg = new Image();
  dataURL = localStorage.getItem(canvas);
  if (dataURL != null) {
    cashedImg.src = dataURL;
    cashedImg.onload = function() {
      ctx.drawImage(cashedImg, 0, 0);
    };
  }
}

canvas.addEventListener("click", () => {
  localStorage.setItem(canvas, canvas.toDataURL());
});

let newFrame = document.getElementById("new");

newFrame.addEventListener("click", () => {
  scaleImage(128);
  localStorage.removeItem("canvas");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  drawCanvas(scale);
});

let delFrame = document.getElementById("remove");

delFrame.addEventListener("click", () => {
  let element = document.getElementById("canvas_preview");
  element.lastChild ? element.removeChild(element.lastChild) : false;
});

function scaleImage(scale) {
  dataURL = localStorage.getItem(canvas);
  if (dataURL != null) {
    downloadedImg.src = dataURL;
    downloadedImg.onload = function() {
      if (cashedImg === null) alertMessage();
      let canvas2 = document.createElement("canvas");
      canvas2.height = 128;
      canvas2.width = 128;
      let ctx2 = canvas2.getContext("2d");
      ctx2.drawImage(downloadedImg, 0, 0, scale, scale);
      let frameBox = document.createElement("div");
      frameBox.className = "frameBox";
      frameBox.style.backgroundImage = `url('${dataURL}')`;
      document.getElementById("canvas_preview").append(frameBox);
    };
  }
}

function alertMessage() {
  alert("изображение отсутствует!");
}
