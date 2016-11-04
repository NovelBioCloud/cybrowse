import Toolbar from './toolbar'
/**toolbar 服务 */
export default class ToolbarService {
  init(props, context) {
    const toolbar = new Toolbar()
    toolbar.init(props, context)
  }
}