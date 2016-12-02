var app = require("../app");
var http = require("http");
var server = http.createServer(app);
var io = require("socket.io")(server);

var userID = 0; //メイン画面とコントローラどちらも含めたID
var mainID = 0; //メイン画面のみのID

function socketIO(){
    server.listen(app.get("port"), function(){
        console.log("listening!!");
    });
    
    //socketIO接続
    io.on("connection", function(socket){
        var room = "";
        
        //ユーザID
        userID++;  
        console.log("connection user: " + userID);
        
        //メイン画面から受信
        socket.on("ctsMainStart", function(data){
            mainID++;
            room = "room" + mainID
            socket.join(room);
            io.to(room).emit("stcMainRoomID", {value: room});   //部屋IDを送信
            console.log("roomID: " + room);
        });
        
        socket.on("ctsMain", function(data){    //メイン画面から作成するルームIDを取得
//            room = data.value;
//            socket.join(room);
//            io.to(room).emit("stcMainRoomID", {value: room});   //部屋IDを送信
//            console.log("Main in " + room);
        });
        
        //コントローラ画面から受信
        socket.on("ctsCon", function(data){
            room = data.value;
            socket.join(room);
            console.log("Controller in " + room);
        });
    });
};

//export
module.exports = socketIO;