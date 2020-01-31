import { drawCanvas } from "./components/change_size.js";
import { autoDrawing, clearClassName, pen } from "./components/pen.js";
import { onloadGrid, toClearCanvas } from "./components/new_frames.js";
import { changeBackground, bucket } from "./components/bucket.js";
import { pickColor, eyeDropper } from "./components/eye_dropper.js";

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
