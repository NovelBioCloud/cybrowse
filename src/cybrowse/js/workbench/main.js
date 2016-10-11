import $ from 'jquery'
import _ from 'lodash'

import InstantiationService from './instantiation/instantiationService'
import CommandService from './command/commandService'
import KeybindingService from './keybinding/keybindingService'
import NLService from './nl/nlService'
import CytoscapeService from './cytoscape/cytoscapeService'
export default function start() {

  let instantiationService = new InstantiationService()
  let commandService = new CommandService()
  let keybindingService = KeybindingService.instance()
  let cytoscapeService = new CytoscapeService()
  let nls = new NLService()

  instantiationService.init({}, {
    services: {
      commandService,
      keybindingService,
      nls,
      cytoscapeService
    }
  })
  
}