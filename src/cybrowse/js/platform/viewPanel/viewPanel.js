
import $ from 'jquery'
import _ from 'lodash'
import { saveAs } from 'file-saver'
import EventMitter from 'events'
import Cytoscape from './cytoscape'
import { dispose } from '../../base/lifecycle'
import CommandControl from '../../workbench/command/commandControl'
import KeybindingControl from '../../workbench/keybinding/keybindingControl'
import { SaveMenuCommand, ViewPanelCommand } from '../command/commands'
import cytoscapeEvents from '../constants/cytoscapeEvents'

/**
 * cytoscape 图像视图，现实图像提供事件注册的入口
 */
export default class ViewPanel extends EventMitter {

  constructor() {
    super()
  }

  /** 初始化方法 */
  init(props, context) {
    this.container = props.container
    this.props = props
    this.context = context
    this.render()
    this.initEvent()
  }
  /** 渲染视图 */
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
  /** 初始化个viewPanel相关的命令和键盘事件 */
  initEvent() {
    Object.keys(cytoscapeEvents).forEach((eventName) => {
      this.cy.on(eventName, (event) => {
        this.emit(eventName, event)
      });
    })
    const commandControl = this.context.controls.commandControl
    commandControl.registerCommand(ViewPanelCommand.center, {
      args: null,
      handle: () => {
        this.cy.center()
      }
    })
    commandControl.registerCommand(ViewPanelCommand.zoomIn, {
      args: null,
      handle: () => {
        const zoom = this.cy.zoom() + 0.1
        this.cy.zoom(zoom)
      }
    })
    commandControl.registerCommand(ViewPanelCommand.zoomOut, {
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
    commandControl.registerCommand(SaveMenuCommand.savePng, {
      args: null,
      handle: () => {
        const pngData = this.cy.png()
        saveAs(this.dataURLtoBlob(pngData))
      }
    })
    commandControl.registerCommand(SaveMenuCommand.saveJpg, {
      args: null,
      handle: () => {
        const jpgData = this.cy.jpg()
        saveAs(this.dataURLtoBlob(jpgData))
      }
    })
    commandControl.registerCommand(SaveMenuCommand.saveNetwork, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    commandControl.registerCommand(SaveMenuCommand.saveNetworkAndView, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    commandControl.registerCommand(SaveMenuCommand.saveStyle, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    commandControl.registerCommand(SaveMenuCommand.saveCvs, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    const keybindingControl = this.context.controls.keybindingControl
    keybindingControl.bind(['ctrl+shift+c'], function (e) {
      commandControl.runCommand(ViewPanelCommand.center)
      return false
    });

    keybindingControl.bind(['ctrl+shift++'], function (e) {
      commandControl.runCommand(ViewPanelCommand.zoomIn)
      return false
    });

    keybindingControl.bind(['ctrl+shift+-'], function (e) {
      commandControl.runCommand(ViewPanelCommand.zoomOut)
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
      this.context.controls.messageControl.error('数据加载错误')
    }
  }
  /** 设置样式 */
  setStyles(style) {
    try {
      this.cy.style().resetToDefault()
      this.cy.style(style.style)
    } catch (e) {
      this.context.controls.messageControl.error('数据加载错误')
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

}