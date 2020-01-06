import { framesCash } from "./new_frames.js";

let video = document.getElementById("video");
let stop = document.getElementById("stop");
let start = document.getElementById("start");
let anim = true;

export function printNumbers(from, to, fps) {
  let current = from;

  setTimeout(function go() {
    video.style.backgroundImage = `url('${framesCash[current]}')`;
    if (current < to && anim === true) {
      setTimeout(go, fps);
    } else if (current >= to) {
      printNumbers(0, framesCash.length - 1, currentFps);
    }
    continueAnimation();
    current++;
  }, fps);
}

start.addEventListener("click", () => {
  anim = true;
  start.className = "animation__on";
  start.setAttribute("disabled", "true");
  stop.removeAttribute("disabled", "true");
  stop.className = "animation__off";
  printNumbers(0, framesCash.length - 1, currentFps);
});

stop.addEventListener("click", () => {
  start.setAttribute("disabled", "true");
  start.removeAttribute("disabled", "true");
  start.className = "";
  stop.className = "";
  anim = false;
});

function continueAnimation() {
  return anim;
}

let btn6fps = document.getElementById("6fps");
let btn12fps = document.getElementById("12fps");
let btn24fps = document.getElementById("24fps");
let currentFps = Math.round(1000 / 6);

btn6fps.addEventListener("click", () => {
  clearClassFps();
  btn6fps.className = "current__FPS";
  currentFps = Math.round(1000 / 6);
});
btn12fps.addEventListener("click", () => {
  clearClassFps();
  btn12fps.className = "current__FPS";
  currentFps = Math.round(1000 / 12);
});
btn24fps.addEventListener("click", () => {
  clearClassFps();
  btn24fps.className = "current__FPS";
  currentFps = Math.round(1000 / 24);
});

function clearClassFps() {
  btn6fps.className = "";
  btn12fps.className = "";
  btn24fps.className = "";
}
