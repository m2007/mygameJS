export default class Camera {
  constructor() { 
    this.x = 0
    this.y = 0
  }

  update(obj) {
    if (obj.x + obj.width - this.x <= 0) {
      obj.x = Math.trunc((obj.x+100 * (obj.x > 0 ? 1 : -1)) / 700) * 700 - obj.width - 50
      this.x -= 700
    }
      
    if (obj.x - this.x >= 700) {
      obj.x =  Math.trunc(obj.x / 700) * 700  + 50
      this.x += 700
    }
    if (obj.y + obj.height - this.y <= 0){
      obj.y =  Math.trunc((obj.y + 100 * (obj.y > 0 ? 1 : -1)) / 700) * 700  - obj.height - 50
      this.y -= 700
    }
    if (obj.y - this.y >= 700) {
      obj.y =  Math.trunc(obj.y / 700) * 700 + 50
      this.y += 700
    }
  }
}
