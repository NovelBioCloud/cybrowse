import $ from 'jquery'
import _ from 'lodash'
import Lifecycle from '../base/lifecycle'

import InstantiationService from './instantiation/instantiationService'
import CommandService from './command/commandService'
import KeybindingService from './keybinding/keybindingService'
import NationalLanguageService from './nationalLanguage/nationalLanguageService'
import StorageService from './storage/storageService'

/**
 * 启动方法
 */
export default function start() {


  let instantiationService = new InstantiationService()
  let commandService = new CommandService()
  let keybindingService = KeybindingService.instance()
  let storageService = StorageService.instance()
  let nationalLanguageService = new NationalLanguageService()
  
  /** 析构函数，销毁服务 */
  let disposeService = () => {
    Lifecycle.dispose([commandService, keybindingService, storageService, nationalLanguageService])
  }
  instantiationService.init({
    onClose: disposeService
  }, {
      services: {
        commandService,
        keybindingService,
        nationalLanguageService,
        storageService
      }
    })

}