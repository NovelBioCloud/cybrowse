import Mousetrap from 'mousetrap'

/**键盘事件服务 */
class KeybindingService {
  constructor() {
    throw new Error('please use method KeybindingService.instance() to create the server')
  }
  init(props, context) {

  }
}
KeybindingService.instance = () => {
  return Mousetrap
}
export default KeybindingService