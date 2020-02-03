import { framesCash } from './new_frames.js';
import { removeCanvas } from './animation_preview.js';

const video = document.getElementById('video');
const stop = document.getElementById('stop');
const start = document.getElementById('start');
let anim = true;

const btn6fps = document.getElementById('6fps');
const btn12fps = document.getElementById('12fps');
const btn24fps = document.getElementById('24fps');
let currentFps = Math.round(1000 / 6);

function continueAnimation() {
  return anim;
}

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
    current += 1;
  }, fps);
}

function btnAnimation() {
  if (start.hasAttribute('disabled', 'true')) {
    start.removeAttribute('disabled', 'true');
    stop.setAttribute('disabled', 'true');
    start.className = 'animation__off';
    stop.className = 'animation__on';
  } else {
    start.setAttribute('disabled', 'true');
    stop.removeAttribute('disabled', 'true');
    start.className = 'animation__on';
    stop.className = 'animation__off';
  }
}

start.addEventListener('click', () => {
  anim = true;
  btnAnimation();
  printNumbers(0, framesCash.length - 1, currentFps);
});

stop.addEventListener('click', () => {
  anim = false;
  btnAnimation();
});

function clearClassFps() {
  btn6fps.className = '';
  btn12fps.className = '';
  btn24fps.className = '';
}

btn6fps.addEventListener('click', () => {
  clearClassFps();
  btn6fps.className = 'current__FPS';
  currentFps = Math.round(1000 / 6);
});
btn12fps.addEventListener('click', () => {
  clearClassFps();
  btn12fps.className = 'current__FPS';
  currentFps = Math.round(1000 / 12);
});
btn24fps.addEventListener('click', () => {
  clearClassFps();
  btn24fps.className = 'current__FPS';
  currentFps = Math.round(1000 / 24);
});

const fullscreenMode = document.getElementById('fs');

document.cancelFullScreen = document.cancelFullScreen
  || document.webkitCancelFullScreen
  || document.mozCancelFullScreen;

function onFullScreenEnter() {
  /*eslint-disable */

  console.log("Enter fullscreen initiated from iframe");
}

function onFullScreenExit() {
  console.log("Exit fullscreen initiated from iframe");
  /* eslint-enable */
}

// function exitFullscreen(id) {
//   onFullScreenExit(id);
//   document.cancelFullScreen();
//   document.querySelector(`#${id} button`).onclick = () => {
//     enterFullscreen(id);
//   };
// }

function enterFullscreen(id) {
  onFullScreenEnter(id);
  const el = document.getElementById(id);
  // const onfullscreenchange = () => {
  //   const fullscreenElement = document.fullscreenElement
  //     || document.mozFullscreenElement
  //     || document.webkitFullscreenElement;
  //   const fullscreenEnabled = document.fullscreenEnabled
  //     || document.mozFullscreenEnabled
  //     || document.webkitFullscreenEnabled;
  // };

  el.addEventListener('webkitfullscreenchange', document.fullscreenElement);
  el.addEventListener('mozfullscreenchange', document.fullscreenElement);
  el.addEventListener('fullscreenchange', document.fullscreenElement);

  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    el.mozRequestFullScreen();
  }
  document.querySelector(`#${id} button`).onclick = () => {
    onFullScreenExit(id);
    document.cancelFullScreen();
    document.querySelector(`#${id} button`).onclick = () => {
      enterFullscreen(id);
    };
  };
}

fullscreenMode.addEventListener('click', () => {
  enterFullscreen('video');
  removeCanvas();
});
