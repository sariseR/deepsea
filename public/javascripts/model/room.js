var Room = function() {
  var id = '';
  var url = '';
}

Room.prototype.spliteSharp = function() {
  var tmp = location.hash;
  var tmpArray = tmp.split("#");
  this.id = tmpArray[1];
  return this.id;
}

Room.prototype.url = function() {
  return ROOM_ADDRESS + '/controller#' + this.id;
}

Room.prototype.getId = function() {
  return this.id;
}

Room.prototype.setId = function(id) {
  this.id = id;
}

module.exports = Room;


// class Room {
//   constructor() {
//     var id = '';
//     var url = '';
//   }
//
//   spliteSharp() {
//     var tmp = location.hash;
//     var tmpArray = tmp.split("#");
//     this.id = tmpArray[1];
//     return this.id;
//   }
//
//   createQrCode() {
//     // $('#qrcode').qrcode(this.url);
//   }
//
//   getId() {
//     return this.id;
//   }
//
//   setId(id) {
//     this.id = id;
//   }
//
//   url() {
//     return ROOM_ADDRESS + '/controller#' + this.id;
//   }
// }
