import $ from 'jquery'
import _ from 'lodash'
import Lifecycle from '../base/lifecycle/lifecycle'

import InstantiationService from './instantiation/instantiationService'
import CommandService from './command/commandService'
import KeybindingService from './keybinding/keybindingService'
import NLService from './nl/nlService'
import StorageService from './storage/storageService'

/**
 * 启动方法
 */
export default function start() {


  let instantiationService = new InstantiationService()
  let commandService = new CommandService()
  let keybindingService = KeybindingService.instance()
  let storageService = StorageService.instance()
  let nls = new NLService()
  
  /** 析构函数，销毁服务 */
  let disposeService = () => {
    Lifecycle.dispose([commandService, keybindingService, storageService, nls])
  }
  instantiationService.init({
    onClose: disposeService
  }, {
      services: {
        commandService,
        keybindingService,
        nls,
        storageService
      }
    })

}