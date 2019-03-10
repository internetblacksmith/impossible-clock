var display1 = document.getElementById("display-1");
var display2 = document.getElementById("display-2");
var body = document.getElementById("body")

var digitBaseClass = "display-container display-size-12 display-no-";
var bodyBaseClass = "body-"

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

function bodyBackGround(id){
  if (isChecked(id)) {
    return "on";
  }
  return "off";
}

function setdisplays() {
  var d = new Date();
  display1.className = digitBaseClass + hDigit(d, 0) + "-" + mDigit(d, 0) + "-" + sDigit(d, 0);
  display2.className = digitBaseClass + hDigit(d, 1) + "-" + mDigit(d, 1) + "-" + sDigit(d, 1);
  var bodyClass = bodyBaseClass + bodyBackGround("input-show-hour") + "-" + bodyBackGround("input-show-minute") + "-" + bodyBackGround("input-show-second");
  body.className = bodyClass;
}
setInterval(setdisplays, 1000);
setdisplays();
