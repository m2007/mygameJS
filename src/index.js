import Player from './player'
import Camera from './camera'
import Panel from './panel'
import Sound from './sound'
import Loader from './loader'

class Game {
  constructor(level) {
    this.ctx = document.getElementById('canvas').getContext('2d')
    this.panel = new Panel()
    this.sound = new Sound(0.2)
    this.loader = new Loader(this.sound, this.ctx)
    
    this.width = 700
    this.height = 700

    this.pause = false
    this.dp = 0
    
    this.level = level
    this.maxlevel = 2
    
    this.timer = 0
    this.timer1 = 0

    this.player = new Player(300, 300, 60, 70, this.ctx)
    this.build(true)
  }

  build(newgame) {
    let fl = false
    if (this.level > this.maxlevel) {
      if (newgame) fl = true
      else return
    }
    if (newgame) this.level = 1

    this.walls   = this.loader.loadWalls(this.level)
    this.items   = this.loader.loadItems(this.level)
    this.doors   = this.loader.loadDoors(this.level)
    this.enemies = this.loader.loadEnemies(this.level)
    this.bunches = this.loader.loadBunches(this.level)
    this.boss    = this.loader.loadBoss(this.level)

    this.bgImg = new Image(700,700)
    this.bgImg.src = `./dist/img/bg${this.level}.png`
    
    this.camera = new Camera()
    if (!newgame) {
      this.player.keys = []
      this.player.move(300 - this.player.x, 300 - this.player.y)
    }
    else this.player = new Player(300, 300, 60, 70, this.sound, this.ctx)
    if (fl) this.update()
  }

  update(time) {
    if (this.level > this.maxlevel) {
      alert('Вы прошли игру!')
      return
    }
    
    this.fillBg()
    
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].collideRectangle(this.player)) {
        this.sound.itemGrab()
        if (this.items[i].type === 'HEART') {
          this.player.hurt(-1)
          this.items.splice(i, 1)
        }
        else if (this.items[i].type === 'KEY') {
          this.player.keys.push(this.items[i].id)
          this.items.splice(i, 1)
        }
        else if (this.items[i].type === 'TRIPLE_BULLET') {
          this.player.typesBullet.push(this.items[i].type)
          this.player.typeBullet = this.items[i].type
          this.panel.bullet.src = './dist/img/triple-bullet.png'
          this.items.splice(i, 1)
        }
      }
    }
    this.panel.bullet.src = this.panel.types_bullet.filter(tb => tb.name === this.player.currTypeBullet)[0].src

    this.camera.update(this.player)
    
    for (let d of this.doors) {    
      if (d.checkEnd(this.player)) {
        this.level++
        this.build(false)
      }
      d.update(this.camera)
      for (let i = 0; i < this.player.bullets.length;  i++) {
        if (this.player.bullets[i].collideRectangle(d)) this.player.bullets.splice(i, 1)
      }
      if (d.exit) {
        d.thisOpen(
          (this.bunches.filter(b => b.alive()).length) == 0 && 
          (this.enemies.filter(e => e.alive()).length) == 0 && 
          (this.boss === undefined || !this.boss.alive())
        )
      }
    }
    
    this.items.forEach(i => i.update(this.camera))

    this.enemies.forEach(e => {
      e.update(this.camera, this.player)
      if (e.collideRectangle(this.player) && e.byte() && this.player.alive() && e.alive()) {
        this.player.hurt()
      }
    })

    this.bunches.forEach(b => {
      b.update(this.camera, this.player)
      for (let i = 0; i < b.bullets.length && b.bullets.length > 0; i++) {
        b.bullets[i].update(this.camera)
        let fl = false
        this.walls.forEach(w => {
          if (!fl && b.bullets[i].collideRectangle(w)) {
            b.bullets.splice(i, 1)
            fl = true
          }
        })
        if (fl) continue
        if (this.player.alive() && b.bullets[i].collideRectangle(this.player)) {
          this.player.hurt()
          b.bullets.splice(i, 1)
        }
      }
    })
    
    for (let i = 0; i < this.player.bullets.length;  i++) {
      this.player.bullets[i].update(this.camera)
      if (this.boss && this.boss.alive() && this.boss.collideRectangle(this.player.bullets[i])) {
        if (this.boss.relax) {
          this.player.bullets.splice(i, 1)
          i -= 1
          this.boss.hearts -= 1
        }
        else {
          this.player.bullets[i].angle -= Math.PI / 2
        }
      }

      for (let j = 0; j < this.bunches.length;  j++) {
        if (this.player.bullets.length && this.bunches[j].alive() && this.bunches[j].collideRectangle(this.player.bullets[i])) {
          this.player.bullets.splice(i, 1)
          i -= 1
          this.bunches[j].hearts -= 1
        }
        if (this.player.bullets.length == 0) break
      }

      for (let j = 0; j < this.enemies.length;  j++) {
        if (this.player.bullets.length && this.enemies[j].alive() && this.enemies[j].collideRectangle(this.player.bullets[i])) {
          this.player.bullets.splice(i, 1)
          i -= 1
          this.enemies[j].hearts -= 1
        }
        if (this.player.bullets.length == 0) break
      }
    }
    

    this.player.update(this.camera, this.walls, this.doors)
    if (this.boss) {
      for (let i = 0; i < this.boss.bullets.length;  i++) {
        this.boss.bullets[i].update(this.camera)
        
        if (this.boss.bullets.length && this.player.alive() && this.player.collideRectangle(this.boss.bullets[i])) {
          this.boss.bullets.splice(i, 1)
          if (this.boss.bullets.length == 0) break
          this.player.hurt()
        }
      }
      this.boss.update(this.camera)
    }

    for (let w of this.walls) {
      for (let i = 0; i < this.player.bullets.length;  i++) {
        if (this.player.bullets[i].collideRectangle(w)) this.player.bullets.splice(i, 1)
      }
      w.update(this.camera)
    }

    this.panel.update(this)

    if (!this.pause) requestAnimationFrame(time => this.update(time))
  }

  fillBg() {
    this.ctx.drawImage(this.bgImg, 0, 0)
    let pattern = this.ctx.createPattern(this.bgImg, "repeat")
    this.ctx.fillStyle = pattern
    this.ctx.fill()
    this.ctx.fillRect(0,0, this.width, this.height)
  }

  tooglePause() {
    this.pause = !this.pause
    if (this.pause) {
      this.dp = new Date().getTime()
      document.getElementById('info').style.display = 'block'
    }
    else {
      this.bunches.forEach(b => b.fixAttackOnPause(new Date().getTime() - this.dp))
      document.getElementById('info').style.display = 'none'
    }
    this.update()
  }
}

let game = new Game(1)
game.update()

document.addEventListener('keydown', (e) => {
  e.preventDefault()

  game.player.actionD(e.code)
  
  if (e.code == 'KeyM')
    game.sound.muted = !game.sound.muted 

  if (e.code == 'KeyN') 
    game.build(true)

  if (e.code == 'Escape')
    game.tooglePause()

})
document.addEventListener('keyup', (e) => {
  game.player.actionU(e.code)
})

document.getElementById('volume-in').onchange = function() {
  game.sound.volume = this.value
  game.sound.enemyDead()
}
