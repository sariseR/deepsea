class Room {
  constructor() {
    var id = '';
    var url = '';
  }

  spliteSharp() {
    var tmp = location.hash;
    var tmpArray = tmp.split("#");
    this.id = tmpArray[1];
    return this.id;
  }

  createQrCode() {
    // $('#qrcode').qrcode(this.url);
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  url() {
    return ROOM_ADDRESS + '/controller#' + this.id;
  }
}

module.exports = Room;
