var currentdisplayNo = 0;
var display1 = document.getElementById('display-1');
var display2 = document.getElementById('display-2');

function zeroFill(string, length) {
  for (var i=0, l=length-string.length; i<l; i++) {
    string = '0' + string;
  }
  return string;
}

function setdisplays() {
  var d = new Date();
  var h = zeroFill(d.getHours().toString(),   2);
  var m = zeroFill(d.getMinutes().toString(), 2);
  var s = zeroFill(d.getSeconds().toString(), 2);

  var baseClass = 'display-container display-size-12 display-no-';

  display1.className = baseClass + h[0] + "-" + m[0] + "-" + s[0];
  display2.className = baseClass + h[1] + "-" + m[1] + "-" + s[1];

}

setInterval(setdisplays, 1000);
setdisplays();
