class Room {
<<<<<<< HEAD
  constructor() {
    var id = '';
    var url = 'http://192.168.1.13:3000/controller#' + this.id;
  }
=======
    Room() {
      var id = '';
      var url = 'http://192.168.1.5:3000/controller#' + this.id;
    }
>>>>>>> 5784843bad0ac94718994e125aac31a42267430b

  spliteSharp() {
    var tmp = location.hash;
    var tmpArray = tmp.split("#");
    this.id = tmpArray[1];
    return this.id;
  }

  createQrCode() {
    // $('#qrcode').qrcode(this.url);
  }

<<<<<<< HEAD
  url() {
    return 'http://192.168.1.13:3000/controller#' + this.id;
  }
=======
    url() {
      return 'http://192.168.1.5:3000/controller#' + this.id;
    }
>>>>>>> 5784843bad0ac94718994e125aac31a42267430b

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
