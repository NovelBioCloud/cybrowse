import $ from 'jquery'
import CommandControl from '../../workbench/command/commandControl'
import KeybindingControl from '../../workbench/keybinding/keybindingControl'
import {StyleMenuCommands} from '../command/commands'

/**
 * 菜单栏中样式修改相关的菜单
 * 功能：
 *  新建
 *  导入
 *  导出
 */
export default class StyleMenu {

  init(props, context) {
    this.props = props
    this.context = context
    let container = props.container
    this.container = container
    this.initControls()
    this.render()
    this.registerCommand()
    this.registerListener()
  }
  render() {
    const $el = $(`
      <div class='btn-group'>
        <button type='button' class='fn-style-menu btn btn-default dropdown-toggle' data-toggle='dropdown'>
          样式&nbsp;(ALT+T)
        </button>
        <ul class='dropdown-menu' role='menu'>
          <li><a class='fn-new-style' href='javascript:void(0)'>新建样式文件</a></li>
          <li><a class='fn-open-style' href='javascript:void(0)'>导入样式</a></li>
          <li><a class='fn-open-style' href='javascript:void(0)'>导出样式</a></li>
        </ul>
      </div>
    `)
    $el.appendTo($(this.container))
    this.el = $el.get(0)
  }
  initControls() {
    const controls = Object.assign({}, this.context.controls)
    this.controls = controls
    const context = {
      controls: controls
    }
  }
  registerCommand() {
    const commandControl = this.controls.commandControl
    /**
     * 创建新的样式
     */
    commandControl.registerCommand(StyleMenuCommands.newStyle, {
      args: null,
      handle: () => {
        this.newStyle()
      }
    })
    /**
     * 导入样式
     */
    commandControl.registerCommand(StyleMenuCommands.importStyle, {
      args: null,
      handle: () => {
        this.importStyle()
      }
    })
    /**
     * 导出样式
     */
    commandControl.registerCommand(StyleMenuCommands.exportStyle, {
      args: null,
      handle: () => {
        this.exportStyle()
      }
    })
  }
  newStyle() {
    console.log('newStyle')
  }
  importStyle() {
    console.log('importStyle')
  }
  exportStyle() {
    console.log('exportStyle')
  }
  /** 注册监听函数 */
  registerListener() {
    const $el = $(this.el)
    const commandControl = this.controls.commandControl
    const keybindingControl = this.controls.keybindingControl
    /**
     * 快捷键注册
     */
    keybindingControl.bind(['alt+t'], function (e) {
      $el.find('.fn-style-menu').trigger('click')
      return false
    });
    $el.find('.fn-new-style').on('click', () => {
      commandControl.runCommand(StyleMenuCommands.newStyle)
    })
    $el.find('.fn-import-style').on('click', () => {
      commandControl.runCommand(StyleMenuCommands.importStyle)
    })
    $el.find('.fn-export-style').on('click', () => {
      commandControl.runCommand(StyleMenuCommands.exportStyle)
    })
  }
  destroy() {
    this.$el.remove()
  }

}