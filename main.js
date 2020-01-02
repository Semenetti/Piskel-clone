import { drawCanvas } from "./change_size.js";
import { autoDrawing } from "./pen.js";

window.onload = () => {
    drawCanvas(32);
    autoDrawing();
} 
