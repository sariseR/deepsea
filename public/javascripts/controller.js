const canvas = document.getElementById('controllerCanvas');
const ctx  = canvas.getContext('2d');
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const socket = io.connect();  //socket IO
const canvasRect = canvas.getBoundingClientRect(); //キャンバスを取得
let lastTimestamp = null;

window.addEventListener('load', init);

var room;
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
    // socketSignalはあとで設定
    // socket.emit( , touchFlg);

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
