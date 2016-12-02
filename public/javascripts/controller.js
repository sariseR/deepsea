var canvas = document.getElementById("controllerCanvas");
var ctx  = canvas.getContext("2d");
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var lastTimestamp = null;
var socket = io.connect();  //socket IO
var canvasRect = canvas.getBoundingClientRect(); //キャンバスを取得

window.addEventListener("load", init);

var roomID = "";    //入室した部屋のID

var mouseX; //マウスのX座標
var mouseY; //マウスのY座標
var pointFlg = false;   //マウス(タッチ)が押されているか



//初期化
function init(){
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    
    Asset.loadAssets(function(){
        requestAnimationFrame(update);     
    });
    
    testItem = new TestItem(0, 0);
}//初期化 end



//更新処理
function update(timestamp){
    //遅延によるずれをなくす
    var delta = 0;
    if(lastTimestamp != null){
        delta = (timestamp -lastTimestamp)/ 1000;
    }
    lastTimestamp = timestamp;
    
    
    console.log(testItem.onColli());
    if(testItem.onColli()){
        testItem.setX(mouseX);
        testItem.setY(mouseY);
    }
    
    requestAnimationFrame(update);
    render();
}//更新処理 end



//再描画
function render(){
    //全体をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //背景を表示
    ctx.drawImage(Asset.images["back"], 0, 0);
    
    //箱を表示
    testItem.draw();
    
}//再描画 end


//オブジェト
//TestItem
var TestItem = (function(){
    
    //コンストラクタ
    var TestItem = function(x, y){
        if(!(this instanceof TestItem)){
            return new TestItem(x, y);
        }
        this._x = 100;
        this._y = 200;
        this._width = Asset.images["box"].width;
        this._height = Asset.images["box"].height;
        this._colli = false;
    }

    var p = TestItem.prototype;
    
    p.draw = function(){
        ctx.drawImage(Asset.images["box"], this._x, this._y);
    }
    
    p.onColli = function(){
        if(this._x <= mouseX && this._width + this._x >= mouseX && this._y <= mouseY && this._height >= mouseY){
            this._colli = true;
        }else{
            this._colli = false;
        }
        console.log("collision:" + this._colli);
        return this._colli;
    }
    
    //setter
    p.setX = function(x){
        this._x = x;
    };

    p.setY = function(y){
        this._y = y;
    };
    
    //getter
    p.getX = function(){
        return this._x;
    }
    
    p.getY = function(){
        return this._y;
    }
    
    return TestItem;
})();//TestItem end
//オブジェト end



//画像
var Asset = {};

//アセットの定義
Asset.assets = [
    {type: "image", name: "back", src:"../images/back.png"},
    {type: "image", name: "box", src:"../images/box.png"}
];

//読み込んだ画像
Asset.images = {};

//アセットの読み込み
Asset.loadAssets = function(onComplete){
    var total = Asset.assets.length;    //アセットの合計数
    var loadCount = 0;  //読み込みが完了したアセット数
    
    //アセットが読み込み終わった時に呼ばれるコールバック関数
    var onLoad = function(){   
        loadCount++;    //読み込み完了数を1つ足すKr
        if(loadCount >= total){
            //全てのアセットの読み込みが終わった
            onComplete();
        }
    };
    
    //全てアセットを読み込み
    Asset.assets.forEach(function(asset){
       switch(asset.type){
           case "image":
               Asset._loadImage(asset, onLoad);
               break;
       }
    });
};

//画像の読み込み
Asset._loadImage = function(asset, onLoad){
    var image = new Image();
    image.src = asset.src;
    image.onload = onLoad;
    Asset.images[asset.name] = image;
};
//画像 end



//socketIO
//roomIDを取得
(function(){
    var tmp = location.hash;
    var tmpArray = tmp.split("#");
    roomID = tmpArray[1];
    console.log(roomID + " from controller");
    if(roomID){
        socket.emit("ctsCon", {value: roomID});     //roomIDをサーバに送信
    }
})();
//socketIO end



//イベント
//(function(){
if(canvas != null){
    function onDown(e){ //クリックが押された時
        pointFlg = true;
        console.log("pointFlg: " + pointFlg);
    }

    function onUp(e){   //クリックが離された時
        pointFlg = false;
        console.log("pointFlg: " + pointFlg);
    }

    function onPointMove(e){
        if(pointFlg == true){   //マウスが押されている時はマウスに追従する
            mouseX = e.clientX - canvasRect.left;
            mouseY = e.clientY - canvasRect.top;

            e.preventDefault();
            console.log("point追従");
        } 
    }

    //イベント開始
    //マウスイベント
    canvas.addEventListener("mousedown", onDown, false);
    canvas.addEventListener("mouseup", onUp, false);
    canvas.addEventListener("mousemove", onPointMove, false);

    //タッチイベント
//    canvas.addEventListener("touchstart", onDown, false);
//    canvas.addEventListener("touchend", onUP, false);
//    canvas.addEventListener("touchmove", onPointMove, false);
}
//})();//イベント end
