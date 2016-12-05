var pointX;
var pointY;
var touchFlg = [];

function onDown(e) {
  for(var i = 0; i < touchFlg.length; i++){
    if((e.touches[0].pageY - canvasRect.top) > (SCREEN_HEIGHT / 4) * i &&
    (e.touches[0].pageY - canvasRect.top) < (SCREEN_HEIGHT / 4) * (i + 1)) { // どこのボタンがタッチされたとき
      pointX = 3000;
      touchFlg[i] = true;
    }
  }
}

function onUp(e) {
  for(var i = 0; i < touchFlg.length; i++){
    if(touchFlg[i]) {
      // touchFlg[i] = false;
    }
  }
}

function onMove(e) {
  pointX = e.clientX - canvasRect.left;
  pointY = e.clientY - canvasRect.top;
}

canvas.addEventListener("mousedown", onDown, false);
canvas.addEventListener("mouseup", onUp, false);
// canvas.addEventListener("mousemove", onMove, false);

canvas.addEventListener("touchstart", onDown, false);
canvas.addEventListener("touchend", onUp, false);
// canvas.addEventListener('touchmove', onMove, false);
