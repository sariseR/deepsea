//プレイヤが撃つ弾丸のクラス
var Bullet = function(posX, posY, Dir, playerId) {
  this.posX = posX;
  this.posY = posY;
  this.Dir = Dir;//方向（左：−１、右：１）
  this.playerId = playerId;
}

Bullet.prototype.update = function() {
  this.posX += 5 * this.Dir;
}

Bullet.prototype.draw = function(ctx) {
  ctx.fillStyle = "rgba(255,0,0,1)";
  ctx.fillRect(this.posX-5,this.posY-5,10,10);
}


// class Bullet{
//     constructor(posX,posY,Dir,playerId){
//         this.posX = posX;
//         this.posY = posY;
//         this.Dir = Dir;//方向（左：−１、右：１）
//         this.playerId = playerId;
//     }
//     update(){
//         posX+=5*this.Dir;
//     }
//     draw(ctx){
//         ctx.fillStyle = "rgba(255,0,0,1)";
//         ctx.fillRect(this.posX-5,this.posY-5,10,10);
//     }
// }
//
