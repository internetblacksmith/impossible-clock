var display1 = document.getElementById("display-1");
var display2 = document.getElementById("display-2");
var body = document.getElementById("body");
var githubLogo = document.getElementById("github-logo");

var digitBaseClass = "display-no-";
var bodyBaseClass = "body-";
var githubLogoBaseClass = "github-logo-";

function zeroFill(string, length) {
  for (var i = 0, l = length - string.length; i < l; i++) {
    string = "0" + string;
  }
  return string;
}

function isChecked(checkbox) {
  return document.getElementById(checkbox).checked;
}

function zeroFilledHour(d) {
  return zeroFill(d.getHours().toString(), 2)
}

function zeroFilledMinute(d) {
  return zeroFill(d.getMinutes().toString(), 2)
}

function zeroFilledSecond(d) {
  return zeroFill(d.getSeconds().toString(), 2)
}

function hDigit(d, digit) {
  if (isChecked("input-show-hour")) {
    return zeroFilledHour(d)[digit];
  }
  return "10";
}

function mDigit(d, digit) {
  if (isChecked("input-show-minute")) {
    return zeroFilledMinute(d)[digit];
  }
  return "10";
}

function sDigit(d, digit) {
  if (isChecked("input-show-second")) {
    return zeroFilledSecond(d)[digit];
  }
  return "10";
}

function inputStatus(id){
  if (isChecked(id)) {
    return "on";
  }
  return "off";
}

function setdisplays() {
  var d = new Date();
  display1.className.baseVal = digitBaseClass + hDigit(d, 0) + "-" + mDigit(d, 0) + "-" + sDigit(d, 0);
  display2.className.baseVal = digitBaseClass + hDigit(d, 1) + "-" + mDigit(d, 1) + "-" + sDigit(d, 1);
  var statusClass = inputStatus("input-show-hour") + "-" + inputStatus("input-show-minute") + "-" + inputStatus("input-show-second");
  body.className = bodyBaseClass + statusClass;
  githubLogo.className = githubLogoBaseClass + statusClass;
}
setInterval(setdisplays, 1000);
setdisplays();
