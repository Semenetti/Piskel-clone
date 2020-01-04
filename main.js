import { drawCanvas } from "./change_size.js";
import { autoDrawing } from "./pen.js";
import { onloadImage } from "./new_frames.js";

window.onload = () => {
  drawCanvas(20);
  autoDrawing();
  onloadImage();
};
