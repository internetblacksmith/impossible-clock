import { digit, statusClass } from "./clock.js";

const display1 = document.getElementById("display-1");
const display2 = document.getElementById("display-2");
const body = document.getElementById("body");
const githubLogo = document.getElementById("github-logo");

const hourCheckbox = document.getElementById("input-show-hour");
const minuteCheckbox = document.getElementById("input-show-minute");
const secondCheckbox = document.getElementById("input-show-second");

const hours = d => d.getHours();
const minutes = d => d.getMinutes();
const seconds = d => d.getSeconds();

// setAttribute("class", ...) works uniformly for HTML and SVG elements,
// replacing the older `el.className.baseVal = ...` SVG-only API.
function setClass(el, value) {
  el.setAttribute("class", value);
}

function tick() {
  const d = new Date();
  const h = hourCheckbox.checked;
  const m = minuteCheckbox.checked;
  const s = secondCheckbox.checked;

  setClass(
    display1,
    `display-no-${digit(d, hours, 0, h)}-${digit(d, minutes, 0, m)}-${digit(d, seconds, 0, s)}`,
  );
  setClass(
    display2,
    `display-no-${digit(d, hours, 1, h)}-${digit(d, minutes, 1, m)}-${digit(d, seconds, 1, s)}`,
  );

  const status = statusClass(h, m, s);
  setClass(body, `body-${status}`);
  setClass(githubLogo, `github-logo-${status}`);
}

tick();
setInterval(tick, 1000);
