const canvas = document.getElementById("controllerCanvas");
const ctx  = canvas.getContext("2d");
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const socket = io.connect();  //socket IO
const canvasRect = canvas.getBoundingClientRect(); //キャンバスを取得
let lastTimestamp = null;

window.addEventListener("load", init);

// var roomID = "";    //入室した部屋のID
var room;

let mouseX; //マウスのX座標
let mouseY; //マウスのY座標
var pointFlg = false;   //マウス(タッチ)が押されているか



//初期化
function init(){
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    room = new Room();
    console.log(room.spliteSharp() + " from controller");
    if(room.id){
        //roomIDをサーバに送信
        socket.emit("ctsCon", {value: room.id});
    }

    // Asset.loadAssets(function(){
    //     requestAnimationFrame(update);
    // });

    requestAnimationFrame(update);
}



//更新処理
function update(timestamp){
    //遅延によるずれをなくす
    var delta = 0;
    if(lastTimestamp != null){
        delta = (timestamp -lastTimestamp)/ 1000;
    }
    lastTimestamp = timestamp;


    requestAnimationFrame(update);
    render();
}

//再描画
function render(){
    //全体をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //背景を表示
    // ctx.drawImage(Asset.images["back"], 0, 0);
    var back = new Image();
    back.src = 'images/back.png';
    ctx.drawImage(back, 0, 0);

}

//
// //画像
// var Asset = {};
//
// //アセットの定義
// Asset.assets = [
//     {type: "image", name: "back", src:"../images/back.png"},
//     {type: "image", name: "box", src:"../images/box.png"}
// ];
//
//
// //読み込んだ画像
// Asset.images = {};
//
// //アセットの読み込み
// Asset.loadAssets = function(onComplete){
//     var total = Asset.assets.length;    //アセットの合計数
//     var loadCount = 0;  //読み込みが完了したアセット数
//
//     //アセットが読み込み終わった時に呼ばれるコールバック関数
//     var onLoad = function(){
//         loadCount++;    //読み込み完了数を1つ足すKr
//         if(loadCount >= total){
//             //全てのアセットの読み込みが終わった
//             onComplete();
//         }
//     };
//
//     //全てアセットを読み込み
//     Asset.assets.forEach(function(asset){
//        switch(asset.type){
//            case "image":
//                Asset._loadImage(asset, onLoad);
//                break;
//        }
//     });
// };
//
// //画像の読み込み
// Asset._loadImage = function(asset, onLoad){
//     var image = new Image();
//     image.src = asset.src;
//     image.onload = onLoad;
//     Asset.images[asset.name] = image;
// };
// //画像 end


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
