import Toolbar from './toolbar'
export default class ToolbarService {
  init(props, context) {
    console.log(props)
    let toolbar = new Toolbar()
    toolbar.init(props, context)
  }
}