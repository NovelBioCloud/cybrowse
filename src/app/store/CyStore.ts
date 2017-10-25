import { wrappedCytoscape } from '../../lib/index';
import { Service, Inject } from 'typedi';
import { Subject } from 'rxjs'
import { Emitter } from 'event-kit';
import * as $ from 'jquery'
import { CommandStore, ICommandContext } from './CommandStore';
import { NodeShapes } from '../../lib/nodeShapes';
@Service()
export class CyStore extends
    Emitter {
    @Inject()
    private commandStore: CommandStore
    private _isReady: Promise<boolean>
    private resolve: () => void
    private cy: any & JQuery
    private unredo: any
    private edgehandles: any
    private enableHandlesState: boolean
    constructor() {
        super()
        this._isReady = new Promise<boolean>((resolve, reject) => {
            this.resolve = resolve
        })
    }
    initCy(cyElement: HTMLDivElement) {
        this.cy = wrappedCytoscape({
            container: cyElement,
            elements: {
                nodes: [
                    { data: { id: 1 } },
                    { data: { id: 2 } },
                    { id: 3, data: { id: 3 } }
                ],
                edges: [
                    { data: { id: 4, source: 1, target: 2 } },
                ]
            },
            style: [{
                selector: 'node,edge',
                style: {
                    content: function (element) {
                        return element.data('label')
                    }
                }
            }, {
                selector: 'node',
                style: {
                    'background-color': function (element) {
                        if (!element.data('backgroundColor')) {
                            element.data('backgroundColor', '#ccc')
                        }
                        return element.data('backgroundColor')
                    },
                }
            }, {
                selector: 'edge',
                style: {
                    'background-color': function (element) {
                        if (!element.data('backgroundColor')) {
                            element.data('backgroundColor', '#bbb')
                        }
                        return element.data('backgroundColor')
                    },
                    'source-label': function (element) {
                        return element.data('sourceLabel')
                    },
                    'target-label': function (element) {
                        return element.data('targetLabel')
                    },
                    'line-color': function (element) {
                        if (!element.data('lineColor')) {
                            element.data('lineColor', '#ccc')
                        }
                        return element.data('lineColor')
                    },
                    'curve-style': function (element) {
                        if (!element.data('curveStyle')) {
                            element.data('curveStyle', 'haystack')
                        }
                        return element.data('curveStyle')
                    },
                    width: function (element) {
                        if (!element.data('width')) {
                            element.data('width', 5)
                        }
                        return element.data('width')
                    }
                }
            }, {
                selector: 'node',
                style: {
                    shape: function (element) {
                        const shape = element.data('shape')
                        if (!NodeShapes.shapes.includes(shape)) {
                            element.data('shape', 'ellipse')
                            return 'ellipse'
                        } else {
                            return shape
                        }
                    },
                    width: function (element) {
                        if (!element.data('width')) {
                            element.data('width', 20)
                        }
                        return element.data('width')
                    },
                    height: function (element) {
                        if (!element.data('height')) {
                            element.data('height', 20)
                        }
                        return element.data('height')
                    },
                }
            }, {
                selector: ':selected',
                style: {
                    'border-width': 1,
                    'border-color': function (element) {
                        return '#f0f'
                    },
                    'line-color': function (element) {
                        return '#f0f'
                    }
                }
            }],
            layout: { name: 'grid' /* , ... */ },
            // initial viewport state:
            zoom: 1,
            pan: { x: 0, y: 0 },
            // interaction options:
            minZoom: 1e-50,
            maxZoom: 1e50,
            zoomingEnabled: true,
            userZoomingEnabled: true,
            panningEnabled: true,
            userPanningEnabled: true,
            boxSelectionEnabled: true,
            selectionType: 'single',
            touchTapThreshold: 8,
            desktopTapThreshold: 4,
            autolock: false,
            autoungrabify: false,
            autounselectify: false,

            // rendering options:
            headless: false,
            styleEnabled: true,
            hideEdgesOnViewport: false,
            hideLabelsOnViewport: false,
            textureOnViewport: false,
            motionBlur: false,
            motionBlurOpacity: 0.2,
            wheelSensitivity: 1,
            pixelRatio: 'auto'
        })
        this.cy.ready(() => {
            this.resolve()
        })
        this.cy.on('cxttap', (e) => {
            const target = e.target
            console.log(e)
            if (target !== this.cy) {
                if (e.originalEvent.ctrlKey) {
                    target.select()
                } else {
                    this.getCy().$(':selected').unselect()
                    target.select()
                }
            }
        })
        this.initUnredo()
        this.initEdgeHandle()
        this.initPanZoom()
        this.initContextMenu()
    }
    public initContextMenu() {
        var options = {
            // List of initial menu items
            menuItems: [
                {
                    id: 'remove', // ID of menu item
                    content: 'remove', // Display content of menu item
                    tooltipText: 'remove', // Tooltip text for menu item
                    // image: { src: "remove.svg", width: 12, height: 12, x: 6, y: 4 }, // menu icon
                    // Filters the elements to have this menu item on cxttap
                    // If the selector is not truthy no elements will have this menu item on cxttap
                    selector: 'node, edge',
                    onClickFunction: (event) => { // The function to be executed on click
                        const elements = this.getCy().$(':selected')
                        this.commandStore.runCommand('deleteElements', elements)
                    },
                    disabled: false, // Whether the item will be created as disabled
                    show: true, // Whether the item will be shown or not
                    hasTrailingDivider: true, // Whether the item will have a trailing divider
                    coreAsWell: false // Whether core instance have this item on cxttap
                },
                {
                    id: 'add',
                    content: 'add',
                    tooltipText: 'add node',
                    // image: { src: "add.svg", width: 12, height: 12, x: 6, y: 4 },
                    selector: 'core',
                    coreAsWell: true,
                    onClickFunction: (e) => {
                        this.commandStore.runCommand('addNode', { ...e.position })
                    }
                }
            ],
            // css classes that menu items will have
            menuItemClasses: [
                // add class names to this list
            ],
            // css classes that context menu will have
            contextMenuClasses: [
                // add class names to this list
            ]
        };
        this.cy.contextMenus(options);
    }
    public updateData(jsonData: any): any {
        this.cy.json(jsonData)
    }
    public initPanZoom() {
        // the default values of each option are outlined below:
        var defaults = {
            zoomFactor: 0.05, // zoom factor per zoom tick
            zoomDelay: 45, // how many ms between zoom ticks
            minZoom: 0.1, // min zoom level
            maxZoom: 10, // max zoom level
            fitPadding: 50, // padding when fitting
            panSpeed: 10, // how many ms in between pan ticks
            panDistance: 10, // max pan distance per tick
            panDragAreaSize: 75, // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
            panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
            panInactiveArea: 8, // radius of inactive area in pan drag box
            panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
            zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
            fitSelector: undefined, // selector of elements to fit
            animateOnFit: function () { // whether to animate on fit
                return false;
            },
            fitAnimationDuration: 1000, // duration of animation on fit

            // icon class names
            sliderHandleIcon: 'fa fa-minus',
            zoomInIcon: 'fa fa-plus',
            zoomOutIcon: 'fa fa-minus',
            resetIcon: 'fa fa-expand'
        };

        this.cy.panzoom(defaults);
    }

    public initEdgeHandle() {
        var defaults = {
            preview: true, // whether to show added edges preview before releasing selection
            stackOrder: 4, // Controls stack order of edgehandles canvas element by setting it's z-index
            handleSize: 0, // the size of the edge handle put on nodes
            handleHitThreshold: 6, // a threshold for hit detection that makes it easier to grab the handle
            handleIcon: false, // an image to put on the handle
            // handleColor: '#ff0000', // the colour of the handle and the line drawn from it
            handleLineType: 'ghost', // can be 'ghost' for real edge, 'straight' for a straight line, or 'draw' for a draw-as-you-go line
            handleLineWidth: 3, // width of handle line in pixels
            handleOutlineColor: '#000000', // the colour of the handle outline
            handleOutlineWidth: 0, // the width of the handle outline in pixels
            handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
            handlePosition: 'middle middle', // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
            hoverDelay: 250, // time spend over a target node before it is considered a target selection
            cxt: false, // whether cxt events trigger edgehandles (useful on touch)
            enabled: true, // whether to start the plugin in the enabled state
            toggleOffOnLeave: false, // whether an edge is cancelled by leaving a node (true), or whether you need to go over again to cancel (false; allows multiple edges in one pass)
            edgeType: function (sourceNode, targetNode) {
                // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
                // returning null/undefined means an edge can't be added between the two nodes
                return 'flat';
            },
            loopAllowed: function (node) {
                // for the specified node, return whether edges from itself to itself are allowed
                return false;
            },
            nodeLoopOffset: -50, // offset for edgeType: 'node' loops
            nodeParams: function (sourceNode, targetNode) {
                // for edges between the specified source and target
                // return element object to be passed to cy.add() for intermediary node
                return {};
            },
            edgeParams: function (sourceNode, targetNode, i) {
                // for edges between the specified source and target
                // return element object to be passed to cy.add() for edge
                // NB: i indicates edge index in case of edgeType: 'node'
                return {};
            },
            start: function (sourceNode) {
                // fired when edgehandles interaction starts (drag on handle)
            },
            complete: function (sourceNode, targetNodes, addedEntities) {
                // fired when edgehandles is done and entities are added
            },
            stop: function (sourceNode) {
                // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
            },
            cancel: function (sourceNode, renderedPosition, invalidTarget) {
                // fired when edgehandles are cancelled ( incomplete - nothing has been added ) - renderedPosition is where the edgehandle was released, invalidTarget is
                // a collection on which the handle was released, but which for other reasons (loopAllowed | edgeType) is an invalid target
            },
            hoverover: function (targetNode) {
                // fired when a target is hovered
            },
            hoverout: function (targetNode) {
                // fired when a target isn't hovered anymore
            }
        };

        this.edgehandles = this.cy.edgehandles(defaults);
        const enableEdgehandles: ICommandContext = {
            run: () => {
                this.enableHandlesState = true
                this.cy.edgehandles('enable')
            }
        }
        this.commandStore.registerCommand('enableEdgehandles', enableEdgehandles)
        const disableEdgehandles: ICommandContext = {
            run: () => {
                this.enableHandlesState = false
                this.cy.edgehandles('disable')
            }
        }
        this.commandStore.registerCommand('disabledEdgehandles', disableEdgehandles)
        this.enableHandlesState = true
        const toggleEdgehandles: ICommandContext = {
            run: () => {
                if (this.enableHandlesState) {
                    this.enableHandlesState = false
                    this.cy.edgehandles('disable')
                } else {
                    this.enableHandlesState = true
                    this.cy.edgehandles('enable')
                }
            }
        }
        this.commandStore.registerCommand('toggleEdgehandles', toggleEdgehandles)
    }

    public initUnredo() {
        var options = {
            isDebug: true, // Debug mode for console messages
            actions: {},// actions to be added
            undoableDrag: true, // Whether dragging nodes are undoable can be a function as well
            stackSizeLimit: undefined, // Size limit of undo stack, note that the size of redo stack cannot exceed size of undo stack
            ready: function () { // callback when undo-redo is ready

            }
        }

        this.unredo = this.cy.undoRedo(options); // Can also be set whenever wanted.
    }
    public initNavigator(element: HTMLDivElement) {
        var defaults = {
            container: element // can be a HTML or jQuery element or jQuery selector
            , viewLiveFramerate: 0 // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
            , thumbnailEventFramerate: 30 // max thumbnail's updates per second triggered by graph updates
            , thumbnailLiveFramerate: false // max thumbnail's updates per second. Set false to disable
            , dblClickDelay: 200 // milliseconds
            , removeCustomContainer: true // destroy the container specified by user on plugin destroy
            , rerenderDelay: 100 // ms to throttle rerender updates to the panzoom for performance
        };

        var nav = this.cy.navigator(defaults); // get navigator instance, nav
    }
    public async onCyInit() {
        return Promise.resolve(this._isReady)
    }
    public getCy() {
        return this.cy
    }
    public getUnredo() {
        return this.unredo
    }


}
