export default class Sound {
  constructor(volume=0.1) {
    this.volume = volume
    this.muted = false

    this.bunchAttackA = new Audio('./dist/sounds/bunch-attack.WAV')
    this.bossAttackA = new Audio('./dist/sounds/boss-attack.WAV')
    this.playerAttackA = new Audio('./dist/sounds/player-attack.WAV')

    this.playerWalkA = new Audio('./dist/sounds/player-walk.WAV')

    this.playerHurtA = new Audio('./dist/sounds/player-hurt.WAV')

    this.playerDeadA = new Audio('./dist/sounds/player-dead.WAV')
    this.bunchDeadA = new Audio('./dist/sounds/bunch-dead.WAV')
    this.enemyDeadA = new Audio('./dist/sounds/enemy-dead.WAV')
    this.bossDeadA = new Audio('./dist/sounds/boss-dead.WAV')

    this.doorOpenA = new Audio('./dist/sounds/door-open.WAV')
    this.itemGrabA = new Audio('./dist/sounds/grab-item.WAV') 
     
  }

  bunchAttack() {
    if (!this.muted) {
      this.bunchAttackA.volume = this.volume
      this.bunchAttackA.play()
    }
  }

  bossAttack() {
    if (!this.muted) {
      this.bossAttackA.volume = this.volume
      this.bossAttackA.play()
    }
  }

  playerAttack() {
    if (!this.muted) {
      this.playerAttackA.volume = this.volume
      this.playerAttackA.play()
    }
  }

  playerWalk() {
    if (!this.muted) {
      this.playerWalkA.volume = this.volume
      this.playerWalkA.play()
    }
  }

  playerHurt() {
    if (!this.muted) {
      this.playerHurtA.volume = this.volume
      this.playerHurtA.play()
    }
  }

  playerDead() {
    if (!this.muted) {
      this.playerDeadA.volume = this.volume
      this.playerDeadA.play()
    }
  }

  bunchDead() {
    if (!this.muted) {
      this.bunchDeadA.volume = this.volume
      this.bunchDeadA.play()
    }
  }

  enemyDead() {
    if (!this.muted) {
      this.enemyDeadA.volume = this.volume
      this.enemyDeadA.play()
    }
  }

  bossDead() {
    if (!this.muted) {
      this.bossDeadA.volume = this.volume
      this.bossDeadA.play()
    }
  }

  doorOpen() {
    if (!this.muted) {
      this.doorOpenA.volume = this.volume
      this.doorOpenA.play()
    }
  }

  itemGrab() {
    if (!this.muted) {
      this.itemGrabA.volume = this.volume
      this.itemGrabA.play()
    }
  }
}
