export default class Panel {
  constructor() {
    this.heart = new Image()
    this.heart.src = './dist/img/heart.png'
    this.bossHeart = new Image()
    this.bossHeart.src = './dist/img/boss-heart.png'
    this.bullet = new Image()
    this.bullet.src = './dist/img/bullet.png'
    this.types_bullet = [{ name: 'SINGLE_BULLET', src: './dist/img/bullet.png'}, { name: 'TRIPLE_BULLET', src: './dist/img/triple-bullet.png'}]
  }
  
  update(game) {
    if  (game.boss && !(game.boss.x - game.camera.x >= 700 || game.boss.y - game.camera.y >= 700 || 
      game.boss.x - game.camera.x < 0 || game.boss.y - game.camera.y < 0
      ))
      {
        for (let i = 0; i < game.boss.hearts; i++) {
          game.ctx.drawImage(this.bossHeart, 190 + i*30, 655, 30, 30)
        }
      }
    game.ctx.fillStyle = 'white'
    game.ctx.font = "20px Arial"
    game.ctx.fillText(`Level: ${game.level}`, 580, 32)
    game.ctx.fillText('Bullet:', 450, 32)
    game.ctx.fillText('Health:', 20, 32)
    game.ctx.font = "14px Arial"
    game.ctx.fillText('Esc - пауза и информация', 525, 695)

    
    for (let i = 0; i < game.player.hearts; i++) {    
      game.ctx.drawImage(this.heart, 90 + i*25, 12, 25, 25)
    }
    game.ctx.drawImage(this.bullet, 510, 12, 25, 25)
  }
}
