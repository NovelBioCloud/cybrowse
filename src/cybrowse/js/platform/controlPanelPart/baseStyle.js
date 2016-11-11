import $ from 'jquery'
import _ from 'lodash'
import EventEmitter from 'events'

/**
 * BaseStyle，修改基本样式的面板，左侧编辑框的下拉菜单
 */
export default class BaseStyle extends EventEmitter {
  constructor() {
    super()
  }
  init(props, context) {
    this.model = new BaseStyleModel()
    this.model.init(props, context)
    this.view = new BaseStyleView()
    this.view.init({
      container: props.container,
      controller: this
    }, context)
    this.view.setModel(this.model)
    this.setEntries(props.entries)
  }
  setEntries(entries, index) {
    this.model.setEntries(entries, index)
  }
  add(entry) {
    this.model.add(entry)
  }
  remove(entry) {
    this.model.remove(entry)
  }
}
/** 基础样式管理类数据模型 */
class BaseStyleModel extends EventMitter {
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
/**
 * BaseStyle的视图类
 */
class BaseStyleView extends EventEmitter {
  constructor() {
    super()
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.container = props.container
  }
  setModel(styleModel) {
    this.model = styleModel
    this.registerListener()
  }
  registerListener() {
    this.dispose()
    const model = this.model
    const toDispose = ['update', 'focus', 'add', 'remove'].map((item) => {
      const listener = (...data) => {
        this.doAction(item, ...data)
      }
      model.addListener(item, listener)
      return {
        toDispose: () => {
          model.removeListener(item, listener)
        }
      }
    })
  }
  //服务分发方法
  doAction(item, ...data) {
    switch (item) {
      case 'update':
        this.update()
        break
      case 'add':
        this.add(...data)
        break
      case 'remove':
        this.remove(...data)
        break
      default:
        break
    }
  }
  update() {
    this.$el = $('<div/>').css('padding-bottom', '10px').appendTo($(this.container))
    this.$el.html(_.template(`
      <select class="form-control">
        <% _.each(entries,(entry)=>{ %>
          <option value='<%=entry.id%>'><%=entry.name%></option>
        <% }) %>
      </select>
    `)({ entries: this.model.getEntries() }))
    this.$el.find('select').on('change', (e) => {
      this.props.onChange && this.props.onChange(e.target.value)
    })
  }
  add(...data) {

  }
  remove(...data) {

  }
  dispose() {
    this._toDispose.forEach((disposable) => {
      disposable.dispose()
    })
    this.$el && this.$el.remove()
  }
}
