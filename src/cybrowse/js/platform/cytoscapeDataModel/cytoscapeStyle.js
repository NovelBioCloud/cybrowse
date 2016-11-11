/**
 * 当前样式数据服务的定义
 * @see currentStyleControl
 */
export default class CytoscapeStyle {
  init(props, context) {
    this.props = props
    this.context = context
    const currentBaseStyleControl = context.controls.currentBaseStyleControl
    this.currentBaseStyleControl = currentBaseStyleControl
    this._style = this.currentBaseStyleControl.getStyle()
  }

  /** 更新当前的样式数据 */
  updateBaseStyle() {
    this._style = this.currentBaseStyleControl.getStyle()
  }
  /**
   * 获取当前样式数据
   */
  getStyle() {
    return this._style
  }

}