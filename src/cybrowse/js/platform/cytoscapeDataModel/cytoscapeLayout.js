import EventEmitter from 'events'
import Emitter from '../../base/emitter'
import _ from 'lodash'
import configs from './defaultLayoutConfigs'
/**
 * 布局数据服务
 * @see currentLayoutControl
 */
export default class CytoscapeLayout {
  constructor() {
    this._active = 'random'
    this._layoutEntries = configs
  }
  /** 获取样式数据 */
  getLayoutEntries() {
    return this._layoutEntries
  }
  /** 获取布局数据 */
  getLayout(layoutName) {
    layoutName = layoutName || this._active
    return _.find(this._layoutEntries, (layout) => {
      return layout.name == layoutName
    })
  }
  /** 修改布局 */
  changeLayout(layoutName) {
    this._active = layoutName || this._active
    const layout = _.find(this._layoutEntries, (layout) => {
      return layout.name == layoutName
    })
  }
}