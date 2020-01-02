let previousColorElement;
let canvas = document.getElementById("canvas_block");
let context = canvas.getContext("2d");
let head = document.getElementById("head");
let isDrawing = false;

import { scale } from "./change_size.js";

export function autoDrawing() {
  canvas = document.getElementById("canvas_block");
  context = canvas.getContext("2d");

  // Подключаем требуемые для рисования события
  canvas.onmousedown = startDrawing;
  canvas.onmouseup = stopDrawing;
  canvas.onmouseout = stopDrawing;
  canvas.onmousemove = draw;
}

head.addEventListener("input", changeColor, false);

function getColor() {
  return head.value;
}

function changeColor(imgElement) {
  // 	Меняем текущий цвет рисования
  context.strokeStyle = getColor();

  // Меняем стиль элемента <img>, по которому щелкнули
  imgElement.className = "Selected";

  // Возвращаем ранее выбранный элемент <img> в нормальное состояние
  if (previousColorElement != null) previousColorElement.className = "";

  previousColorElement = imgElement;
}

function startDrawing(e) {
  // Начинаем рисовать
  isDrawing = true;

  // Создаем новый путь (с текущим цветом и толщиной линии)
  context.beginPath();

  // Нажатием левой кнопки мыши помещаем "кисть" на холст
  context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

function draw(e) {
  if (isDrawing == true) {
    // Определяем текущие координаты указателя мыши
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;

    // Рисуем линию до новой координаты
    //context.lineTo(x, y);
    context.fillRect(
      Math.floor(x / scale) * scale,
      Math.floor(y / scale) * scale,
      scale,
      scale
    );
    context.fillStyle = getColor();
    context.stroke();
  }
}

function stopDrawing() {
  isDrawing = false;
}
