import $ from 'jquery'
import FileMenu from './fileMenu'
import EditMenu from './editMenu'
import LayoutMenu from './layoutMenu'
import SaveMenu from './saveMenu'
import StyleMenu from './styleMenu'

/**
 * 菜单栏中的菜单面板，包括了各种子面板
 */
export default class Menubar {

  constructor() { }

  init(props, context) {
    this.props = props
    this.context = context
    this.container = props.container
    this.render()
  }

  render() {
    let container = this.container
    const $el = $(`<div style='padding:10px 0px'/>`).appendTo($(this.props.container))
    this.el = $el.get(0)
    const $menubar = $('<div/>', {
      'class': 'btn-menubar',
      'role': 'toolbar'
    }).appendTo($el)
    const $btnGroup = $('<div/>', {
      'class': 'btn-group'
    }).appendTo($menubar)

    let fileMenu = new FileMenu()
    fileMenu.init(Object.assign(this.props, {
      container: $btnGroup.get(0)
    }), this.context)
    let editMenu = new EditMenu()
    editMenu.init(Object.assign(this.props, {
      container: $btnGroup.get(0)
    }), this.context)
    let layoutMenu = new LayoutMenu()
    layoutMenu.init(Object.assign(this.props, {
      container: $btnGroup.get(0)
    }), this.context)
    let saveMenu = new SaveMenu()
    saveMenu.init(Object.assign(this.props, {
      container: $btnGroup.get(0)
    }), this.context)
    let styleMenu = new StyleMenu()
    styleMenu.init(Object.assign(this.props, {
      container: $btnGroup.get(0)
    }), this.context)

  }
  destroy() {
    this.$el.remove()
  }

}