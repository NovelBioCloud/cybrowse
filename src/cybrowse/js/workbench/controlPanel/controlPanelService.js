import $ from 'jquery'

import { dispose } from '../../base/lifecycle/lifecycle'
import ControlPanel from '../../platform/controlPanel/controlPanel'
import BaseStyleService from '../controlPanelPart/baseStyleService'
import NodeStyleService from '../controlPanelPart/nodeStyleService'
import EdgeStyleService from '../controlPanelPart/edgeStyleService'

/**
 * 编辑框服务
 */
export default class ControlPanelService {
  constructor() {
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    let currentBaseStyleService = context.services.currentBaseStyleService
    let currentDataService = context.services.currentDataService
    let currentStyleService = context.services.currentStyleService
    let baseStyleService = new BaseStyleService()
    let nodeStyleService = new NodeStyleService()
    let edgeStyleService = new EdgeStyleService()
    let controlPanel = new ControlPanel()
    controlPanel.init({
      container: this.props.container,
    }, context)
    baseStyleService.init({
      currentBaseStyleService,
      container: controlPanel.getContainer('baseStyle')
    }, context)
    nodeStyleService.init({
      currentDataService,
      currentStyleService,
      container: controlPanel.getContainer('node')
    }, context)
    edgeStyleService.init({
      currentDataService,
      currentStyleService,
      container: controlPanel.getContainer('edge')
    }, context)

  }
  dispose() {
    dispose(this._toDispose)
  }
}