//プレイヤが撃つ弾丸のクラス
class Bullet{
    constructor(posX,posY,Dir,playerId){
        this.posX = posX;
        this.posY = posY;
        this.Dir = Dir;//方向（左：−１、右：１）
        this.playerId = playerId;
    }
    update(){
        posX+=5*this.Dir;
    }
    draw(ctx){
        ctx.fillStyle = "rgba(255,0,0,1)";
        ctx.fillRect(this.posX-5,this.posY-5,10,10);
    }
}