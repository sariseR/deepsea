var Player = function(playerId, canvasWid, canvasHei) {
  this.playerId = playerId;
  var posX;
  var posY;
  var vy = 0;
  var Dir;//方向（左：−１、右：１）
  var leftFlag = false;
  var rightFlag = false;
  var jumpFlag = false;
  var shotFlag = false;
  var stageWid = canvasWid;//ステージ(移動できる範囲)の横幅
  var stageHei = canvasHei;//ステージ(移動できる範囲)の縦幅
  var bulletTimer = 0;//弾丸の連射速度を管理するタイマー
  switch(playerId){//プレイヤーIDごとに初期位置をキャンバスサイズから個別に設定
      case 1:
          this.posX =canvasWid/6*1;
          this.posY = canvasHei/3*1;
          this.Dir = 1;
          break;
      case 2:
          this.posX =canvasWid/6*5;
          this.posY = canvasHei/3*1;
          this.Dir = -1;
          break;
      case 3:
          this.posX =canvasWid/6*5;
          this.posY = canvasHei/3*2;
          this.Dir = -1;
          break;
      case 4:
          this.posX =canvasWid/6*1;
          this.posY = canvasHei/3*2;
          this.Dir = 1;
          break;
      case 5:
          this.posX =canvasWid/6*3;
          this.posY = canvasHei/3*1;
          this.Dir = 1;
          break;
      case 6:
          this.posX =canvasWid/6*3;
          this.posY = canvasHei/3*2;
          this.Dir = -1;
          break;
      default:

          break;
  }
}

//更新処理
Player.prototype.update = function(bullets) {
  //コントローラの入力情報における動作
  if(this.leftFlag == true) {
      this.posX-=5;
      this.Dir = -1;
  }
  if(this.rightFlag == true) {
      this.posX+=5;
      this.Dir = 1;
  }
  if(this.jumpFlag == true) {
      if(vy>-15)vy-=3;
  }
  if(this.shotFlag == true) {
      if(this.bulletTimer==0){
          bullets.push(new Bullet(this.posX,this.posY,this.Dir,this.playerId));
          this.bulletTimer++;
      }
  }

  //重力処理
  if(this.vy<3)this.vy+=0.2;
  //this.posY+=this.vy;

  if(this.bulletTimer!=0)this.bulletTimer++;
  if(this.bulletTimer==0){
      bullets.push(new Bullet(this.posX,this.posY,this.Dir,this.playerId));
      this.bulletTimer++;
  }
  if(this.bulletTimer>=60)this.bulletTimer=0;
}

//描画処理
Player.prototype.draw = function(ctx) {
  switch(this.playerId){
      case 1:
      ctx.fillStyle="rgba(165,200,100,1)";
      break;
      case 2:
      ctx.fillStyle="rgba(255,0,200,1)";
      break;
      case 3:
      ctx.fillStyle="rgba(25,100,200,1)";
      break;
      case 4:
      ctx.fillStyle="rgba(205,205,0,1)";
      break;
      case 5:
      ctx.fillStyle="rgba(205,100,0,1)";
      break;
      case 6:
      ctx.fillStyle="rgba(255,120,120,1)";
      break;
      default:
      ctx.fillStyle="rgba(255,0,0,1)";
      break;
  }
  ctx.fillRect(this.posX-10,this.posY-10,20,20);
}

//プレイヤIDを取得
Player.prototype.getplayerId = function() {
  return this.playerId;
}

//左推してますフラグを立てる
Player.prototype.setLeftFlag = function(tf) {
  this.leftFlag =tf;
}

//右推してますフラグを立てる
Player.prototype.setRightFlag = function(tf) {
  this.rightFlag =tf;
}

//ジャンプ推してますフラグを立てる
Player.prototype.setJumpFlag = function(tf) {
  this.jumpFlag =tf;
}

//撃ってますフラグを立てる
Player.prototype.setShotFlag = function(tf) {
  this.shotFlag =tf;
}

Player.prototype.getDir = function() {
  return this.Dir;
}
