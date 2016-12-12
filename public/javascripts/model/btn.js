/*
  id
  case 1: left
  case 2: right
  case 3: jump
  case 4: shot
*/
Btn = function(id, x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
  var flg = false;  // ボタンが押されているか
}

//描画処理
Btn.prototype.draw = function(ctx) {
  ctx.strokeRect(this.x, SCREEN_HEIGHT / 4 * (this.id + 1), SCREEN_WIDTH, SCREEN_HEIGHT / 4);
}

Btn.prototype.getX = function() {
  return this.x;
}

Btn.prototype.getY = function() {
  return this.y;
}

Btn.prototype.getId = function() {
  return this.id;
}

Btn.prototype.getFlg = function() {
  return this.flg;
}

Btn.prototype.setFlg = function(flg) {
  this.flg = flg;
}


// class Btn {
//   constructor(id, x, y) {
//     this.id = id;
//     this.x = x;
//     this.y = y;
//     var flg = false;  // ボタンが押されているか
//   }
//
//   draw(ctx) {
//     // ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
//     // ctx.drawImage(this.Btn, x, y);
//     ctx.strokeRect(this.x, SCREEN_HEIGHT / 4 * (this.id + 1), SCREEN_WIDTH, SCREEN_HEIGHT / 4);
//   }
//
//   getX() {
//     return this.x;
//   }
//
//   getY() {
//     return this.y;
//   }
//
//   getId() {
//     return this.id;
//   }
//
//   getFlg() {
//     return this.flg;
//   }
//
//   setFlg(flg) {
//     this.flg  = flg;
//   }
// }
