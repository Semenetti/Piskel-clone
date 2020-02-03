import { drawCanvas, currentScale } from './change_size.js';

let dataURL;
let cashedImg;
const downloadedImg = new Image();
let ctx;
let hiddenCtx;
const framesCash = [];
const canvas = document.getElementById('canvas_block');
const hiddenCanvas = document.getElementById('hidden_canvas');
const scale = currentScale.scaleValue;

export { framesCash };

export function onloadGrid() {
  ctx = canvas.getContext('2d');
  hiddenCtx = hiddenCanvas.getContext('2d');
  cashedImg = new Image();
  dataURL = localStorage.getItem(canvas);
  if (dataURL != null) {
    cashedImg.src = dataURL;
    cashedImg.onload = () => {
      ctx.drawImage(cashedImg, 0, 0);
    };
  }
}

function alertMessage() {
  /*eslint-disable */
  alert("изображение отсутствует!");
  /* eslint-enable */
}

export function toClearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hiddenCtx.clearRect(0, 0, canvas.width, canvas.height);
}

function scaleImage() {
  dataURL = localStorage.getItem(canvas);
  framesCash.push(dataURL);
  if (dataURL != null) {
    downloadedImg.src = dataURL;
    downloadedImg.onload = () => {
      if (cashedImg === null) alertMessage();
      const frameBox = document.createElement('div');
      const delBtn = document.createElement('button');
      frameBox.className = 'frameBox';
      delBtn.className = 'delete_btn';

      frameBox.addEventListener('click', (e) => {
        toClearCanvas();
        const bgImgSrc = e.toElement.style.backgroundImage.slice(5, -2);
        downloadedImg.src = bgImgSrc;
        downloadedImg.onload = () => {
          const canvas2 = document.getElementById('canvas_block');
          const hiddenCanvasCopy = document.getElementById('hidden_canvas');
          canvas2.height = 640;
          canvas2.width = 640;
          const ctxCopy = canvas2.getContext('2d');
          const hiddenCtxCopy = hiddenCanvasCopy.getContext('2d');
          ctxCopy.drawImage(downloadedImg, 0, 0, 640, 640);
          hiddenCtxCopy.drawImage(downloadedImg, 0, 0, 640, 640);
        };
      });

      delBtn.addEventListener('click', (e) => {
        const miniFrame = e.toElement.offsetParent;
        const bgImgSrc = e.toElement.offsetParent.style.backgroundImage.slice(
          5,
          -2,
        );
        framesCash.splice(framesCash.indexOf(bgImgSrc), 1);
        miniFrame.remove();
      });

      frameBox.style.backgroundImage = `url('${dataURL}')`;
      frameBox.append(delBtn);
      document.getElementById('canvas_preview').append(frameBox);
    };
  }
}

canvas.addEventListener('click', () => {
  localStorage.setItem(canvas, hiddenCanvas.toDataURL());
});

const newFrame = document.getElementById('new');

newFrame.addEventListener('click', () => {
  scaleImage(128);
  localStorage.removeItem('canvas');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hiddenCtx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  hiddenCtx.beginPath();
  drawCanvas(scale);
});

const clearCanvas = document.getElementById('remove');

clearCanvas.addEventListener('click', () => {
  toClearCanvas();
  drawCanvas(scale);
});
