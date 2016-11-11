import Toolbar from '../../platform/toolbar/toolbar'
/**
 * toolbar 服务
 * 菜单栏下面的一排成为工具栏 
  */
export default class ToolbarControl {
  init(props, context) {
    /**
     * 工具栏实现
     */
    const toolbar = new Toolbar()
    toolbar.init(props, context)
  }
}