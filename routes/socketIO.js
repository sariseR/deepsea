const app = require('../app');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const SocketSignals = require('../public/javascripts/model/socketSignals.js');
const Room = require('../public/javascripts/model/room.js');

var userID = 0; // user.jsに移行予定
var mainID = 0; // 部屋番号

function socketIO() {
    server.listen(app.get('port'), function() {
        console.log('listening!!');
    });

    //socketIO接続
    io.on('connection', function(socket) {
        //ユーザID
        userID++;
        console.log('connection user: ' + userID);

        //メイン画面から受信
        socket.on(SocketSignals.ctsMainStart(), function() {
          var room = new Room();
          mainID++;
          room.setId('room' + mainID);
          socket.join(room.getId());
          io.to(room.getId()).emit(SocketSignals.stcMainRoomID(), {value: room.getId()});   //部屋IDを送信
          console.log('roomID: ' + room.getId());
        });

        //コントローラ画面から受信
        socket.on(SocketSignals.ctsCon(), function(data) {
          socket.join(data.value);
          console.log('Controller in ' + data.value);
        });
    });
};

//export
module.exports = socketIO;
