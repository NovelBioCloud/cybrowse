import * as $ from 'jquery'


const cytoscape = require('cytoscape')

const clipboard = require('cytoscape-clipboard')
clipboard(cytoscape, $);

const undoRedo = require('cytoscape-undo-redo')
undoRedo(cytoscape)

const cyCanvas = require('cytoscape-canvas')
cyCanvas(cytoscape)

require('../../node_modules/cytoscape-navigator/cytoscape.js-navigator.css')
const navigator = require('cytoscape-navigator');
navigator(cytoscape, $);

const edgehandles = require('cytoscape-edgehandles')
edgehandles(cytoscape)

const panzoom = require('cytoscape-panzoom');
panzoom(cytoscape)

require('../../node_modules/cytoscape-context-menus/cytoscape-context-menus.css')
const contextMenus = require('cytoscape-context-menus');
contextMenus(cytoscape, $);

export const wrappedCytoscape = cytoscape 
