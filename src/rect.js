export default class Rect {
  constructor(x, y, w, h, ctx, src_img) {
    this.x = x
    this.y = y

    this.width = w
    this.height = h
    this.ctx = ctx
    if (src_img) {
      this.img = new Image()
      this.img.src = src_img
    }
  }
  
  update(camera) {

    let pattern = this.ctx.createPattern(this.img, "repeat")
    this.ctx.fillStyle = pattern
    this.ctx.fill()
    this.ctx.fillRect(this.x - camera.x, this.y - camera.y, this.width, this.height)
  }

  collideRectangle(rect) {
    if (!rect) return false
    
    if  (
      this.x + this.width > rect.x && this.x + this.width < rect.x + rect.width 
      && this.y + this.height > rect.y && this.y + this.height < rect.y + rect.height
      ||
      this.x + this.width > rect.x && this.x + this.width < rect.x + rect.width 
      && this.y > rect.y && this.y  < rect.y + rect.height
      ||
      this.x > rect.x && this.x < rect.x + rect.width 
      && this.y + this.height > rect.y && this.y + this.height < rect.y + rect.height
      ||
      this.x > rect.x && this.x  < rect.x + rect.width 
      && this.y  > rect.y && this.y < rect.y + rect.height
  
      ||
  
      rect.x + rect.width > this.x && rect.x + rect.width < this.x + this.width 
      && rect.y + rect.height > this.y && rect.y + rect.height < this.y + this.height
      ||
      rect.x + rect.width > this.x && rect.x + rect.width < this.x + this.width 
      && rect.y > this.y && rect.y  < this.y + this.height
      ||
      rect.x > this.x && rect.x < this.x + this.width 
      && rect.y + rect.height > this.y && rect.y + rect.height < this.y + this.height
      ||
      rect.x > this.x && rect.x  < this.x + this.width 
      && rect.y  > this.y && rect.y < this.y + this.height
      )
      {
        return true
      }
    return false
  }

  getAngle(rect) {
    let xo = rect.x + rect.width / 2
    let yo = rect.y + rect.height / 2
    let xt = this.x + this.width / 2
    let yt = this.y + this.height / 2

    let angle = Math.acos((xo-xt)/Math.sqrt( Math.pow(xo-xt, 2) + Math.pow(yo-yt,2) ))

    if (yo > yt) angle = 2 * Math.PI - angle

    return angle
  }
}
