import { drawCanvas } from "./change_size.js";
import { autoDrawing, clearClassName, pen } from "./pen.js";
import { onloadGrid, toClearCanvas } from "./new_frames.js";
import { printNumbers } from "./video_animation.js";
import { exportCanvasAsPNG } from "./save_image.js";
import { createCanvas } from "./animation_preview.js";
import { changeBackground, bucket } from "./bucket.js";
import { pickColor, eyeDropper } from "./eye_dropper.js";

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
