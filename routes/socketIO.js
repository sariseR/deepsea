const app = require('../app');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const SocketSignals = require('../public/javascripts/model/socketSignals.js');
const Room = require('../public/javascripts/model/room.js');

var userId = 0; // user.jsに移行予定
var mainId = 0; // 部屋番号
var playerCountMap = new Map();

function socketIO() {
    server.listen(app.get('port'), function() {
        console.log('listening!!');
    });

    //socketIO接続
    io.on('connection', function(socket) {
        //ユーザID
        userId++;
        console.log('connection user: ' + userId);
        
        var playerId=0;//プレイヤーID(とりあえず初期値として0)

        //メイン画面から受信
        socket.on(SocketSignals.ctsMainStart(), function() {
          var room = new Room();
          mainId++;
          playerCountMap.set('room'+mainId,0);//ルームの人数をカウントするマップのキーを設定
          room.setId('room' + mainId);
          socket.join(room.getId());
          io.to(room.getId()).emit(SocketSignals.stcMainRoomID(), {value: room.getId()});   //部屋IDを送信
          console.log('roomID: ' + room.getId());
        });

        //コントローラ画面から受信
        socket.on(SocketSignals.ctsCon(), function(data) {
          socket.join(data.value);
          var nowNum = playerCountMap.get(data.value);//現在の人数を取得
          playerId = nowNum + 1;//プレイヤーのIDを現在の部屋の人数＋１に設置
          playerCountMap.set(data.value,nowNum+1);//人数を一人増やす
          console.log('Controller in ' + data.value + ' No.'+playerId);
            
          //ルームにプレイヤーがログインしたことを伝える
          io.to(data.value).emit(SocketSignals.stcMainPlayerLogin(),{value: playerId});
        });
    });
};

//export
module.exports = socketIO;
