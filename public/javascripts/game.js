const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const SCREEN_WIDTH = window.innerWidth + 1;
const SCREEN_HEIGHT = window.innerHeight;
const ROOM_ADDRESS = 'http://localhost:3000';  // PC側のアドレス
var socket = io.connect();  //socket IO
var lastTimestamp = null;

var room; //部屋オブジェクト
var players = new Array();  // プレイヤオブジェクトの配列
//var bullets = new Array();  // 弾丸オブジェクトの配列
window.addEventListener('load', init);


//初期化
function init() {
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    room = new Room();
    // var assetManager = new AssetManager();

    //メイン画面が生成されたことをサーバに報告
    socket.emit(SocketSignals.ctsMainStart());
    //サーバからルームIDを取得
    socket.on(SocketSignals.stcMainRoomID(), function(data) {
        room.setId(data.value);
        console.log(data.value);
        $('#qrcode').qrcode(room.url());
        $('#conUrl').append('<p><a href=' + room.url() + '>controller</a></p>');
        console.log('success in ' + room.getId());
        console.log('canvas size '+canvas.width+":"+canvas.height);
    });

    socket.on(SocketSignals.stcMainPlayerLogin(),function(data) {
        players.push(new Player(data.value,canvas.width,canvas.height));//プレイヤーを追加
        console.log('player '+data.value+' login!');
    });

    requestAnimationFrame(update);
}

//更新処理
function update(timestamp) {
    var delta = 0;
    if(lastTimestamp != null) {
        delta = (timestamp -lastTimestamp) / 1000;
    }
    lastTimestamp = timestamp;
    //プレイヤの更新処理を行う
    for(var i = 0; i < players.length; i++) {
        players[i].update();
    }
    /*
    for(var i = 0; i < bullets.length; i++) {
        bullets[i].update();
    }*/

    socket.on(SocketSignals.stcConTouchFlg(), function(data) {
      var touchFlg = data.value;
      console.log('touchFlg: ' + touchFlg[0]);
      if(players.length >= 1) {
        for(var i = 0; i <  players.length; i++) {
          if(touchFlg[0]) {  // left
            players[i].setLeftFlag(true);
          }
          if(!touchFlg[0]) {
            players[i].setLeftFlag(false);
          }
          if(touchFlg[1]) {  // right
            players[i].setRightFlag(true);
          }
          if(!touchFlg[1]) {
            players[i].setRightFlag(false);
          }
          if(touchFlg[2]) {  // jump
            players[i].setJumpFlag(true);
          }
          if(!touchFlg[2]) {
            players[i].setJumpFlag(false);
          }
          if(touchFlg[3]) {  // shot
            players[i].setShotFlag(true);
          }
          if(!touchFlg[3]) {
            players[i].setShotFlag(false);
          }
        }
      }
    });

    requestAnimationFrame(update);
    render();
}

// 再描画
function render() {
    //全体をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    //背景を表示
    // var back = new Image();
    // back.src = 'images/back.png';
    // ctx.drawImage(back, 0, 0);

    //各プレイヤーを描画
    for(var i = 0;i<players.length;i++){
        players[i].draw(ctx);
    }
    /*
    for(var i = 0;i<bullets.length;i++){
        bullets[i].draw(ctx);
    }*/
}
