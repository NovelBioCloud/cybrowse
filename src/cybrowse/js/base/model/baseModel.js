import _ from 'lodash'
import EventMitter from 'events'

/**
 * MVVM 设计模式中的 vm 对象，该对象是一个工具类，帮助构建需要一个数组数据的 ViewModel
 */
export default class BaseModel extends EventMitter {
  /**
   * 构建方法
   */
  constructor() {
    super()
    this._entries = []
    this._defaultValue = -1
  }
  /**
   * 手动初始化方法
   * @param props 常规参数对象
   * @param context 外部环境对象
   */
  init(props, context) {
    this.props = props
    this.context = context
  }
  /**
   * 设置数组数据，并且默认第一个数据是激活状态
   */
  setEntries(_entries, _defaultValue = 0) {
    if (!_.isArray(_entries)) {
      throw new Error('input value must be an array')
    }
    this._entries = _entries
    this._setFocus(_defaultValue)
    this.emit('update')
  }
  /**
   * 获取数据
   * @return
   */
  getEntries() {
    return this._entries
  }
  /**
   * 添加一个数据，并发布添加(add)事件
   */
  add(entry) {
    this._entries.push(entry)
    this._defaultValue = this._entries.length
    this.emit('add', entry)
  }
  /**
   * 删除数据，并发布删除(remove)事件
   */
  remove(entry) {
    let curFocus = this._defaultValue
    let entryIndex = _.findIndex(this._entries, entry)
    if (curFocus > entryIndex) {
      this._defaultValue = curFocus - 1
    }
    _.pull(this._entries, entry)
    this.emit('remove', entry)
  }
  /**
   * 获取激活的数据
   */
  getFocus() {
    return this._defaultValue
  }
  /**
   * 设置激活的数据
   * @param indexOrEntry 需要激活数据的index或者对象，并发布(focus)事件
   */
  setFocus(indexOrEntry) {
    this._setFocus(indexOrEntry)
    this.emit('focus', this._defaultValue)
  }
  /**
   * 设置激活的数据
   * @param indexOrEntry 需要激活数据的index或者对象
   */
  _setFocus(indexOrEntry) {
    const index = indexOrEntry
    const entry = indexOrEntry
    if (_.isNumber(index)) {
      if (0 <= index && index < this._entries.length) {
        this._defaultValue = index
      }
    } else {
      let entryIndex = _.findIndex(this._entries, entry)
      if (entryIndex > -1) {
        this._defaultValue = entryIndex
      }
    }
  }
}