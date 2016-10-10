import $ from 'jquery'
import FileMenu from './fileMenu'
import EditMenu from './editMenu'

export default class Toolbar {

  constructor() { }

  init(props, context) {
    this.props = props
    this.context = context
    this.container = props.container
    this.render()
  }

  render() {
    let container = this.container
    const $el = $('<div/>', {
      'class': 'btn-toolbar',
      role: 'toolbar'
    }).appendTo($(this.props.container))
    const $btnGroup = $('<div/>', {
      class: 'btn-group'
    }).appendTo($el)
    this.el = $el.get(0)

    let fileMenu = new FileMenu()
    fileMenu.init(Object.assign(this.props, {
      container: $btnGroup.get(0)
    }), this.context)
    let editMenu = new EditMenu()
    editMenu.init(Object.assign(this.props, {
      container: $btnGroup.get(0)
    }), this.context)
  }
  destroy() {
    this.$el.remove()
  }

}