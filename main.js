import { drawCanvas } from "./change_size.js";
import { autoDrawing } from "./pen.js";
import { onloadGrid } from "./new_frames.js";
import { printNumbers } from "./video_animation.js";
import { exportCanvasAsPNG } from "./save_image.js";
import { createCanvas } from "./animation_preview.js";

window.onload = () => {
  drawCanvas(20);
  autoDrawing();
  onloadGrid();
};
