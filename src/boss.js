import Rect from './rect'
import Bullet from './bullet'

export default class Boss extends Rect {
  constructor(x, y, width, height, hearts, speed, sound, ctx) {
    super(x, y, width, height, ctx)
    this.hearts = hearts
    this.speed = speed
    this.bullets = []
    this.alreadyDead = false

    this.animationNum = 0
    this.imgs = []
    for (let i = 0; i < 3; i++) {
      let tempi = new Image()
      tempi.src = `./dist/img/boss-${i+1}.png`
      this.imgs.push(tempi)
    }

    this.relax = true
    this.timer = 0
    this.timerAngle = 0
    this.delayAttack = 0
    this.timeRelax = 5000
    this.timeAttack = 5000
    this.timeOpen = 1000
    this.angle = Math.random() * Math.PI * 2

    this.sound = sound
  }

  update(camera) {
    
    if  (this.x - camera.x >= 700 || this.y - camera.y >= 700 || 
      this.x - camera.x < 0 || this.y - camera.y < 0
    ) return

    
    if (this.alive()) {
      let now = new Date().getTime()
      if (this.relax) {
        if (now >= this.timerAngle) {
          this.timerAngle = now + this.timeRelax / 7
          this.angle = Math.random() * Math.PI * 2
        }
  
        let dx = Math.cos(this.angle) * this.speed, dy = Math.sin(this.angle) * this.speed
        
        this.move(dx, dy, camera)
      }
      else if (this.isAttack){
        if (now >= this.delayAttack) {
          this.delayAttack = now + this.timeAttack / 7
          this.angle = Math.random() * Math.PI * 2
          this.attack()
        }
      }
      if (this.relax && now >= this.timer) {
        this.relax = false
        this.timer = now + this.timeAttack
        this.animationNum = 1
      }
      if (!this.relax) {
        if (now >= this.timer - this.timeAttack + this.timeOpen) {
          this.isAttack = true
          this.animationNum = 2
        }
        if (now >= this.timer) {
          this.relax = true
          this.isAttack = false
          this.animationNum = 0
          this.timer = now + this.timeRelax
        }
      }
    } else {
      if (!this.alreadyDead) {
        this.sound.bossDead()
        this.alreadyDead = true
      }
      if (this.height >= 1) {
        this.y = this.y + this.height/4
        this.height /= 2
      }
      else return
    }

    this.ctx.drawImage(this.imgs[animationNum], this.x - camera.x, this.y - camera.y, this.width, this.height)
  }
  
  move(dx, dy, camera) {
    
    this.x += dx
    this.y += dy
    if  (this.x - camera.x > 650 - this.width || this.y - camera.y > 650 - this.height || 
      this.x - camera.x < 50 || this.y - camera.y < 50
      ) {
      this.x -= dx
      this.y -= dy
      }
       
  }

  attack() {
    this.sound.bossAttack()
    for (let i = 0; i < 8; i++) {
      this.bullets.push( 
        new Bullet(
          this.x + this.width/2 - 15, 
          this.y + this.height/2 - 15, 
          30, 
          30, 
          10,
          this.angle + Math.PI * (i / 4),
          this.ctx,
          './dist/img/boss-bullet.png'
        ) 
      )
    }
  }

  alive() {
    return this.hearts > 0
  }
}
