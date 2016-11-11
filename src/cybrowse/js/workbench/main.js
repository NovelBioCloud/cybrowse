import $ from 'jquery'
import _ from 'lodash'
import Lifecycle from '../base/lifecycle'

import InstantiationControl from './instantiation/instantiationControl'
import CommandControl from './command/commandControl'
import KeybindingControl from './keybinding/keybindingControl'
import NationalLanguageControl from './nationalLanguage/nationalLanguageControl'
import StorageControl from './storage/storageControl'

/**
 * 启动方法
 */
export default function start() {


  let instantiationControl = new InstantiationControl()
  let commandControl = new CommandControl()
  let keybindingControl = KeybindingControl.instance()
  let storageControl = StorageControl.instance()
  let nationalLanguageControl = new NationalLanguageControl()
  
  /** 析构函数，销毁服务 */
  let disposeControl = () => {
    Lifecycle.dispose([commandControl, keybindingControl, storageControl, nationalLanguageControl])
  }
  instantiationControl.init({
    onClose: disposeControl
  }, {
      controls: {
        commandControl,
        keybindingControl,
        nationalLanguageControl,
        storageControl
      }
    })

}