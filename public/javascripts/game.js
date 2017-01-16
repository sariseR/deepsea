const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const SCREEN_WIDTH = window.innerWidth + 1;
const SCREEN_HEIGHT = window.innerHeight;
const ROOM_ADDRESS = 'http://deepsea-rp.herokuapp.com';  // PC側のアドレス
//const ROOM_ADDRESS = 'http://192.168.1.5:3000';  // PC側のアドレス
var socket = io.connect();  //socket IO
var lastTimestamp = null;
var room; //部屋オブジェクト
var players = new Array();  // プレイヤオブジェクトの配列
var mousePless = false;//マウスが押されているかどうか
var mouse = new Point();//マウスの座標を記憶するオブジェクトを生成
var startflag = false;//対戦開始フラグ
var finishflag = false;//対戦終了フラフ
var winPlayerId = 0;//生き残ったプレイヤーのid
var playerCount=0;//生存プレイヤー人数
var babbleTimer = 1;//泡タイマー
var babbleX=0;
canvas.addEventListener('mousemove', mouseMove, true);//マウス座標取得リスナ
canvas.addEventListener('mousedown', mouseDown, true);//マウス押し込み取得リスナ
canvas.addEventListener('mouseup', mouseUp, true);//マウス離し取得リスナ
var bullets = new Array();  // 弾丸オブジェクトの配列
var testCount;//動作確認用カウンター
window.addEventListener('load', init);
var backImage = new Image();
backImage.src = "images/back.png";
var image_0 = new Image();
image_0.src = "images/0.png";
var image_1 = new Image();
image_1.src = "images/1.png";
var image_2 = new Image();
image_2.src = "images/2.png";
var image_3 = new Image();
image_3.src = "images/3.png";
var image_4 = new Image();
image_4.src = "images/4.png";
var image_5 = new Image();
image_5.src = "images/5.png";
var image_6 = new Image();
image_6.src = "images/6.png";
var startImage = new Image();
startImage.src = "images/start.png";
var restartImage = new Image();
restartImage.src = "images/restart.png";
var winImage = new Image();
winImage.src = "images/win.png";
var mizunomiImage = new Image();
mizunomiImage.src = "images/mizunomi.png";
var titleImage = new Image();
titleImage.src = "images/title-normal.png";

