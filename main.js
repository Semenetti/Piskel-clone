import { drawCanvas } from "./change_size.js";
import { autoDrawing } from "./pen.js";
import { onloadGrid } from "./new_frames.js";

window.onload = () => {
  drawCanvas(20);
  autoDrawing();
  onloadGrid();
};
