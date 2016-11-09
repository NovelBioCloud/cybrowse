/**
 * 当前样式数据服务的定义
 * @see currentStyleService
 */
export default class CytoscapeStyle {
  init(props, context) {
    this.props = props
    this.context = context
    const currentBaseStyleService = context.services.currentBaseStyleService
    this.currentBaseStyleService = currentBaseStyleService
    this._style = this.currentBaseStyleService.getStyle()
  }

  /** 更新当前的样式数据 */
  updateBaseStyle() {
    this._style = this.currentBaseStyleService.getStyle()
  }
  /**
   * 获取当前样式数据
   */
  getStyle() {
    return this._style
  }

}