const app = require('../app');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const SocketSignals = require('../public/javascripts/model/socketSignals.js');
const Room = require('../public/javascripts/model/room.js');

var userID = 0; //メイン画面とコントローラどちらも含めたID
var mainID = 0; //メイン画面のみのID


function socketIO() {
    server.listen(app.get('port'), function() {
        console.log('listening!!');
    });

    //socketIO接続
    io.on('connection', function(socket) {
        var room = new Room();

        //ユーザID
        userID++;
        console.log('connection user: ' + userID);

        //メイン画面から受信
        socket.on(SocketSignals.ctsMainStart(), function(data) {
            mainID++;
            room.setId('room' + mainID);
            socket.join(room.getId());
            io.to(room.getId()).emit(SocketSignals.stcMainRoomID(), {value: room.getId()});   //部屋IDを送信
            console.log('roomID: ' + room.getId());
        });

        //コントローラ画面から受信
        socket.on(SocketSignals.ctsCon(), function(data) {
            room.setId(data.value);
            socket.join(room.getId());
            console.log('Controller in ' + room.getId());
        });
    });
};

//export
module.exports = socketIO;
