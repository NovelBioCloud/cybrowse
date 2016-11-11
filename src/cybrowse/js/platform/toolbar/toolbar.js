import $ from 'jquery'
import { ViewPanelCommand } from '../command/commands'

/**
 * 工具栏面板，菜单栏下面
 */
export default class Toolbar {

  constructor() { }

  init(props, context) {
    this.props = props
    this.context = context
    this.controls = context.controls
    this.container = props.container
    this.render()
  }

  render() {
    let container = this.container
    const $el = $(`
      <div style='padding:0 0 10px 0'>
        <div class='btn-group'>
          <button type='button' class='fn-center btn btn-default btn-sm'>居中</button>
          <button type='button' class='fn-zoom-in btn btn-default btn-sm'>放大</button>
          <button type='button' class='fn-zoom-out btn btn-default btn-sm'>缩小</button>
        </div>
      </div>
    `).appendTo($(this.props.container))

    const commandControl = this.controls.commandControl
    $el.find('.fn-center').click(() => {
      commandControl.runCommand(ViewPanelCommand.center)
    })
    $el.find('.fn-zoom-out').click(() => {
      commandControl.runCommand(ViewPanelCommand.zoomOut)
    })
    $el.find('.fn-zoom-in').click(() => {
      commandControl.runCommand(ViewPanelCommand.zoomIn)
    })
  }
  destroy() {
    this.$el.remove()
  }

}