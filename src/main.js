import { drawCanvas } from "./components/change_size.js";
import { autoDrawing, clearClassName, pen } from "./components/pen.js";
import { onloadGrid, toClearCanvas } from "./components/new_frames.js";
import { printNumbers } from "./components/video_animation.js";
import { exportCanvasAsPNG } from "./components/save_image.js";
import { createCanvas } from "./components/animation_preview.js";
import { changeBackground, bucket } from "./components/bucket.js";
import { pickColor, eyeDropper } from "./components/eye_dropper.js";
import { autoEraser } from "./components/eraser.js";

window.onload = () => {
  drawCanvas(20);
  autoDrawing();
  onloadGrid();
  document.addEventListener("keydown", event => {
    switch (event.code) {
      case "KeyP":
        clearClassName();
        pen.className = "Selected";
        autoDrawing();
        break;
      case "KeyB":
        clearClassName();
        bucket.className = "Selected";
        changeBackground();
        break;
      case "KeyE":
        clearClassName();
        eyeDropper.className = "Selected";
        pickColor();
        break;
      case "KeyC":
        toClearCanvas();
        break;
      default:
        break;
    }
  });
};