function Point(){//プレイヤーのマウスの座標を格納するクラス(随時拡張予定)
    this.x = 0;
    this.y = 0;
}
//初期化
function init() {
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    testCount = 0;
    room = new Room();
    // var assetManager = new AssetManager();

    //メイン画面が生成されたことをサーバに報告
    socket.emit(SocketSignals.ctsMainStart());
    //サーバからルームIDを取得
    socket.on(SocketSignals.stcMainRoomID(), function(data) {
        room.setId(data.value);
        console.log(data.value);
        $('#qrcode').qrcode(room.url());
        //$('#conUrl').append('<p><a href=' + room.url() + '>controller</a></p>');
        console.log('success in ' + room.getId());
        console.log('canvas size '+canvas.width+":"+canvas.height);
    });

    socket.on(SocketSignals.stcMainPlayerLogin(),function(data) {
        players.push(new Player(data.value,canvas.width,canvas.height));//プレイヤーを追加
        console.log('player '+data.value+' login!');
    });
        socket.on(SocketSignals.stcConTouchFlg(), function(data) {
      var touchFlg = data.value;
      var conId = data.id;
      console.log('touchFlg: ' + touchFlg[0]);
      if(players.length >= 1) {
        for(var i = 0; i <  players.length; i++) {
            if(players[i].getplayerId()==conId){
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
      }
    });
    
    //切断検知
    　socket.on(SocketSignals.stcDisconnectInfo(),function(data){
         console.log('disconnet!');
         for(var i = players.length-1; i>=0;i--){
             if(players[i].getplayerId()==data.playerId){
                 console.log('player'+players[i].getplayerId()+'が切断しました');
                 players.splice(i,1);
             }
         }
     })
    
    requestAnimationFrame(update);
}

//更新処理
function update(timestamp) {
    var delta = 0;
    
    if(players.length>1&&mouse.x>=SCREEN_WIDTH/2-70&&mouse.x<=SCREEN_WIDTH/2-70+140&&mouse.y>=SCREEN_HEIGHT/2+20&&mouse.y<=SCREEN_HEIGHT/2+20+30&&mousePless==true&&startflag==false){
        startflag=true;
        finishflag=false;
        for(var i = 0; i < players.length; i++ ){
            players[i].reset();
        }
        //弾丸オブジェクトが存在する場合全て削除する
        if(bullets.length != 0){
            bullets.length = 0;
        }
    }
    
    if(lastTimestamp != null) {
        delta = (timestamp -lastTimestamp) / 1000;
    }
    lastTimestamp = timestamp;
    
    if(finishflag == true){
        startflag =false;
    }
    //ゲームが開始している場合の処理
    else if(startflag==true){
    //プレイヤの更新処理を行う
    for(var i = 0; i < players.length; i++) {
        if(players[i].getAlive()==true){//プレイヤが生存していれば
            players[i].update();
            if(players[i].getShotStartFlag()==true){//i番目のプレイヤがショットを行なっている場合
                bullets.push(new Bullet(players[i].getPosX()+players[i].getDir()*15,players[i].getPosY()-20,players[i].getDir(),players[i].getplayerId()));
                players[i].setShotFin();
            }
        }
    }   
    //弾丸の更新処理
    for(var i = 0; i < bullets.length; i++) {
        bullets[i].update();
        
        //各プレイヤーと弾丸の当たり判定を取る(複雑になる場合メソッド化)
        
        for(var j = 0;j < players.length; j++){
            if(players[j].getPosX()+24>bullets[i].getPosX()&&players[j].getPosX()-24<bullets[i].getPosX()
              &&players[j].getPosY()+24>bullets[i].getPosY()&&players[j].getPosY()-24<bullets[i].getPosY()){
                console.log('hit!!');
                //弾丸とidが一致しない場合
                if(bullets[i].getPlayerId() != players[j].getplayerId()){
                    players[j].setAlive(false);
                    //console.log('hit!!');
                }
            }
        }
        
    }
        
    //終了判定***********************************************
    playerCount = 0;
    for(var i = 0 ;i < players.length ; i++){
        if(players[i].getAlive()){
            playerCount++;
            winPlayerId = players[i].getplayerId();//生き残っている場合idを記憶
        }
    }
    if(playerCount<=1){
        finishflag = true;
    }
    //******************************************************
    /*
    socket.on(SocketSignals.stcConTouchFlg(), function(data) {
      var touchFlg = data.value;
      var conId = data.id;
      console.log('touchFlg: ' + touchFlg[0]);
      if(players.length >= 1) {
        for(var i = 0; i <  players.length; i++) {
            if(players[i].getplayerId()==conId){
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
      }
    });
    */
        //bullets.push(new Bullet(Math.floor( Math.random() *canvas.width ),canvas.height+20,0,0)) ;
        babbleTimer++;
        if(babbleTimer>=245-canvas.width/20){
            babbleTimer=0;
            babbleX=Math.floor( Math.random() *canvas.width );
        }
        if(babbleTimer<=30){
            bullets.push(new Bullet(babbleX+(Math.floor( Math.random() *50)-25),canvas.height+20,0,0)) ;
        }
    }

    requestAnimationFrame(update);
    render();
}

// 再描画
function render() {
    //全体をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = "rgba(0,0,0,1)";
    //ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    ctx.drawImage(backImage,0,0,canvas.width,canvas.height);

    //背景を表示
    // var back = new Image();
    // back.src = 'images/back.png';
    // ctx.drawImage(back, 0, 0);

    //各プレイヤーを描画
    for(var i = 0;i<players.length;i++){
        if(players[i].getAlive()){
            players[i].draw(ctx);
        }
    }
    
    for(var i = 0;i<bullets.length;i++){
        bullets[i].draw(ctx);
    }
        //終了描画
    if(finishflag == true){
        ctx.font = "24px 'ＭＳ Ｐゴシック'";
        ctx.fillStyle = "rgba(205,205,205,1)";
        //ctx.fillText(winPlayerId+"P WIN!!",SCREEN_WIDTH/2,SCREEN_HEIGHT/2);
        var numImage;
        switch(winPlayerId){
            case 0:
                numImage = image_0;
                break;
            case 1:
                numImage = image_1;
                break;
            case 2:
                numImage = image_2;
                break;
            case 3:
                numImage = image_3;
                break;
            case 4:
                numImage = image_4;
                break;
            case 5:
                numImage = image_5;
                break;
            case 6:
                numImage = image_6;
                break;
            default:
                numImage = image_0;
                break;
        }
        ctx.drawImage(numImage,SCREEN_WIDTH/2-60,SCREEN_HEIGHT/2-10,30,30);
        ctx.drawImage(winImage,SCREEN_WIDTH/2-70,SCREEN_HEIGHT/2-10,140,30);
        //ctx.fillText("RESTART",SCREEN_WIDTH/2,SCREEN_HEIGHT/2+45);
        //ctx.strokeRect(SCREEN_WIDTH/2-70,SCREEN_HEIGHT/2+20,140,30);
        if(mouse.x>=SCREEN_WIDTH/2-70&&mouse.x<=SCREEN_WIDTH/2-70+140&&mouse.y>=SCREEN_HEIGHT/2+20&&mouse.y<=SCREEN_HEIGHT/2+20+30){
        ctx.fillStyle = "rgba(205,205,205,0.2)";
        ctx.fillRect(SCREEN_WIDTH/2-70,SCREEN_HEIGHT/2+20,140,30);
        }
        ctx.drawImage(restartImage,SCREEN_WIDTH/2-70,SCREEN_HEIGHT/2+20,140,30);
    }
    else if(startflag==false){
    ctx.font = "24px 'ＭＳ Ｐゴシック'";
    ctx.fillStyle = "rgba(205,205,205,1)";
    ctx.strokeStyle = "rgba(205,205,250,1)";
    ctx.textAlign="center";
    //ctx.fillText(players.length+"人",SCREEN_WIDTH/2,SCREEN_HEIGHT/2);
            var numImage;
        switch(players.length){
            case 0:
                numImage = image_0;
                break;
            case 1:
                numImage = image_1;
                break;
            case 2:
                numImage = image_2;
                break;
            case 3:
                numImage = image_3;
                break;
            case 4:
                numImage = image_4;
                break;
            case 5:
                numImage = image_5;
                break;
            case 6:
                numImage = image_6;
                break;
            default:
                numImage = image_0;
                break;
        }
        ctx.drawImage(titleImage,SCREEN_WIDTH/2-100,SCREEN_HEIGHT/2-120,200,100);
        ctx.drawImage(numImage,SCREEN_WIDTH/2-75,SCREEN_HEIGHT/2-10,30,30);
        ctx.drawImage(mizunomiImage,SCREEN_WIDTH/2-60,SCREEN_HEIGHT/2-10,140,30);
        ctx.drawImage(startImage,SCREEN_WIDTH/2-70,SCREEN_HEIGHT/2+20,140,30);
    //ctx.fillText("START",SCREEN_WIDTH/2,SCREEN_HEIGHT/2+45);
    //ctx.strokeRect(SCREEN_WIDTH/2-70,SCREEN_HEIGHT/2+20,140,30);
        if(mouse.x>=SCREEN_WIDTH/2-70&&mouse.x<=SCREEN_WIDTH/2-70+140&&mouse.y>=SCREEN_HEIGHT/2+20&&mouse.y<=SCREEN_HEIGHT/2+20+30){
        ctx.fillStyle = "rgba(205,205,205,0.2)";
        ctx.fillRect(SCREEN_WIDTH/2-70,SCREEN_HEIGHT/2+20,140,30);
    }
    }

    
    
}
function mouseMove(event){
    var rect = canvas.getBoundingClientRect();
    // マウスカーソル座標の更新
    //mouse.x = event.clientX - canvas.offsetLeft;
    //mouse.y = event.clientY - canvas.offsetTop;  
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;  
}
function  mouseDown(event){
    mousePless = true;
}
function mouseUp(event){
    mousePless = false;
}
