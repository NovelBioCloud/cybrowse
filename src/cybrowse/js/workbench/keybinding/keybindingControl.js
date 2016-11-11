import Mousetrap from 'mousetrap'

/**
 * 键盘事件服务
 * 注册快捷键方法，通过该类的实例实现
 */
class KeybindingControl {
  constructor() {
    throw new Error('please use method KeybindingControl.instance() to create the server')
  }
  init(props, context) {
    // do nothing
  }
}
/**
 * 键盘服务类实例，和键盘相关的快捷键事件，需要通过该类处理
 */
KeybindingControl.instance = () => {
  return Mousetrap
}
export default KeybindingControl