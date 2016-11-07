import EventEmitter from 'events'
import Emitter from '../../base/emitter/emitter'
import _ from 'lodash'
/**
 * 布局服务 
 */
import configs from './defaultLayoutConfigs'
export default class CytoscapeLayout {
  constructor() {
    this._active = 'random'
    this._layoutEntries = configs
  }
  getLayoutEntries() {
    return this._layoutEntries
  }
  getLayout(layoutName) {
    layoutName = layoutName || this._active
    return _.find(this._layoutEntries, (layout) => {
      return layout.name == layoutName
    })
  }
  changeLayout(layoutName) {
    this._active = layoutName || this._active
    const layout = _.find(this._layoutEntries, (layout) => {
      return layout.name == layoutName
    })
  }
}