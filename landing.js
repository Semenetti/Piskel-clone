/* This contains two examples from stackoverflow documents. */
var exampleRunning = false;
/* From stackoverflow documents 
   html5-canvas 
   Introduction to html5-canvas 
       Creating a responsive full page canvas
       http://stackoverflow.com/documentation/html5-canvas/1892/introduction-to-html5-canvas/7516/creating-a-responsive-full-page-canvas#t=20160809212935818717 
*/
var canvas;
var ctx;
let aminationBox = document.getElementById("animation");
function createCanvas() {
  // creates a canvas
  var canvas = document.createElement("canvas");
  canvas.style.position = "absolute"; // set the style
  canvas.style.left = "0px"; // position in top left
  canvas.style.top = "0px";
  canvas.style.zIndex = 1;
  aminationBox.appendChild(canvas); // add to document
  return canvas;
}

function sizeCanvas() {
  // resizes canvas. Will create a canvas if it does not exist
  if (canvas === undefined) {
    // if there is no canvas create it
    canvas = createCanvas();
    ctx = canvas.getContext("2d"); // get the 2D context
  }
  //   canvas.width = window.innerWidth; // set the resolution to fill the page
  canvas.width = 300; // set the resolution to fill the page
  //   canvas.height = window.innerHeight;
  canvas.height = 300;
  if (exampleRunning) {
    reset(); // reset anmation
  }
}
// removes the canvas
function removeCanvas() {
  if (canvas !== undefined) {
    // make sure there is something to remove
    window.removeEventListener("resize", sizeCanvas); // remove resize event
    document.body.removeChild(canvas); // remove the canvas from the DOM
    ctx = undefined; // dereference the context
    canvas = undefined; // dereference the canvas
  }
}

// the resize listener
window.addEventListener("resize", sizeCanvas);
// call sizeCanvas to create and set the canvas resolution
sizeCanvas();
/* End of stackoverflow example  Creating a responsive full page canvas*/

/* From stackoverflow documents 
       html5-canvas 
       Introduction to html5-canvas 
           Simple animation with 2d context and requestAnimationFrame
           http://stackoverflow.com/documentation/html5-canvas/1892/introduction-to-html5-canvas/7518/simple-animation-with-2d-context-and-requestanimationframe#t=20160809212935818717
    */

const textToDisplay = "Animation using requestAnimationFrame on canvas........";
const textStyle = "white";
const BGStyle = "black"; // background style
const textSpeed = 0.2; // in pixels per millisecond
const textHorMargin = 8; // have the text a little outside the canvas

ctx.font = Math.floor(canvas.height * 0.1) + "px arial"; // size the font to 20% of canvas height
var textWidth = ctx.measureText(textToDisplay).width; // get the text width
var totalTextSize = canvas.width + textHorMargin * 2 + textWidth;
ctx.textBaseline = "middle"; // not put the text in the vertical center
ctx.textAlign = "left"; // align to the left
var textX = canvas.width + 8; // start with the text off screen to the right
var textOffset = 0; // how far the text has moved
var reset = function() {
  ctx.font = Math.floor(canvas.height * 0.1) + "px arial"; // size the font to 80% of canvas height
  textWidth = ctx.measureText(textToDisplay).width; // get the text width
  totalTextSize = canvas.width + textHorMargin * 2 + textWidth;
  textX = canvas.width + 8; // start with the text off screen to the right
  textOffset = 0; // how far the text has moved
  ctx.textBaseline = "middle"; // not put the text in the vertical center
  ctx.textAlign = "left"; // align to the left
};
var startTime;
// this function is call once a frame which is approx 16.66 ms (60fps)
function update(time) {
  // time is passed by requestAnimationFrame
  if (startTime === undefined) {
    // get a reference for the start time if this is the first frame
    startTime = time;
  }
  ctx.fillStyle = BGStyle;
  ctx.fillRect(0, 0, canvas.width, canvas.height); // clear the canvas by drawing over it
  textOffset = ((time - startTime) * textSpeed) % totalTextSize; // move the text left
  ctx.fillStyle = textStyle; // set the text style
  ctx.fillText(textToDisplay, textX - textOffset, canvas.height / 2); // render the text
  requestAnimationFrame(update); // all done request the next frame
}
requestAnimationFrame(update); // to start request the first frame

/* End of stackoverflow example Simple animation with 2d context and requestAnimationFrame*/

exampleRunning = true;
