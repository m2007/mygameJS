import Rect from './rect'

export default class Item extends Rect{
  constructor(x, y, type, ctx) {
    if (type === 'HEART') super(x, y, 25, 25, ctx, './dist/img/heart.png')
    if (type === 'TRIPLE_BULLET') super(x, y, 20, 20, ctx, './dist/img/triple-bullet.png')
    if (type.substr(0, 3) === 'KEY') {
      super(x, y, 25, 25, ctx, './dist/img/key.png')
      this.type = type.substr(0, 3)
      this.id = +type.substr(4)
    } else this.type = type

    this.dy = 0
    this.up = true

  }

  update(camera) {
    this.ctx.drawImage(this.img, this.x - camera.x, this.y - camera.y - this.dy, this.width, this.height)
    if (this.up) this.dy += .2
    else this.dy -= .2

    if (this.dy >= 10) this.up = false
    else if (this.dy <= 0) this.up = true 
  }
}
