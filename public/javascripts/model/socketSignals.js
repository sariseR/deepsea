var SocketSignals = function() {}

SocketSignals.ctsMainStart = function() {
  return 'ctsMainStart';
}
SocketSignals.ctsMain = function() {
  return 'ctsMain';
}
SocketSignals.ctsCon = function() {
  return 'ctsCon';
}
SocketSignals.ctsConTouch = function() {
  return 'ctsConTouch';
}
SocketSignals.stcMainRoomID = function() {
  return 'stcMainRoomID';
}
SocketSignals.stcMainPlayerLogin = function() {
  return 'stcMainPlayerLogin';
}
SocketSignals.stcConTouchFlg = function() {
  return 'stcConTouchFlg';
}

module.exports = SocketSignals;


// class SocketSignals {
//     static ctsMainStart() {
//       return 'ctsMainStart';
//     }
//
//     static ctsMain() {
//       return 'ctsMain';
//     }
//
//     static ctsCon() {
//       return 'ctsCon';
//     }
//
//     static ctsConTouch() {
//       return 'ctsConTouch';
//     }
//
//     static stcMainRoomID() {
//       return 'stcMainRoomID';
//     }
//
//     static stcMainPlayerLogin() {
//         return 'stcMainPlayerLogin';
//     }
//
//     static stcConTouchFlg() {
//       return 'stcConTouchFlg';
//     }
// };
