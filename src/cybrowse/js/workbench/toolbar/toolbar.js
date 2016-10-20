import $ from 'jquery'
import { ViewPanelCommand } from '../viewPanel/viewPanelService'
export default class Toolbar {

  constructor() { }

  init(props, context) {
    this.props = props
    this.context = context
    this.services = context.services
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

    const commandService = this.services.commandService
    $el.find('.fn-center').click(() => {
      commandService.runCommand(ViewPanelCommand.center)
    })
    $el.find('.fn-zoom-out').click(() => {
      commandService.runCommand(ViewPanelCommand.zoomOut)
    })
    $el.find('.fn-zoom-in').click(() => {
      commandService.runCommand(ViewPanelCommand.zoomIn)
    })
  }
  destroy() {
    this.$el.remove()
  }

}