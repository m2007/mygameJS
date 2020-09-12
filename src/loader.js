import Rect from './rect'
import Door from './door'
import Enemy from './enemy'
import Bunch from './bunch'
import Item from './item'
import Boss from './boss'
export default class Loader {
  constructor(sound, ctx) {
    this.sound = sound
    this.ctx = ctx
  }
  
  loadWalls(lvl) {
    return require(`./level-${lvl}.json`)
      .layers.filter(e => e.name === 'walls')[0].objects
        .map(w => new Rect(
            w.x,
            w.y,
            w.width,
            w.height,
            this.ctx,
            findPropertie(w.properties, 'src')
          )
        )
  }

  loadItems(lvl) {
    return require(`./level-${lvl}.json`)
      .layers.filter(e => e.name === 'items')[0].objects
        .map(i => new Item(
            i.x,
            i.y,
            findPropertie(i.properties, 'type'),
            this.ctx
          )
        )
  }

  loadDoors(lvl) {
    return require(`./level-${lvl}.json`)
      .layers.filter(e => e.name === 'doors')[0].objects
        .map(d => new Door(
            d.x,
            d.y,
            d.width,
            d.height,
            findPropertie(d.properties, 'open'),
            findPropertie(d.properties, 'exit'),
            findPropertie(d.properties, 'id'),
            this.sound,
            this.ctx
          )
        )
  }

  loadEnemies(lvl) {
    return require(`./level-${lvl}.json`)
      .layers.filter(e => e.name === 'enemies')[0].objects
        .map(e => new Enemy(
            e.x,
            e.y,
            findPropertie(e.properties, 'speed'),
            this.sound,
            this.ctx
          )
        )
  }

  loadBunches(lvl) {
    return require(`./level-${lvl}.json`)
      .layers.filter(e => e.name === 'bunches')[0].objects
        .map(b => new Bunch(
            b.x,
            b.y,
            b.width,
            findPropertie(b.properties, 'speed'),
            findPropertie(b.properties, 'hearts'),
            findPropertie(b.properties, 'sizeBullet'),
            findPropertie(b.properties, 'speedBullet'),
            findPropertie(b.properties, 'timeRelax'),
            this.sound,
            this.ctx
          )
        )
  }

  loadBoss(lvl) {
    return require(`./level-${lvl}.json`)
      .layers.filter(e => e.name === 'boss')[0].objects
        .map(b => new Boss(
            b.x,
            b.y,
            b.width,
            b.height,
            findPropertie(b.properties, 'hearts'),
            findPropertie(b.properties, 'speed'),
            this.sound,
            this.ctx,
            findPropertie(b.properties, 'src'),
          )
        )[0]
  }
}

function findPropertie(arr, propValue) {
  for (var i=0; i < arr.length; i++)
    if (arr[i]['name'] == propValue)
    return arr[i].value
}
