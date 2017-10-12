
import { EventEmitter } from 'events'
import { PPromise } from '../base'
import { style as cytoscapeStyle } from './cytoscapeStyle'
const $: JQueryStatic = require('jquery')
const cytoscape: any = require('cytoscape')

interface Options {
    container: JQuery
}
const EVENT = {
    SELECTED: 'selected',
    INITED: 'inited'
}
export class TaskSelectorComponent {
    private options: Options
    private container: JQuery
    private emitter: EventEmitter = new EventEmitter()
    private $element: JQuery
    private $content: JQuery
    private data: any = []
    private cytoInstance: any
    private _inited: Promise<any>
    private _resolve
    constructor() {
        this._inited = new Promise<any>((resolve, reject) => {
            this._resolve = resolve
        })
    }

    get onSelect(): Function {
        return (callback: (task?: any) => void) => {
            this.emitter.addListener(EVENT.SELECTED, callback)
            return {
                dispose: () => {
                    this.emitter.removeListener(EVENT.SELECTED, callback)
                }
            }
        }
    }
    get onInited(): Promise<any> {
        return this._inited
    }
    init(options: Options) {
        this.options = options
        this.container = options.container
        const viewTemplate = `
            <div style='display:flex;flex-direction:column;height:100%;'>
                <div class='fn-title' style="background:#cccccc;flex:none;padding:5px;">任务选择</div>
                <div class='fn-content' style="background:#717181;flex:auto;"></div>
            </div>
        `
        this.$element = $(viewTemplate).appendTo(this.container)
        this.$content = this.$element.find('.fn-content')
        setTimeout(() => {
            this.initCytoscape()
        }, 0)
    }
    setData(data: Object[] = []) {
        this.data = data
        this.cytoInstance.remove(this.cytoInstance.elements())
        this.cytoInstance.add(data)
        this.cytoInstance.fit()
        this.cytoInstance.center()
        this.cytoInstance.zoom((this.$element.width() || 500) / 1400)
    }
    initCytoscape() {
        this.cytoInstance = cytoscape({
            container: this.$content,
            layout: [],
            minZoom: 0.2,
            maxZoom: 1.5,
            selectionType: 'single',
            autoungrabify: true,
            wheelSensitivity: 0.3,
            boxSelectionEnabled: false,
            style: cytoscape.stylesheet()
                .selector('node').css(cytoscapeStyle.node)
                .selector('edge').css(cytoscapeStyle.edge)
                .selector('node:selected').css(cytoscapeStyle.selectedNode)
                .selector('edge:selected').css(cytoscapeStyle.selectedEdge)
        })
        this.container.resize(() => {
            this.cytoInstance.resize()
        })
        this.cytoInstance.on('tap', 'node', (event) => {
            this.emitSelectEvent(event.cyTarget.data())
        })
        this._resolve()
    }
    emitSelectEvent(data) {
        this.emitter.emit(EVENT.SELECTED, data)
    }
    
    notifySelectTask(task: any) {
        this.cytoInstance.elements().unselect()
        this.cytoInstance.elements(`node[id='${task.id}']`).select()
    }
} 