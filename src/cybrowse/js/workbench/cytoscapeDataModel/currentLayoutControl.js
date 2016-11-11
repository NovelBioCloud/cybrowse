import EventEmitter from 'events'
import Emitter from '../../base/emitter'
import _ from 'lodash'
import CytoscapeLayout from '../../platform/cytoscapeDataModel/cytoscapeLayout'

/**
 * 布局服务，包括了当前布局数据，以及修改布局数据的功能
 */
export default class CurrentLayoutControl {
  constructor() {
    this._onChange = new Emitter()
    this.cytoscapeLayout = new CytoscapeLayout()
  }
  /** 获取布局数据 */
  getLayoutEntries() {
    return this.cytoscapeLayout.getLayoutEntries()
  }
  get onChange() {
    return this._onChange.event
  }
  getLayout(layoutName) {
    return this.cytoscapeLayout.getLayout(layoutName)
  }
  /** 获取当前正在使用的布局的数据 */
  getActiveLayout() {
    return this.cytoscapeLayout.getLayout()
  }
  /** 修改使用中的布局 */
  changeLayout(layoutName) {
    this.changeLayout(layoutName)
    this._onChange.emit(this.getActiveLayout())

  }
}