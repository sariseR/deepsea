
var playerImage_1R = new Image();
playerImage_1R.src = "images/player1R.png";
var playerImage_1R = new Image();
playerImage_1R.src = "images/player1R.png";
var playerImage_1L = new Image();
playerImage_1L.src = "images/player1.png";
var Player = function(playerId, canvasWid, canvasHei) {
  
  this.playerId = playerId;
  var bullets = new Array();//弾丸オブジェクト

  var posX;
  var posY;
  var vx;
  var vy;
  var Dir;//方向（左：−１、右：１）
  var leftFlag = false;
  var rightFlag = false;
  var jumpFlag = false;
  var beforeJumpFlag = false;
  var shotFlag = false;
  var shotStartFlag = false;
  this.alive = true;//生存しているかどうか
  this.stageWid = canvasWid;//ステージ(移動できる範囲)の横幅
  this.stageHei = canvasHei;//ステージ(移動できる範囲)の縦幅
  this.bulletTimer = 0;//弾丸の連射速度を管理するタイマー
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
          this.posX =canvasWid/2;
          this.posY = canvasHei/2;
          this.Dir = -1;
          break;
  }
    this.vy = 0;
    this.vx = 0;
}

//更新処理
Player.prototype.update = function() {
  //コントローラの入力情報における動作
    
  //this.shotStartFlag = false;//ショットを打つタイミング管理フラグを初期化
    
  if(this.leftFlag == true) {
      //this.posX-=5;
      this.vx = -5;
      this.Dir = -1;
  }
  if(this.rightFlag == true) {
      //this.posX+=5;
      this.vx = 5;
      this.Dir = 1;
  }
  if(this.jumpFlag == true&&this.beforeJumpFlag==false) {
      this.vy =-30;
  }
  if(this.shotFlag == true&&this.bulletTimer <= 0) {
      //this.bulletTimer = 30;//ショット感覚管理タイマーをセット
      this.shotStartFlag = true;//ショットのタイミングフラグを立てる
  }
this.beforeJumpFlag = this.jumpFlag;
  //重力処理
  //if(this.vy<3)this.vy+=0.2;
  this.vy ++;
  if(this.vy>50)this.vy=50;
    if(this.vx>0)this.vx -=0.1;
    if(this.vx<0)this.vx +=0.1;
  this.posY+=this.vy/10;
  this.posX += this.vx;
    
  //フィールドの当たり判定//***********************
    //底
  if(this.posY>this.stageHei-20){
      this.posY = this.stageHei-20;
      this.vy = 0;
  }
    //上天井
    if(this.posY<20){
        this.posY = 20;
        this.vy = 0;
    }
    
    //右壁
    if(this.posX>this.stageWid-20){
        this.posX = this.stageWid - 20;
        this.vx = 0;
    }
    //左壁
    if(this.posX<20){
        this.posX = 20;
        this.vx = 0;
    }
    
  //********************************************
    
    console.log(this.posY+' , '+this.stageHei);
    //ショットの間隔を管理するカウンタの処理
    if(this.bulletTimer>0){
        this.bulletTimer--;
    }
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
  //ctx.fillRect(this.posX-10,this.posY-10,20,20);
  if(this.Dir == 1){
      //if(this.vy>=0)ctx.drawImage(image_1_2,this.posX-13,this.posY-13);
     // else ctx.drawImage(image_2_2,this.posX-13,this.posY-13);
      ctx.drawImage(playerImage_1R,this.posX-32,this.posY-32,64,64);
  }else{
      //if(this.vy>=0)ctx.drawImage(image_1,this.posX-13,this.posY-13);
      //else ctx.drawImage(image_2,this.posX-13,this.posY-13);
      ctx.drawImage(playerImage_1L,this.posX-32,this.posY-32,64,64);
  }
    ctx.textAlign="center";
    ctx.font = "16px 'ＭＳ Ｐゴシック'";
    ctx.strokeText(this.playerId+"P",this.posX,this.posY-32);
  
  //console.log('player '+this.playerId+' draw!');
  //for(var i = 0;i<this.bullets.length;i++){
//      this.bullets[i].draw(ctx);
//  }
}

//プレイヤIDを取得
Player.prototype.getplayerId = function() {
  return this.playerId;
}
//プレイヤのx座標を取得
Player.prototype.getPosX = function() {
  return this.posX;
}

//プレイヤのy座標を取得
Player.prototype.getPosY = function() {
  return this.posY;
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
//プレイヤーのショットを行うタイミングフラグを取得する
Player.prototype.getShotStartFlag = function() {
  return this.shotStartFlag;
}

//ショット完了後の処理

Player.prototype.setShotFin=function(){
    this.bulletTimer = 30;
    this.shotStartFlag = false;
}

//生存確認
　Player.prototype.getAlive = function(){
     return this.alive;
 }
//生存フラグをセット
 Player.prototype.setAlive = function(tf){
     this.alive =tf;
 }
//リセット処理
 Player.prototype.reset =function(){
    this.alive = true;//生存しているかどうか
    this.bulletTimer = 0;//弾丸の連射速度を管理するタイマー
     switch(this.playerId){//プレイヤーIDごとに初期位置をキャンバスサイズから個別に設定
      case 1:
          this.posX =this.stageWid/6*1;
          this.posY = this.stageHei/3*1;
          this.Dir = 1;
          break;
      case 2:
          this.posX =this.stageWid/6*5;
          this.posY = this.stageHei/3*1;
          this.Dir = -1;
          break;
      case 3:
          this.posX =this.stageWid/6*5;
          this.posY =this.stageHei/3*2;
          this.Dir = -1;
          break;
      case 4:
          this.posX =this.stageWid/6*1;
          this.posY =this.stageHei/3*2;
          this.Dir = 1;
          break;
      case 5:
          this.posX =this.stageWid/6*3;
          this.posY = this.stageHei/3*1;
          this.Dir = 1;
          break;
      case 6:
          this.posX =this.stageWid/6*3;
          this.posY =this.stageHei/3*2;
          this.Dir = -1;
          break;
      default:

          break;
  }
    this.vy = 0;
    this.vx = 0;
 }



