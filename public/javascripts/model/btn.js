class Btn {
  Btn() {
    var x = 0;
    var y = 0;
    var btnId;
  }

  collision() {

  }

  draw(ctx) {
    // ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    for(var i = 1; i <= 4; i++){
        ctx.strokeRect(0, SCREEN_HEIGHT / 4 * i, SCREEN_WIDTH, SCREEN_HEIGHT / 4);
    }
    // ctx.drawImage(this.Btn, x, y);
  }
}
