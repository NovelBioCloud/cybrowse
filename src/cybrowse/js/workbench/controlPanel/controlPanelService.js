import $ from 'jquery'

import dispose from '../../base/lifecycle/lifecycle'
import TabPanelService from './tabPanelService'
import BaseStyleService from '../cytoscapeStyle/baseStyleService'
import CurrentDataService from '../cytoscapeData/currentDataService'
import CurrentStyleService from '../cytoscapeStyle/currentStyleService'
import NodeStyleService from '../cytoscapeStyle/nodeStyleService'
import EdgeStyleService from '../cytoscapeStyle/edgeStyleService'

export default class ControlPanelService {
  constructor() {
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    let baseStyleService = context.services.baseStyleService
    baseStyleService.init({
      container: this.props.container
    }, context)
    let currentDataService = context.services.currentDataService
    let currentStyleService = context.services.currentStyleService
    let nodeStyleService = new NodeStyleService()
    let edgeStyleService = new EdgeStyleService()
    let tabPanelService = new TabPanelService()

    currentDataService.init({

    }, context)

    tabPanelService.init({
      container: this.props.container,
    }, context)
    currentStyleService.init({
      baseStyleService
    }, context)
    nodeStyleService.init({
      currentDataService,
      currentStyleService,
      container: tabPanelService.getContainer('node')
    }, context)
    edgeStyleService.init({
      currentDataService,
      currentStyleService,
      container: tabPanelService.getContainer('edge')
    }, context)

  }
  dispose() {
    dispose(this._toDispose)
  }
}