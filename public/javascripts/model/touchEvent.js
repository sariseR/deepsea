/*
var touchFlg = [];

function onDown(e) {
  for(var i = 0; i < touchFlg.length; i++){
    if((e.touches[0].pageY - canvasRect.top) > (SCREEN_HEIGHT / 4) * i &&
    (e.touches[0].pageY - canvasRect.top) < (SCREEN_HEIGHT / 4) * (i + 1)) {
      pointX = 3000;
      touchFlg[i] = true;
    }
  }
  // タッチイベントをサーバに送信
    id=1;
  socket.emit(SocketSignals.ctsConTouch(), {value: touchFlg,id: id});
}

function onUp(e) {
  for(var i = 0; i < touchFlg.length; i++){
    if(touchFlg[i]) {
      touchFlg[i] = false;
    }
  }
  // タッチイベントをサーバに送信
  socket.emit(SocketSignals.ctsConTouch(), {value: touchFlg,id: id});
}

canvas.addEventListener("mousedown", onDown, false);
canvas.addEventListener("mouseup", onUp, false);

canvas.addEventListener("touchstart", onDown, false);
canvas.addEventListener("touchend", onUp, false);
*/