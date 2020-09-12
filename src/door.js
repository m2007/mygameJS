import Rect from './rect'

export default class Door extends Rect {
  constructor(x, y, w, h, open, exitlevel, id, sound, ctx) {
    super(x, y, w, h, ctx, './dist/img/open_door.png')
    this.sound = sound
    this.open = open
    this.exit = exitlevel
    this.id = id
  }
  
  update(camera) {
    this.img.src
     = `./dist/img/${this.open ? 'open' : 'close'}_door${this.height > this.width ? '_v' : ''}${this.exit ? '_l' : ''}.png`

    this.ctx.drawImage(this.img, this.x - camera.x, this.y - camera.y, this.width, this.height)
  }

  checkEnd(player) {
    if (this.collideRectangle(player) && this.open && this.exit) {
      return true
    }
    else return false
  }

  thisOpen(check=true) {
    if (check && !this.open) {
      this.sound.doorOpen()
      this.open = true
    }
  }
}
