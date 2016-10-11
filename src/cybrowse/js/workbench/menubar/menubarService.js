import Menubar from './menubar'
export default class MenubarService {
  init(props, context) {
    let menubar = new Menubar()
    menubar.init(props, context)
  }
}