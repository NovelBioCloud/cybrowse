
import $ from 'jquery'
import _ from 'lodash'
import { saveAs } from 'file-saver'
import EventMitter from 'events'
import Cytoscape from './cytoscape'
import { dispose } from '../../base/lifecycle'
import CommandService from '../../workbench/command/commandService'
import KeybindingService from '../../workbench/keybinding/keybindingService'
import { SaveMenuCommand, ViewPanelCommand } from '../command/commands'
import cytoscapeEvents from '../constants/cytoscapeEvents'

/**cytoscape 图像视图 */
export default class ViewPanel extends EventMitter {

  constructor() {
    super()
  }

  init(props, context, options) {
    this.container = props.container
    this.props = props
    this.context = context
    this.render()
    this.initEvent()
  }
  render() {
    const $el = $('<div/>').appendTo($(this.container))
    this.el = $el.get(0)
    const cytoscapeContainer = $(`<div/>`).appendTo($el)
    this.cytoscape = new Cytoscape()
    this.cytoscape.init({
      container: cytoscapeContainer
    }, this.context)
    this.cy = this.cytoscape.get()
    this.cy.center()
  }
  initEvent() {
    Object.keys(cytoscapeEvents).forEach((eventName) => {
      this.cy.on(eventName, (event) => {
        this.emit(eventName, event)
      });
    })
    const commandService = this.context.services.commandService
    commandService.registerCommand(ViewPanelCommand.center, {
      args: null,
      handle: () => {
        this.cy.center()
      }
    })
    commandService.registerCommand(ViewPanelCommand.zoomIn, {
      args: null,
      handle: () => {
        const zoom = this.cy.zoom() + 0.1
        this.cy.zoom(zoom)
      }
    })
    commandService.registerCommand(ViewPanelCommand.zoomOut, {
      args: null,
      handle: () => {
        const zoom = this.cy.zoom() - 0.1
        this.cy.zoom(zoom)
      }
    })
    function dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
    commandService.registerCommand(SaveMenuCommand.savePng, {
      args: null,
      handle: () => {
        const pngData = this.cy.png()
        saveAs(this.dataURLtoBlob(pngData))
      }
    })
    commandService.registerCommand(SaveMenuCommand.saveJpg, {
      args: null,
      handle: () => {
        const jpgData = this.cy.jpg()
        saveAs(this.dataURLtoBlob(jpgData))
      }
    })
    commandService.registerCommand(SaveMenuCommand.saveNetwork, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    commandService.registerCommand(SaveMenuCommand.saveNetworkAndView, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    commandService.registerCommand(SaveMenuCommand.saveStyle, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    commandService.registerCommand(SaveMenuCommand.saveCvs, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    const keybindingService = this.context.services.keybindingService
    keybindingService.bind(['ctrl+shift+c'], function (e) {
      commandService.runCommand(ViewPanelCommand.center)
      return false
    });

    keybindingService.bind(['ctrl+shift++'], function (e) {
      commandService.runCommand(ViewPanelCommand.zoomIn)
      return false
    });

    keybindingService.bind(['ctrl+shift+-'], function (e) {
      commandService.runCommand(ViewPanelCommand.zoomOut)
      return false
    });
  }
  /** 将 dataurl 数据修改为Blob */
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  /** 设置节点和连线数据 */
  setElements(elements) {
    try {
      this.cytoscape.cy.remove(this.cytoscape.cy.elements())
      this.cytoscape.cy.add(elements)
    } catch (e) {
      this.context.services.messageService.error('数据加载错误')
    }
  }
  /** 设置样式 */
  setStyles(style) {
    try {
      this.cy.style().resetToDefault()
      this.cy.style(style.style)
    } catch (e) {
      this.context.services.messageService.error('数据加载错误')
    }
  }
  /** 设置布局 */
  setLayout(layout) {
    this.cy.layout(layout)
  }
  /** 更新属性 */
  updateProperty(datas, idName) {
    const elements = this.cy.elements('node')
    _.each(elements, (element) => {
      const data = _.find(datas, (data) => {
        return element.data('name') === data.data[idName]
      })
      if (data && data.data) {
        const keys = _.pull(_.keys(data.data), idName)
        _.each(keys, key => {
          element.data(key, data.data[key])
        })
      }
    })
  }
  dispose() {
  }
}