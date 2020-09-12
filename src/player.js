import Rect from './rect'
import Bullet from './bullet'
export default class Player extends Rect {
  constructor(x, y, w, h, sound, ctx) {
    super(x, y, w, h, ctx, './dist/img/1.png')
    this.update = this.update.bind(this)
    this.sound = sound
    this.hearts = 3
    this.au = false
    this.ar = false
    this.al = false
    this.ad = false
    this.fu = false
    this.fd = false
    this.fr = false
    this.fl = false
    this.alreadyDead = false

    this.delay_animation = 0
    this.animationNum = 0

    this.imgs = []
    for (let i = 0; i < 10; i++) {
      let tempi = new Image()
      tempi.src = `./dist/img/${i+1}.png`
      this.imgs.push(tempi)
    }
    this.deadImg = new Image()
    this.deadImg.src = './dist/img/dead.png'

    this.currTypeBullet = 'SINGLE_BULLET'
    this.typesBullet = ['SINGLE_BULLET']
    this.delayBullet = 0
    this.bullets = []

    this.keys = []
    
  }

  update(camera, walls, doors) {
    if (this.hearts > 0) {
      let dx = 0, dy = 0

      if (this.au) {
        dy = -5
      }
      if (this.ad) {
        dy = 5
      }
      if (this.au && this.ad) dy = 0
      if (this.ar) {
        dx = 5
      }
      if (this.al) {
        dx = -5
      }
      if (this.al && this.ar) dx = 0
      this.move(dx, dy)
      
      for(let w of walls) {
        if (w.collideRectangle(this)) {
          this.move(-1* dx, -1 * dy)
          break
        }  
      }
      for (let d of doors) {
        if (!d.open && this.collideRectangle(d) && this.keys.filter(id => id == d.id).length) {
          d.thisOpen()
        }
        if (!d.open && this.collideRectangle(d)) 
          this.move(-1* dx, -1 * dy)
      }

      if ((this.ar || this.au || this.al || this.ad)) {
        if (this.delay_animation < new Date().getTime()) {
          
          this.sound.playerWalk()
          this.delay_animation = new Date().getTime() + 100
          this.animationNum = (1 + this.animationNum) % 10
        }
      } else {
        this.animationNum = 0
      }
      
      if (this.fu || this.fd || this.fl || this.fr) {
        if (new Date() > this.delayBullet) {
          this.delayBullet = new Date().getTime() + 250                    
          this.sound.playerAttack()

          if (this.currTypeBullet === 'SINGLE_BULLET') 
            this.singleAttack()
          else if (this.currTypeBullet === 'TRIPLE_BULLET') 
            this.tripleAttack()
          
        }
      }

      this.ctx.drawImage(this.imgs[this.animationNum], this.x - camera.x, this.y - camera.y, this.width, this.height)
    } else {
      if (!this.alreadyDead) {
        this.sound.playerDead()
        this.width = 72
        this.height = 54
        this.alreadyDead = true
      }

      this.ctx.drawImage(this.deadImg, this.x - camera.x, this.y - camera.y, this.width, this.height)
    }
  }

  move(dx, dy) {
    this.x += dx
    this.y += dy
  }

  singleAttack() {
    let angle
    if (this.fu) angle = Math.PI / 2
    else if (this.fd) angle = (Math.PI / 2) * 3
    else if (this.fl) angle = Math.PI
    else if (this.fr) angle = 0
    this.bullets.push( 
      new Bullet(
        this.x + this.width/2 - 15, 
        this.y + this.height/2 - 15, 
        30, 
        30, 
        7,
        angle,
        this.ctx,
        './dist/img/bullet.png'
      ) 
    )
  }

  tripleAttack() {
    let angle
    if (this.fu) angle = Math.PI / 2
    else if (this.fd) angle = (Math.PI / 2) * 3
    else if (this.fl) angle = Math.PI
    else if (this.fr) angle = 0

    for (let i = 0; i < 3; i++)
      this.bullets.push( 
        new Bullet(
          this.x + this.width/2 - 15, 
          this.y + this.height/2 - 15, 
          30, 
          30, 
          7,
          angle + (i - 1) * (Math.PI / 5),
          this.ctx,
          './dist/img/bullet.png'
        )
      )
  }

  hurt(dh=1) {
    this.hearts -= dh
    if (this.hearts && dh > 0) this.sound.playerHurt()
  }

  alive() {
    return this.hearts > 0
  }
  
  actionD(code) {
    if (code == 'ArrowUp')
      this.au = true
    else if (code == 'ArrowLeft')
      this.al = true
    else if (code == 'ArrowRight')
      this.ar = true
    else if (code == 'ArrowDown')
      this.ad = true
    else if (code == 'KeyW')
      this.fu = true
    else if (code == 'KeyS')
      this.fd = true
    else if (code == 'KeyA')
      this.fl = true
    else if (code == 'KeyD')
      this.fr = true
    else if (code == 'KeyR')
      this.currTypeBullet = this.typesBullet[(this.typesBullet.indexOf(this.currTypeBullet) + 1) % this.typesBullet.length]
      
  }

  actionU(code) {
    if (code == 'ArrowUp')
      this.au = false
    else if (code == 'ArrowLeft')
      this.al = false
    else if (code == 'ArrowRight')
      this.ar = false
    else if (code == 'ArrowDown')
      this.ad = false
    else if (code == 'KeyW')
      this.fu = false
    else if (code == 'KeyS')
      this.fd = false
    else if (code == 'KeyA')
      this.fl = false
    else if (code == 'KeyD')
      this.fr = false
  }
}
