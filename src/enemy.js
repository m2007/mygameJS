import Rect from './rect'

export default class Enemy extends Rect {
  constructor(x, y, speed, sound, ctx) {
    super(x, y, 46, 40, ctx, './dist/img/enemy.png')
    this.deadImg = new Image()
    this.deadImg.src = './dist/img/dead-enemy.png'
    
    this.sound = sound
    this.alreadyDead = false
    this.update = this.update.bind(this)
    this.hearts = Math.random() > .5 ? 2 : 3
    this.speed = speed
    this.lastByte = 0
    
  }
  
  byte() {
    let now = new Date().getTime()
    if (now > this.lastByte) {
      this.lastByte = now + 500
      return true
    }
    else return false
  }

  update(camera, obj) {
    if  (this.x - camera.x >= 700 || this.y - camera.y >= 700 || 
      this.x - camera.x < 0 || this.y - camera.y < 0
    ) return
    if (this.alive()) {
      if (obj.alive()) {
        let angle = this.getAngle(obj)
        this.x += Math.cos(angle) * this.speed
        this.y -= Math.sin(angle) * this.speed
        if (this.x - camera.x <= 50 || this.x + this.width - camera.x >= 650) this.x -= Math.cos(angle) * this.speed
        if (this.y - camera.y <= 50 || this.y + this.height - camera.y >= 650) this.y += Math.sin(angle) * this.speed
      }

      this.ctx.drawImage(this.img, this.x - camera.x, this.y - camera.y, this.width, this.height)
    } else {
      if (!this.alreadyDead) {
        this.sound.enemyDead()
        this.alreadyDead = true
      }

      this.ctx.drawImage(this.deadImg, this.x - camera.x, this.y - camera.y, this.width, this.height)
    }
    
  }

  alive() {
    return this.hearts > 0
  }
}
