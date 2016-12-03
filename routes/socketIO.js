const app = require('../app');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const SocketSignals = require('../public/javascripts/model/socketSignals.js');
const Room = require('../public/javascripts/model/room.js');

var userID = 0; //メイン画面とコントローラどちらも含めたID
var mainID = 0; //メイン画面のみのID


function socketIO() {
    server.listen(app.get('port'), function(){
        console.log('listening!!');
    });

    //socketIO接続
    io.on('connection', function(socket){
        let room = new Room();

        //ユーザID
        userID++;
        console.log('connection user: ' + userID);

        //メイン画面から受信
        socket.on(SocketSignals.ctsMainStart(), function(data){
            mainID++;
            room.id = 'room' + mainID
            socket.join(room.id);
            io.to(room.id).emit(SocketSignals.stcMainRoomID(), {value: room.id});   //部屋IDを送信
            console.log('roomID: ' + room.id);
        });

        //メイン画面から作成するルームIDを取得
        // socket.on(SocketSignals.ctsMain(), function(data){
        //    room.id = data.value;
        //    socket.join(room);
        //    io.to(room).emit('stcMainRoomID', {value: room});   //部屋IDを送信
        //    console.log('Main in ' + room);
        // });

        //コントローラ画面から受信
        socket.on(SocketSignals.ctsCon(), function(data){
            room = data.value;
            socket.join(room.id);
            console.log('Controller in ' + room.id);
        });
    });
};

//export
module.exports = socketIO;
