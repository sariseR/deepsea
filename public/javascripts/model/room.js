class Room {
  constructor() {
    var id = '';
    var url = 'http://localhost:3000/controller#' + this.id;
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

  url() {
    return this.url;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getUrl() {
    return this.url;
  }
}

module.exports = Room;
