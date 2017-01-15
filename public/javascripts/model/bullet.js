//プレイヤが撃つ弾丸のクラス
var Bullet = function(posX, posY, Dir, playerId) {
  this.posX = posX;
  this.posY = posY;
  this.Dir = Dir;//方向（左：−１、右：１）
  this.playerId = playerId;
  
}

Bullet.prototype.update = function() {
  if(this.Dir!=0)this.posX += 5 * this.Dir;
  else{
      this.posY-=3;
      this.posX+=Math.cos(this.posY/80)*5;
  }
}

Bullet.prototype.draw = function(ctx) {
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  //ctx.fillRect(this.posX-5,this.posY-3,10,6);
  ctx.beginPath();
  ctx.arc(this.posX, this.posY, 5, 0, Math.PI*2, false);
  ctx.stroke();
}
//座標取得
Bullet.prototype.getPosX = function(){
    return this.posX;
}
Bullet.prototype.getPosY = function(){
    return this.posY;
}
//プレイヤid取得
Bullet.prototype.getPlayerId = function(){
    return this.playerId;
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
