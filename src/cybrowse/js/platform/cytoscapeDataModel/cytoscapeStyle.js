

/**当前样式服务 */
export default class CytoscapeStyle {
  init(props, context) {
    this.props = props
    this.context = context
    const currentBaseStyleService = context.services.currentBaseStyleService
    this.currentBaseStyleService = currentBaseStyleService
    this._style = this.currentBaseStyleService.getStyle()
  }

  updateBaseStyle() {
    this._style = this.currentBaseStyleService.getStyle()
  }
  getStyle() {
    return this._style
  }

}