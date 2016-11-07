import EventEmitter from 'events'
import Emitter from '../../base/emitter/emitter'
import _ from 'lodash'
import CytoscapeLayout from '../../platform/cytoscapeDataModel/cytoscapeLayout'

/**
 * 布局服务 
 */
export default class CurrentLayoutService {
  constructor() {
    this._onChange = new Emitter()
    this.cytoscapeLayout = new CytoscapeLayout()
  }
  getLayoutEntries() {
    return this.cytoscapeLayout.getLayoutEntries()
  }
  get onChange() {
    return this._onChange.event
  }
  getLayout(layoutName) {
    return this.cytoscapeLayout.getLayout(layoutName)
  }
  getActiveLayout() {
    return this.cytoscapeLayout.getLayout()
  }
  changeLayout(layoutName) {
    this.changeLayout(layoutName)
    this._onChange.emit(this.getActiveLayout())

  }
}