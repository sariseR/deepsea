class Btn {
  Btn(ctx) {
    var x = 0;
    var y = 0;
    this.ctx = ctx;
  }

  draw(ctx) {
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    // ctx.drawImage(this.Btn, x, y);
  }
}
