import Bullet from './bullet'
import Rect from './rect'

export default class Bunch extends Rect {
  constructor(x, y, size, speed, hearts, sizeBullet, speedBullet, timeRelax, sound, ctx) {
    super(x, y, size, size, ctx)

    this.animationNum = 0
    this.imgs = []
    for (let i = 0; i < 6; i++) {
      let tempi = new Image()
      tempi.src = `./dist/img/bunch-${i+1}.png`
      this.imgs.push(tempi)
    }
    this.deadImg = new Image()
    this.deadImg.src = './dist/img/dead-bunch.png'
    
    this.sound = sound
    this.speed = speed
    this.hearts = hearts

    this.width = size
    this.height = size
    this.sizeBullet = sizeBullet
    this.speedBullet = speedBullet

    this.delayAgro = 1000
    this.timeAgro = new Date().getTime() + this.delayAgro
    this.left = false
    this.attacking = false
    this.attacked = false
    this.alreadyDead = false
    this.delay = 1000
    this.timerelax = timeRelax
    this.timeattack = new Date().getTime() + this.delay + 2000
    this.bullets = []
  }
  
  update(camera, obj) {
    if  (this.x - camera.x >= 700 || this.y - camera.y >= 700 || 
      this.x - camera.x < 0 || this.y - camera.y < 0) {
        this.timeAgro = new Date().getTime() + this.delayAgro
        this.timeattack = new Date().getTime() + this.delay + this.delayAgro
        return
    }

    if (this.alive()) {
      if (obj.alive()) {
        if (!this.attacking) {
          let angle = this.getAngle(obj)
          this.x += Math.cos(angle) * this.speed
          this.y -= Math.sin(angle) * this.speed
          if (this.x - camera.x <= 50 || this.x + this.width - camera.x >= 650) this.x -= Math.cos(angle) * this.speed 
          if (this.y - camera.y <= 50 || this.y + this.height - camera.y >= 650) this.y +=  Math.sin(angle) * this.speed
        }
        
        let now = new Date().getTime()
        if (this.timeAgro - now <= 0) {
          if (now >= this.timeattack - (this.delay / 4 * 4)) {
            this.attacking = true
            this.animationNum = 1
          }
          if (now >= this.timeattack - (this.delay / 4 * 3)) {
            this.attacking = true
            this.animationNum = 2
          }
          if (now >= this.timeattack - (this.delay / 4 * 2)) {
            this.attacking = true
            this.animationNum = 3
          }
          if (now >= this.timeattack - (this.delay / 4)) {
            this.attacking = true
            this.animationNum = 4
            if (!this.attacked) {
              this.sound.bunchAttack()
              let angle = this.getAngle(obj)
              this.bullets.push(new Bullet(this.x + this.width/2 - 10, this.y + this.height/2 - 10, this.sizeBullet, this.sizeBullet, this.speedBullet, angle, this.ctx, './dist/img/bunch-bullet.png'))
            }
            this.attacked = true
          }
          if (now >= this.timeattack) {
            this.attacking = false
            this.attacked = false
            this.animationNum = 0
            this.timeattack = now + this.delay + this.timerelax
          }
        }
        
      }
    } else if (!this.alreadyDead) {
      this.sound.bunchDead()
      this.alreadyDead = true
    }

    if (this.alive() && this.x >= obj.x || !this.alive() && this.left == true) {
      this.ctx.save()
      this.ctx.scale(-1, 1)

      if (this.alive())
        this.ctx.drawImage(this.imgs[this.animationNum], -1 * (this.x - camera.x + this.width), this.y - camera.y, this.width, this.height)
      else 
        this.ctx.drawImage(this.deadImg, -1 * (this.x - camera.x + this.width), this.y - camera.y, this.width, this.height)

      this.left = true
      this.ctx.restore()

    } else if (this.alive() || !this.alive() && this.left == false) {
      if (this.alive())
        this.ctx.drawImage(this.imgs[this.animationNum], this.x - camera.x, this.y - camera.y, this.width, this.height)
      else
        this.ctx.drawImage(this.deadImg, this.x - camera.x, this.y - camera.y, this.width, this.height)

      this.left = false
    }
  }
  
  alive() {
    return this.hearts > 0
  }

  fixAttackOnPause(dt) {
    this.timeattack += dt
  }
}
