const app = require('../app');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const SocketSignals = require('../public/javascripts/model/socketSignals.js');
const Room = require('../public/javascripts/model/room.js');

var userId = 0; // user.jsに移行予定
var mainId = 0; // 部屋番号
var userHash = {};//サーバで保持する []内のインデックスがsocket.idとリンクする
var roomHash = {};//サーバで保持する []内のインデックスがsocket.idとリンクする
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
          playerCountMap.set('room' + mainId, 0);//ルームの人数をカウントするマップのキーを設定
          room.setId('room' + mainId);
          socket.join(room.getId());
          io.to(room.getId()).emit(SocketSignals.stcMainRoomID(), {value: room.getId()});   //部屋IDを送信
          console.log('roomID: ' + room.getId());
          userHash[socket.id] = 0;
          roomHash[socket.id] = room.getId();
        });

        //コントローラ画面から受信
        socket.on(SocketSignals.ctsCon(), function(data) {
          socket.join(data.value);
          var nowNum = playerCountMap.get(data.value);//現在の人数を取得
          playerId = nowNum + 1;//プレイヤーのIDを現在の部屋の人数＋１に設置
          playerCountMap.set(data.value,nowNum+1);//人数を一人増やす
          console.log('Controller in ' + data.value + ' No.'+ playerId);
          userHash[socket.id] = playerId;
          roomHash[socket.id] = data.value;
          //ルームにプレイヤーがログインしたことを伝える
          io.to(data.value).emit(SocketSignals.stcMainPlayerLogin(),{value: playerId});
        });

        // タッチイベントを取得
        socket.on(SocketSignals.ctsConTouch(), function(data) {
          var touchFlg = data.value;
          console.log(touchFlg+": playerId="+data.id);
          io.to('room' + mainId).emit(SocketSignals.stcConTouchFlg(), {value: touchFlg,id: data.id});
        });
        
        socket.on("disconnect", function () {
            //切断したプレイヤーの情報を送信
            io.to(roomHash[socket.id]).emit(SocketSignals.stcDisconnectInfo(),{playerId: userHash[socket.id]});
            console.log('room'+roomHash[socket.id]+'からプレイヤー'+userHash[socket.id]+'が切断しました');
            //サーバで保持していたデータを削除する
            if(userHash[socket.id] == 0){
                console.log(roomHash[socket.id]+'を削除');
                playerCountMap.delete(roomHash[socket.id]);
            }
            delete userHash[socket.id];
            delete roomHash[socket.id];
        });
    });
};

//export
module.exports = socketIO;
