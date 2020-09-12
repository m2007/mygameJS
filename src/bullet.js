import Rect from './rect'


export default class Bullet extends Rect {
  constructor(x, y, w, h, s, angle, ctx, src) {
    super(x, y, w, h, ctx, src)
    this.angle = angle
    this.update = this.update.bind(this)
    this.speed = s
    this.count = 0
  }
  update(camera) {
    
    this.x += Math.cos(this.angle) * this.speed
    this.y -= Math.sin(this.angle) * this.speed
    
    this.ctx.drawImage(this.img, this.x - camera.x, this.y - camera.y, this.width, this.height)
  }
}
