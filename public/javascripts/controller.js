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
const titleWidth = '240';
const titleHeight = '480';

// 画像
var conBackImg = new Image(); // 背景
conBackImg.src = 'images/controller_back.png';
var titleImg = new Image();
titleImg.src = 'images/title.png';
//ボタン
var offLeftImg = new Image();
offLeftImg.src = 'images/offLeftBtn.png';
var offRightImg = new Image();
offRightImg.src = 'images/offRightBtn.png';
var offJumpImg = new Image();
offJumpImg.src = 'images/offJumpBtn.png';
var offShotImg = new Image();
offShotImg.src = 'images/offShotBtn.png';

var onLeftImg = new Image();
onLeftImg.src = 'images/onLeftBtn.png';
var onRightImg = new Image();
onRightImg.src = 'images/onRightBtn.png';
var onJumpImg = new Image();
onJumpImg.src = 'images/onJumpBtn.png';
var onShotImg = new Image();
onShotImg.src = 'images/onShotBtn.png';



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
    // for(var i = 0; i < 4; i++){
    //   // ボタンを4つ生成
    //   btns.push(new Btn(i, SCREEN_WIDTH / 3, (SCREEN_HEIGHT / 4) * i));
    // }

    // ボタンを4つ生成
    btns.push(new Btn(0, SCREEN_WIDTH / 4 - 100, 100, offLeftImg.width, offLeftImg.height)); // leftBtn
    btns.push(new Btn(1, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4 - 50, offRightImg.width, offRightImg.height)); // rightBtn
    btns.push(new Btn(2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 50, offJumpImg.width, offJumpImg.height)); // jumpBtn
    btns.push(new Btn(3, SCREEN_WIDTH / 4 - 100, (SCREEN_HEIGHT / 4 ) * 3 - 50, offShotImg.width, offShotImg.height));  // shotBtn


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

    //コントローラ背景を描画
    ctx.drawImage(conBackImg, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // タイトル画像描画
    ctx.drawImage(titleImg, SCREEN_WIDTH / 3 - titleImg.width / 2, SCREEN_HEIGHT / 2 - titleHeight / 2, titleWidth, titleHeight);

    // ボタン4つを表示
    var offBtnImages = new Array(offLeftImg, offRightImg, offJumpImg, offShotImg);
    var onBtnImages = new Array(onLeftImg, onRightImg, onJumpImg, onShotImg);
    for(var i = 0; i < offBtnImages.length; i++) {
      if(!touchFlg[i]) {
        btns[i].draw(ctx, offBtnImages[i]);
      } else{
        btns[i].draw(ctx, onBtnImages[i]);
      }
    }

}


var touchFlg = [];

function onDown(e) {
  // for(var i = 0; i < touchFlg.length; i++){
  //   if((e.touches[0].pageY - canvasRect.top) > (SCREEN_HEIGHT / 4) * i &&
  //   (e.touches[0].pageY - canvasRect.top) < (SCREEN_HEIGHT / 4) * (i + 1)) {
  //     pointX = 3000;
  //     touchFlg[i] = true;
  //     touchPoint_1 = i;
  //   }
  //   if(e.touches.length==2){
  //   if((e.touches[1].pageY - canvasRect.top) > (SCREEN_HEIGHT / 4) * i &&
  //   (e.touches[1].pageY - canvasRect.top) < (SCREEN_HEIGHT / 4) * (i + 1)) {
  //     pointX = 3000;
  //     touchFlg[i] = true;
  //     touchPoint_2 = i;
  //   }
  //   }
  // }

  for(var i = 0; i < touchFlg.length; i++) {
    if(btns[i].hitBoxFlg(e.touches[0].pageX, e.touches[0].pageY)) {
      pointX = 3000;
      touchFlg[i] = true;
      touchPoint_1 = i;
    }
    if(e.touches.length==2) {
      if(btns[i].hitBoxFlg(e.touches[1].pageX, e.touches[1].pageY)) {
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
    if(e.touches.length == 1) {
      for(var i = 0; i < touchFlg.length; i++) {
        if(btns[i].hitBoxFlg(e.touches[1].pageX, e.touches[1].pageY)) {
          touchFlg[i] = false;
        }
      }
    } else if(e.touches.length == 0) {
      for(var i = 0; i < touchFlg.length; i++) {
        if(touchFlg[i]) {
          touchFlg[i] = false;
        }
      }
    }
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



    // if(e.touches.length==1){
        //touchFlg[touchPoint_2]=false;
    //     for(var i = 0; i < touchFlg.length; i++){
    //         if(!((e.touches[0].pageY - canvasRect.top) > (SCREEN_HEIGHT / 4) * i &&
    //         (e.touches[0].pageY - canvasRect.top) < (SCREEN_HEIGHT / 4) * (i + 1))) {
    //             touchFlg[i] = false;
    //         }
    //     }
    // }
    // else if(e.touches.length ==0){
    //     for(var i = 0; i < touchFlg.length; i++){
    //         if(touchFlg[i]) {
    //         touchFlg[i] = false;
    //         }
    //     }
    // }

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
