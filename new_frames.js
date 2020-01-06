let dataURL;
let cashedImg;
let downloadedImg = new Image();
let ctx;
let framesCash = [];
const canvas = document.getElementById("canvas_block");

import { drawCanvas, scale } from "./change_size.js";
export { framesCash };

export function onloadGrid() {
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

let clearCanvas = document.getElementById("remove");

clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvas(scale);
});

function scaleImage(scale) {
  dataURL = localStorage.getItem(canvas);
  framesCash.push(dataURL);
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
      let delBtn = document.createElement("button");
      frameBox.className = "frameBox";
      delBtn.className = "delete_btn";

      frameBox.addEventListener("click", e => {
        localStorage.setItem(canvas, canvas.toDataURL());
        let bgImgSrc = e.toElement.style.backgroundImage.slice(5, -2);
        downloadedImg.src = bgImgSrc;
        downloadedImg.onload = function() {
          let canvas2 = document.getElementById("canvas_block");
          canvas2.height = 640;
          canvas2.width = 640;
          let ctx = canvas2.getContext("2d");
          ctx.drawImage(downloadedImg, 0, 0, 640, 640);
        };
      });

      delBtn.addEventListener("click", e => {
        let miniFrame = e.toElement.offsetParent;
        let bgImgSrc = e.toElement.offsetParent.style.backgroundImage.slice(
          5,
          -2
        );
        framesCash.splice(framesCash.indexOf(bgImgSrc), 1);
        miniFrame.remove();
      });

      frameBox.style.backgroundImage = `url('${dataURL}')`;
      frameBox.append(delBtn);
      document.getElementById("canvas_preview").append(frameBox);
    };
  }
}

function alertMessage() {
  alert("изображение отсутствует!");
}
