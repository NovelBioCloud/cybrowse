import $ from 'jquery'
import _ from 'lodash'
import EventEmitter from 'events'
import BaseModel from '../../base/model/baseModel'


/**基础样式管理类 */
export class BaseStyleModel extends BaseModel {
  constructor() {
    super()
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
      this.context.onChange && this.context.onChange(e.target.value)
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
/**
 * BaseStyle，修改基本样式
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