import BaseStyle from '../../platform/cytoscapeStyle/baseStyle'
import Emitter from '../../base/emitter/emitter'

export default class BaseStyleService {

  constructor() {
    this._onChange = new Emitter()
    this.activeEntryId = 'default'

  }

  get onChange() {
    return this._onChange.event
  }

  init(props, context) {
    this.props = props
    this.context = context
    this.initStyleEntries()
    const baseStyle = new BaseStyle()
    baseStyle.init({
      container: props.container
    }, {
        onChange: (value) => {
          this.activeEntryId = value
          this._onChange.emit(value)
        }
      })
    baseStyle.setEntries(this.styleEntries)

  }
  initStyleEntries() {
    this.styleEntries = [
      {
        id: 'default',
        name: 'default',
        title: 'default',
        style: [{
          "selector": "node",
          "style": {
            "border-color": "rgb(204,204,204)",
            "font-family": "SansSerif.plain",
            "font-weight": "normal",
            "font-size": 12,
            "background-color": "rgb(137,208,245)",
            "border-opacity": 1.0,
            "height": 35.0,
            "text-opacity": 1.0,
            "text-valign": "center",
            "text-halign": "center",
            "border-width": 0.0,
            "width": 75.0,
            "background-opacity": 1.0,
            "color": "rgb(0,0,0)",
            "shape": "roundrectangle",
            "content": "data(id)"
          }
        }]
      },
      {
        id: 'name1',
        name: 'name1',
        title: 'name1',
        style: []
      }
    ]
  }
  getStyle(styleName) {
    styleName = styleName || this.activeEntryId
    return this.styleEntries.find((item) => {
      return item.id === styleName
    })
  }
}