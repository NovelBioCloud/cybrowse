import {EventEmitter} from 'events'
import Emitter, {FireOnceEmitter} from '../../base/emitter/emitter'
export default class CyDataService extends EventEmitter {
  constructor(container) {
    super()
    this.toDispose = []
    this._onDidLoadData = new FireOnceEmitter()
  }
  get onDidLoadData() {
    return this._onDidLoadData.event
  }
  update() {
    this.emit('update')
  }
  loadData() {
    if (this._onDidLoadData) {
      this._onDidLoadData.emit()
      this._onDidLoadData = null
    }
  }
  init() { }
}