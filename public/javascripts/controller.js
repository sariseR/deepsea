const canvas = document.getElementById('controllerCanvas');
const ctx  = canvas.getContext('2d');
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const socket = io.connect();  //socket IO
const canvasRect = canvas.getBoundingClientRect(); //キャンバスを取得
let lastTimestamp = null;

window.addEventListener('load', init);

var room; //部屋オブジェクト

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
    pointFlg = false;

    room = new Room();
    btn = new Btn();
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

    console.log('pointX:' + Math.floor(pointX));

    requestAnimationFrame(update);
    render();
}

//再描画
function render() {
    //全体をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    btn.draw(ctx);

    //背景を表示
    // ctx.drawImage(Asset.images['back'], 0, 0);
}
