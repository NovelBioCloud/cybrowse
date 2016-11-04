import Mousetrap from 'mousetrap'

/**键盘事件服务 */
class KeybindingService {
  constructor() {
    throw new Error('please use method KeybindingService.instance() to create the server')
  }
  init(props, context) {

  }
}
/**
 * 键盘服务类实例，和键盘相关的快捷键事件，需要通过该类处理
 */
KeybindingService.instance = () => {
  return Mousetrap
}
export default KeybindingService