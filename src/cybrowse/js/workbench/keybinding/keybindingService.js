import Mousetrap from 'mousetrap'

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