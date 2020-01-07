import { framesCash } from "./new_frames.js";
import { removeCanvas } from "./animation_preview.js";

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
  btnAnimation();
  printNumbers(0, framesCash.length - 1, currentFps);
});

stop.addEventListener("click", () => {
  anim = false;
  btnAnimation();
});

function btnAnimation() {
  if (start.hasAttribute("disabled", "true")) {
    start.removeAttribute("disabled", "true");
    stop.setAttribute("disabled", "true");    
    start.className = "animation__off";
    stop.className = "animation__on";
  } else {
    start.setAttribute("disabled", "true");
    stop.removeAttribute("disabled", "true");
    start.className = "animation__on";
    stop.className = "animation__off";
  }
}

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

let fullscreenMode = document.getElementById("fs");

fullscreenMode.addEventListener("click", () => {
  enterFullscreen("video");
  removeCanvas();
});

document.cancelFullScreen =
  document.cancelFullScreen ||
  document.webkitCancelFullScreen ||
  document.mozCancelFullScreen;

function onFullScreenEnter() {
  console.log("Enter fullscreen initiated from iframe");
}

function onFullScreenExit() {
  console.log("Exit fullscreen initiated from iframe");
}

function enterFullscreen(id) {
  onFullScreenEnter(id);
  var el = document.getElementById(id);
  var onfullscreenchange = function(e) {
    var fullscreenElement =
      document.fullscreenElement ||
      document.mozFullscreenElement ||
      document.webkitFullscreenElement;
    var fullscreenEnabled =
      document.fullscreenEnabled ||
      document.mozFullscreenEnabled ||
      document.webkitFullscreenEnabled;
  };

  el.addEventListener("webkitfullscreenchange", onfullscreenchange);
  el.addEventListener("mozfullscreenchange", onfullscreenchange);
  el.addEventListener("fullscreenchange", onfullscreenchange);

  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    el.mozRequestFullScreen();
  }
  document.querySelector("#" + id + " button").onclick = function() {
    exitFullscreen(id);
  };
}

function exitFullscreen(id) {
  onFullScreenExit(id);
  document.cancelFullScreen();
  document.querySelector("#" + id + " button").onclick = function() {
    enterFullscreen(id);
  };
}
