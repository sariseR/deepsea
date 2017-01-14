const canvas = document.getElementById('controllerCanvas');
const ctx  = canvas.getContext('2d');
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const socket = io.connect();  //socket IO
const canvasRect = canvas.getBoundingClientRect(); //キャンバスを取得
let lastTimestamp = null;

window.addEventListener('load', init);
var touchPoint_1;
var touchPoint_2;
var room;
var id = null;//プレイヤーのid
var btns = new Array();


// スクロールを禁止
$(window).on('touchmove.noScroll', function(e) {
    e.preventDefault();
});


//初期化
function init() {
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    pointX = 0;
    pointY = 0;

    room = new Room();
    for(var i = 0; i < 4; i++){
      // ボタンを4つ生成
      btns.push(new Btn(i, 0, (SCREEN_HEIGHT / 4) * i));
    }

    touchFlg = new Array(false, false, false, false);
    // touchFlg = new Array();

    console.log(room.spliteSharp() + ' from controller');
    //roomIDをサーバに送信
    socket.emit(SocketSignals.ctsCon(), {value: room.getId()});
    
    socket.on(SocketSignals.stcMainPlayerLogin(),function(data) {
        if(id == null){
            id = data.value;//idが登録されていなければidを登録する
        }
        console.log('player '+data.value+' login!');
    });

    // Asset.loadAssets(function(){
    //     requestAnimationFrame(update);
    // });
    requestAnimationFrame(update);
}


//更新処理
function update(timestamp) {
    //遅延によるずれをなくす
    var delta = 0;
    if(lastTimestamp != null){
        delta = (timestamp - lastTimestamp)/ 1000;
    }
    lastTimestamp = timestamp;

    // タップのフラグをサーバに投げる
    // socket.emit(SocketSignals.ctsConTouch(), {value: touchFlg});

    requestAnimationFrame(update);
    render();
}

//再描画
function render() {
    //全体をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ボタン4つを表示
    for(var i = 0; i < btns.length; i++){
      btns[i].draw(ctx);
    }

    for(var i = 0; i < touchFlg.length; i++){
      var tmp = 0;
      if(touchFlg[i]){
        tmp = 200;
      }

      ctx.fillRect(i * 100, 10, 50, 50 + tmp);
    }
    //背景を表示
    // ctx.drawImage(Asset.images['back'], 0, 0);
}

var touchFlg = [];

function onDown(e) {
  for(var i = 0; i < touchFlg.length; i++){
    if((e.touches[0].pageY - canvasRect.top) > (SCREEN_HEIGHT / 4) * i &&
    (e.touches[0].pageY - canvasRect.top) < (SCREEN_HEIGHT / 4) * (i + 1)) {
      pointX = 3000;
      touchFlg[i] = true;
      touchPoint_1 = i;
    }
    if(e.touches.length==2){  
    if((e.touches[1].pageY - canvasRect.top) > (SCREEN_HEIGHT / 4) * i &&
    (e.touches[1].pageY - canvasRect.top) < (SCREEN_HEIGHT / 4) * (i + 1)) {
      pointX = 3000;
      touchFlg[i] = true;
      touchPoint_2 = i;
    }
    }
  }
  // タッチイベントをサーバに送信
  socket.emit(SocketSignals.ctsConTouch(), {value: touchFlg,id: id});
}

function onUp(e) {
    /*
      for(var i = 0; i < touchFlg.length; i++){
    if((e.changedTouches[0].pageY - canvasRect.top) > (SCREEN_HEIGHT / 4) * i &&
    (e.changedTouches[0].pageY - canvasRect.top) < (SCREEN_HEIGHT / 4) * (i + 1)) {
      pointX = 3000;
      touchFlg[i] = false;
      touchPoint_1 = i;
    }
      
    if((e.changedTouches[1].pageY - canvasRect.top) > (SCREEN_HEIGHT / 4) * i &&
    (e.changedTouches[1].pageY - canvasRect.top) < (SCREEN_HEIGHT / 4) * (i + 1)) {
      pointX = 3000;
      touchFlg[i] = false;
      touchPoint_2 = i;
    }
  }*/
    
    if(e.touches.length==1){
        //touchFlg[touchPoint_2]=false;
        for(var i = 0; i < touchFlg.length; i++){
            if(!((e.touches[0].pageY - canvasRect.top) > (SCREEN_HEIGHT / 4) * i &&
            (e.touches[0].pageY - canvasRect.top) < (SCREEN_HEIGHT / 4) * (i + 1))) {
                touchFlg[i] = false;
            }
        }
    }
    else if(e.touches.length ==0){
        for(var i = 0; i < touchFlg.length; i++){
            if(touchFlg[i]) {
            touchFlg[i] = false;
            }
        }
    }
    /*
  for(var i = 0; i < touchFlg.length; i++){
    if(touchFlg[i]) {
      touchFlg[i] = false;
    }
  }
  */
  // タッチイベントをサーバに送信
  socket.emit(SocketSignals.ctsConTouch(), {value: touchFlg,id: id});
}

canvas.addEventListener("mousedown", onDown, false);
canvas.addEventListener("mouseup", onUp, false);

canvas.addEventListener("touchstart", onDown, false);
canvas.addEventListener("touchend", onUp, false);

