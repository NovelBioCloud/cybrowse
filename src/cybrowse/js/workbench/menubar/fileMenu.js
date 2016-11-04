import $ from 'jquery'
import CommandService from '../command/commandService'
import KeybindingService from '../keybinding/keybindingService'
import FileSelector from '../../base/fileSelector/fileSelector'
import { FileMenuCommands } from '../command/commands'

/** 文件按钮 */
export default class FileMenu {

  init(props, context) {
    this.props = props
    this.context = context
    let container = props.container
    this.container = container
    this.initServices()
    this.render()
    this.registerCommand()
    this.registerListener()
  }
  render() {
    const $el = $(`
      <div class='btn-group'>
        <button type='button' class='fn-file-menu btn btn-default dropdown-toggle' data-toggle='dropdown'>
          文件&nbsp;(ALT+F)
        </button>
        <ul class='dropdown-menu' role='menu'>
          <li><a class='fn-new-file' href='javascript:void(0)'>新建文件</a></li>
          <li><a class='fn-open-file' href='javascript:void(0)'>打开文件</a></li>
          <li><a class='fn-import-file' href='javascript:void(0)'>导入网络文件</a></li>
          <li><a class='fn-import-property' href='javascript:void(0)'>导入属性文件</a></li>
        </ul>
      </div>
    `)
    $el.appendTo($(this.container))
    this.el = $el.get(0)
  }
  initServices() {
    const services = Object.assign({}, this.context.services)
    this.services = services
    const context = {
      services: services
    }
  }
  registerCommand() {
    const commandService = this.services.commandService
    commandService.registerCommand(FileMenuCommands.newFile, {
      args: null,
      handle: () => {
        this.newFile()
      }
    })
    commandService.registerCommand(FileMenuCommands.openFile, {
      args: null,
      handle: () => {
        this.openFile()
      }
    })
  }
  newFile() {
    console.log('newFile')
  }
  importFile() {

  }
  openFile() {
    const currentDataService = this.services.currentDataService
    FileSelector.show({
      accept: ".jpg, .png, .jpeg, .tiff|images/*",
      onChange: (files) => {
        console.log(files)
      }
    })
    currentDataService.setData([{
      "data": {
        "id": "68",
        "activityRatio": 0.0,
        "plotted": true,
        "description": "",
        "enabled": true,
        "shared_name": "Node 3",
        "moleculeType": "Kinase",
        "name": "Node 3",
        "randomInitialConcentration": false,
        "SUID": 68,
        "initialConcentration": 0,
        "selected": false,
        "levels": 100,
        "canonicalName": "test3"
      },
      "position": {
        "x": 73.0,
        "y": -112.0
      },
      "selected": false
    }, {
      "data": {
        "id": "66",
        "activityRatio": 0.0,
        "plotted": true,
        "description": "test2",
        "enabled": true,
        "shared_name": "Node 2",
        "moleculeType": "Kinase",
        "name": "Node 2",
        "randomInitialConcentration": false,
        "SUID": 66,
        "initialConcentration": 0,
        "selected": false,
        "levels": 100,
        "canonicalName": "test2"
      },
      "position": {
        "x": -284.0,
        "y": 72.0
      },
      "selected": false
    }, {
      "data": {
        "id": "64",
        "activityRatio": 0.0,
        "plotted": true,
        "description": "test1",
        "enabled": true,
        "shared_name": "Node 1",
        "moleculeType": "Gene",
        "name": "Node 1",
        "randomInitialConcentration": false,
        "SUID": 64,
        "initialConcentration": 0,
        "selected": false,
        "levels": 100,
        "canonicalName": "test1"
      },
      "position": {
        "x": -464.0,
        "y": -109.0
      },
      "selected": false
    }, {
      "data": {
        "id": "76",
        "source": "66",
        "target": "68",
        "shared_interaction": "interacts with",
        "increment": 1,
        "description": "",
        "k": 0.004,
        "enabled": true,
        "shared_name": "Node 2 (interacts with) Node 3",
        "scenario": 0,
        "name": "Node 2 (interacts with) Node 3",
        "interaction": "interacts with",
        "SUID": 76,
        "selected": false,
        "canonicalName": "test2 --> test3"
      },
      "selected": false
    }, {
      "data": {
        "id": "74",
        "source": "64",
        "target": "66",
        "shared_interaction": "interacts with",
        "increment": 1,
        "description": "",
        "k": 0.006,
        "enabled": false,
        "shared_name": "Node 1 (interacts with) Node 2",
        "scenario": 0,
        "name": "Node 1 (interacts with) Node 2",
        "interaction": "interacts with",
        "SUID": 74,
        "selected": false,
        "canonicalName": "test1 --> test2"
      },
      "selected": false
    }, {
      "data": {
        "id": "72",
        "source": "64",
        "target": "68",
        "shared_interaction": "interacts with",
        "increment": 1,
        "description": "",
        "k": 0.004,
        "enabled": true,
        "shared_name": "Node 1 (interacts with) Node 3",
        "scenario": 0,
        "name": "Node 1 (interacts with) Node 3",
        "interaction": "interacts with",
        "SUID": 72,
        "selected": false,
        "canonicalName": "test1 --> test3"
      },
      "selected": false
    }])
  }
  registerListener() {
    const $el = $(this.el)
    const commandService = this.services.commandService
    const keybindingService = this.services.keybindingService
    keybindingService.bind(['alt+f'], function (e) {
      $el.find('.fn-file-menu').trigger('click')
      return false
    });

    $el.find('.fn-new-file').on('click', () => {
      commandService.runCommand(FileMenuCommands.newFile)
    })
    $el.find('.fn-open-file').on('click', () => {
      commandService.runCommand(FileMenuCommands.openFile)
    })
    $el.find('.fn-import-file').on('click', () => {
      commandService.runCommand(FileMenuCommands.importFile)
    })
    $el.find('.fn-import-property').on('click', () => {
      commandService.runCommand(FileMenuCommands.importProperty)
    })
  }
  destroy() {
    this.$el.remove()
  }

}