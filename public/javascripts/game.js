var canvas;
var ctx;
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var lastTimestamp = null;
var socket = io.connect();  //socket IO 

window.addEventListener("load", init);

//初期化
function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    
    Asset.loadAssets(function(){
        requestAnimationFrame(update);     
    });
}//初期化 end



//更新処理
function update(timestamp){
    var delta = 0;
    if(lastTimestamp != null){
        delta = (timestamp -lastTimestamp)/ 1000;
    }
    lastTimestamp = timestamp;
    
    requestAnimationFrame(update);
    
    render();
}//更新処理 end



//再描画
function render(){
    //全体をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //背景を表示
    ctx.drawImage(Asset.images["back"], 0, 0);
    
    //QRコード
//    ctx.drawImage(Asset.images["QRcode"], 0, 0);
}//再描画 end



//画像
var Asset = {};

//アセットの定義
Asset.assets = [
    {type: "image", name: "back", src:"../images/back.png"}
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
           default:
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
var roomID = "";
socket.emit("ctsMainStart", {value: ""});   //roomが作成されたことをサーバに報告
socket.on("stcMainRoomID", function(data){  //roomIDを取得
    roomID = data.value;
    var conUrl = "http://localhost:3000/controller#"+ roomID
    $("#qrcode").qrcode(conUrl);  //コントローラページのQRコード生成
    $("#conUrl").append("<p><a href=" + conUrl + ">controller</a></p>");    //コントローラページのURLを生成
    console.log("success in " + roomID);
});

//socketIO end
