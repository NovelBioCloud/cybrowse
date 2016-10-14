import dispose from '../../base/lifecycle/lifecycle'
import TableNodePanel from './tableNodePanel'
import TableTabPanelService from './tableTabPanelService'
export default class TablePanelService {

  init(props, context) {
    this._toDispose = []
    this.props = props
    this.context = context
    this.initServices()
    this.registerListener()
  }

  initServices() {
    this.services = this.context.services
    const tableTabPanelService = new TableTabPanelService()
    tableTabPanelService.init({
      container: this.props.container
    }, this.context)
    const tableNodePanel = new TableNodePanel()
    tableNodePanel.init({
      container: tableTabPanelService.getContainer('node')
    }, {})
  }

  registerListener() {
    const viewPanelService = this.services.viewPanelService
    this._toDispose.push(
      (() => {
        let callback = (event) => {
          this.onTap(event)
        }
        viewPanelService.on('tap', callback)
        return {
          dispose: () => {
            viewPanelService.off('tap', callback)
          }
        }
      })()
    )
  }
  dispose() {
    dispose(this._toDispose)
    this._toDispose = []
  }
  onTap(event) {
    console.log(event)
  }
}