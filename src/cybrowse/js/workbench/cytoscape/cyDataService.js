import {EventEmitter} from 'events'
export default class CyDataService extends EventEmitter {
  constructor(container) {
    super()
  }
  update() {
    this.emit('update')
  }
  init() { }
}