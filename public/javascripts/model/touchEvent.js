var pointX;
var pointY;
var pointFlg;

function onDown(e) {
  pointFlg = true;
    // console.log("pointFlg: " + this.pointFlg);
}

function onUp(e) {
  pointFlg = false;
    // console.log("pointFlg: " + this.pointFlg);
}

function onMove(e) {
  pointX = e.clientX - canvasRect.left;
  pointY = e.clientY - canvasRect.top;
}

canvas.addEventListener("mousedown", onDown, false);
canvas.addEventListener("mouseup", onUp, false);
canvas.addEventListener("mousemove", onMove, false);

// canvas.addEventListener("touchstart", onDown, false);
// canvas.addEventListener("touchend", onUP, false);
// canvas.addEventListener("touchmove", onMove, false);
