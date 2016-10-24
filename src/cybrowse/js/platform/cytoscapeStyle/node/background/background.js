import $ from 'jquery'
import _ from 'lodash'
import EventEmitter from 'events'
import Color from 'color'
import { NodeStyleName, EdgeStyleName, NodeStyleModel, EdgeStyleModel } from '../../../../base/cytoscape/styles'
import DataModel from '../../../../base/cytoscape/datas'
import ColorSelector from '../../../../base/colorSelector/colorSelector'
import DefaultValue from './defaultValue'
import Mapping from './mapping'
import Bypass from './bypass'

export default class Background {
  constructor() {
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.render()
  }
  render() {

    const props = this.props
    const context = this.context
    $(this.props.container).empty()
    const backgroundView = new BackgroundView()
    backgroundView.init({
      container: this.props.container
    })
    const currentStyleService = this.context.services.currentStyleService
    const viewPanelService = this.context.services.viewPanelService
    const styleModel = new NodeStyleModel(NodeStyleName.backgroundColor, currentStyleService)
    const dataModel = new DataModel(currentStyleService)
    const defaultValue = new DefaultValue()
    this.defaultValue = defaultValue
    defaultValue.init({
      styleModel: styleModel,
      dataModel: dataModel,
      valueType: '',
      container: backgroundView.getContainer('defaultValue'),
      callbacks: {
        onChange: (value) => {
          styleModel.setDefaultValue(value)
          viewPanelService.update()
        },
        onRemove: () => {
          styleModel.removeDefaultValue()
          viewPanelService.update()
        },
        onReset: () => {
          styleModel.setDefaultValue("#FF0000")
          viewPanelService.update()
        }
      }
    }, context)

    const mapping = new Mapping()
    this.mapping = mapping
    mapping.init({
      styleModel: styleModel,
      dataModel: dataModel,
      valueType: '',
      mappingContainer: backgroundView.getContainer('mappingContainer'),
      contentContainer: backgroundView.getContainer('contentContainer')
    }, context)
    const bypass = new Bypass()
    this.bypass = bypass
    bypass.init({
      styleModel: styleModel,
      dataModel: dataModel,
      container: backgroundView.getContainer('bypass')
    }, context)
  }
  update() {
    this.defaultValue.update()
    this.mapping.update()
    this.bypass.update()
  }
}
const ValueType = {
  integer: 'integer',
  color: 'color'
}
class BackgroundView {
  init(props, context) {
    this._panels = new Map()
    const $layout = $(`
      <div class='panel panel-default'>
        <ul class="list-group">
          <li class="list-group-item">
            <div style='display:flex'>
              <div class='' style='width:80px'>
                <div style='line-height:30px'><label>背景色</label></div>
              </div>
              <div class='fn-default' style='width:120px'></div>
              <div class='fn-mapping' style='width:70px'></div>
              <div class='fn-bypass' style='width:70px'></div>
            </div>
          </li>
          <li class="fn-content list-group-item">
          </li>
        </ul>
      </div>`).appendTo($(props.container))
    const $defaultValue = $layout.find('.fn-default')
    const $mappingContainer = $layout.find('.fn-mapping')
    const $bypass = $layout.find('.fn-bypass')
    const $contentContainer = $layout.find('.fn-content')
    this._panels.set('defaultValue', $defaultValue.get(0))
    this._panels.set('mappingContainer', $mappingContainer.get(0))
    this._panels.set('bypass', $bypass.get(0))
    this._panels.set('contentContainer', $contentContainer.get(0))
  }
  getContainer(name) {
    return this._panels.get(name)
  }
}



