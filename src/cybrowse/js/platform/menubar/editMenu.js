import $ from 'jquery'
import { EditMenuCommands } from '../command/commands'

/** 菜单栏中的编辑按钮button */
export default class EditMenu {

  init(props, context) {
    let container = props.container
    this.container = container
    this.context = context
    this.initControls()
    this.render()
    this.registerCommand()
    this.registerListener()
  }
  /**
   * 渲染视图
   */
  render() {
    const $el = $(`
      <div class='btn-group'>
        <button type='button' class='fn-edit-menu btn btn-default dropdown-toggle' data-toggle='dropdown'>
          编辑&nbsp;(ALT+E)
        </button>
        <ul class='dropdown-menu' role='menu'>
          <li><a class='fn-undo' href='javascript:void(0)'>撤销</a></li>
          <li><a class='fn-redo' href='javascript:void(0)'>恢复</a></li>
        </ul>
      </div>
    `)
    $el.appendTo($(this.container))
    this.el = $el.get(0)
  }
  /**
   * 注册命令
   */
  registerCommand() {
    const commandControl = this.controls.commandControl
    commandControl.registerCommand(EditMenuCommands.undo, {
      args: null,
      handle: () => {
        this.undo()
      }
    })
    commandControl.registerCommand(EditMenuCommands.redo, {
      args: null,
      handle: () => {
        this.redo()
      }
    })
  }
  /**
   * 撤销操作
   */
  undo() {
    console.log('todo undo')
  }
  /**
   * 取消撤销操作
   */
  redo() {
    console.log('todo redo')
  }
  /**
   * 初始化服务
   */
  initControls() {
    const controls = Object.assign({}, this.context.controls)
    this.controls = controls
    const context = {
      controls: controls
    }
  }
  /** 注册事件 */
  registerListener() {
    const $el = $(this.el)
    const commandControl = this.controls.commandControl
    const keybindingControl = this.controls.keybindingControl
    keybindingControl.bind(['alt+e'], function (e) {
      $el.find('.fn-edit-menu').trigger('click')
      return false
    });
    $el.find('.fn-undo').on('click', () => {
      commandControl.runCommand(EditMenuCommands.undo)
    })
    $el.find('.fn-redo').on('click', () => {
      commandControl.runCommand(EditMenuCommands.redo)
    })
  }
  destroy() {
    this.$el.remove()
  }

}