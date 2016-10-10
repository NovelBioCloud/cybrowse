import {EventEmitter} from 'events'
export default class CyStyleService extends EventEmitter {
  constructor(container) {
    super()
  }
  update() {
    this.emit('update')
  }
  init() { }
}