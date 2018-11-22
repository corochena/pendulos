var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var h = c.getAttribute("width") / 2;
var l = 0.8 * c.getAttribute("height"); // 375 pixels = 0.357 m, aprox 1050 to 1
var radius = 17;
var shift = 10;
var persp = 1.8;
var dt = 10;
var i = 0;
var ang;
var str = "";
var cexp = 1;

function draw() {
  var angIni = Math.PI / 20 * Number(document.getElementById("angIni").value);
  var nBolas = Number(document.getElementById("nBolas").value);
  var cycles = Number(document.getElementById("nCiclos").value);
  var acc = Number(document.getElementById("desacc").value);
  var numeros = document.getElementById("numeros");
  console.log(numeros.checked);

  // draw white rectangle
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 2 * h, l / 0.8);

  // draw the balls
  for (var k = 0; k < nBolas; k++) {
    //get the angle
    //ang = angIni * Math.cos(Math.sqrt(9.8 / (l-k*shift) * 1050)*i*dt/1000);
    ang =
      cexp *
      angIni *
      Math.cos((cycles + k) / cycles * Math.sqrt(3 / l * 1050) * i * dt / 1000);
    cexp = Math.exp(-i / 10000 * acc);
    // get the center position
    var x = (l - k * shift * persp) * Math.sin(ang) + h;
    var y = (l - k * shift * persp) * Math.cos(ang);
    ctx.beginPath();
    ctx.arc(x, y, radius - k / 3, 0, 2 * Math.PI);
    if (k % 2 == 0) {
      str = (k / 2 + "").repeat(6);
    }
    ctx.fillStyle = "#" + str;
    ctx.fill();
    // draw the line
    ctx.beginPath();
    ctx.moveTo(h, 0);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#" + str;
    ctx.stroke();
    // draw the ball number
    if (numeros.checked) {
      ctx.font = "13px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(k + 1, x - radius / 3, y + radius / 3);
    }
  }
  i++;
}

window.setInterval(draw, dt);