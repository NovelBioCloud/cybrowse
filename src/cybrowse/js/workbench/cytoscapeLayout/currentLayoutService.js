import EventEmitter from 'events'
import Emitter from '../../base/emitter/emitter'
import _ from 'lodash'
/**
 * 布局服务 
 */
import configs from '../../platform/cytoscapeLayout/defaultLayoutConfigs'
export default class CurrentLayoutService {
  constructor() {
    this._onChange = new Emitter()
    this._active = 'random'
    this._layoutEntries = configs
  }
  getLayoutEntries() {
    return this._layoutEntries
  }
  get onChange() {
    return this._onChange.event
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
    this._onChange.emit(layout)

  }
}