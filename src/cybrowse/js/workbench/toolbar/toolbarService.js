import Toolbar from './toolbar'
export default class ToolbarService {
  init(props, context) {
    const toolbar = new Toolbar()
    toolbar.init(props, context)
  }
}