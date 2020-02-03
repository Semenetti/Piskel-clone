/* This contains two examples from stackoverflow documents. */
let exampleRunning = false;
/* From stackoverflow documents
   html5-canvas
   Introduction to html5-canvas
       Creating a responsive full page canvas
       http://stackoverflow.com/documentation/html5-canvas/1892/introduction-to-html5-canvas/7516/creating-a-responsive-full-page-canvas#t=20160809212935818717
*/
let canvas;
let ctx;
const video = document.getElementById('video');

export function createCanvas() {
  // creates a canvas
  canvas = document.createElement('canvas');
  canvas.style.position = 'absolute'; // set the style
  canvas.style.left = '0px'; // position in top left
  canvas.style.top = '0px';
  canvas.style.zIndex = -1;
  video.appendChild(canvas); // add to document
  return canvas;
}

function sizeCanvas() {
  // resizes canvas. Will create a canvas if it does not exist
  if (canvas === undefined) {
    // if there is no canvas create it
    canvas = createCanvas();
    ctx = canvas.getContext('2d'); // get the 2D context
  }
  // canvas.width  = window.innerWidth;  // set the resolution to fill the page
  canvas.width = 254; // set the resolution to fill the page
  // canvas.height = window.innerHeight;
  canvas.height = 254;
  if (exampleRunning) {
    // reset(); // reset anmation
  }
}
// removes the canvas
export function removeCanvas() {
  if (canvas !== undefined) {
    // make sure there is something to remove
    window.removeEventListener('resize', sizeCanvas); // remove resize event
    video.removeChild(canvas); // remove the canvas from the DOM
    ctx = undefined; // dereference the context
    canvas = undefined; // dereference the canvas
  }
}

const delCanvas = document.getElementById('start');
delCanvas.onclick = removeCanvas;

// let fullscreenBtn = document.getElementById("fs");
// fullscreenBtn.onclick = removeCanvas;

// the resize listener
window.addEventListener('resize', sizeCanvas);
// call sizeCanvas to create and set the canvas resolution
sizeCanvas();
/* End of stackoverflow example  Creating a responsive full page canvas */

/* From stackoverflow documents
       html5-canvas
       Introduction to html5-canvas
           Simple animation with 2d context and requestAnimationFrame
           http://stackoverflow.com/documentation/html5-canvas/1892/introduction-to-html5-canvas/7518/simple-animation-with-2d-context-and-requestanimationframe#t=20160809212935818717
    */

const textToDisplay = 'Animation using requestAnimationFrame and responsive full screen canvas........';
const textStyle = 'white';
const BGStyle = 'black'; // background style
const textSpeed = 0.2; // in pixels per millisecond
const textHorMargin = 8; // have the text a little outside the canvas

ctx.font = `${Math.floor(canvas.height * 0.2)}px arial`; // size the font to 80% of canvas height
const textWidth = ctx.measureText(textToDisplay).width; // get the text width
const totalTextSize = canvas.width + textHorMargin * 2 + textWidth;
ctx.textBaseline = 'middle'; // not put the text in the vertical center
ctx.textAlign = 'left'; // align to the left
const textX = canvas.width + 8; // start with the text off screen to the right
let textOffset = 0; // how far the text has moved

// const reset = () => {
//   ctx.font = `${Math.floor(canvas.height * 0.8)}px arial`;
// size the font to 80% of canvas height
//   textWidth = ctx.measureText(textToDisplay).width; // get the text width
//   totalTextSize = canvas.width + textHorMargin * 2 + textWidth;
//   textX = canvas.width + 8; // start with the text off screen to the right
//   textOffset = 0; // how far the text has moved
//   ctx.textBaseline = 'middle'; // not put the text in the vertical center
//   ctx.textAlign = 'left'; // align to the left
// };

let startTime;
// this function is call once a frame which is approx 16.66 ms (60fps)
function update(time) {
  // time is passed by requestAnimationFrame
  try {
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
  } catch (error) {
    /*eslint-disable */
    console.log(error);
    /* eslint-enable */
  }
}

requestAnimationFrame(update); // to start request the first frame

/* End of stackoverflow example Simple animation with 2d context and requestAnimationFrame */

exampleRunning = true;
