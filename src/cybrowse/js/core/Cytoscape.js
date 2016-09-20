import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import cytoscape from 'cytoscape'

export default function Cytoscape() {
	let _this = this
	let $container
	let $view
	let defaultConfig
  let cytoscapeInstance
	let dataService = getDataService()
	let viewService = getViewService()
	let eventService = getEventService()
	let base = getBase()
	this.init = function (props) {
		base.init(props)
	}

	function getBase() {
		return {
			init: (props) => {
				async.series([
						(callback) => {
							dataService.init(props)
							callback(null)
            }, (callback) => {
							dataService.loadDefaultConfig(callback)
            }, (callback) => {
							viewService.init()
							callback(null)
            }, (callback) => {
							eventService.init()
							callback(null)
            }
          ],
					(err, results) => {})
			},
			reloadDefaultConfig: () => {
				$.getJSON('data/data.json', (data) => {
					postal.channel().publish('defaultConfig.change', data)
				});
			}
		}
	}

	function getDataService() {
		return {
			init: (props) => {
				_this.props = props
				$container = $(props.container)
			},
			loadDefaultConfig: (callback) => {
				$.getJSON('data/defaultConfig.json', (data) => {
					callback()
				})
			}

		}
	}

	function getViewService() {
		return {
			getTemplate: () => {
				return `<div class='class-cytoscape'>
          <div class='cytoscape-view' data-cytoscape-view></div>
        </div>`
			},
			init: () => {
				$view = $(viewService.getTemplate())
				$container.empty()
				$container.append($view)
				let cytoscapeView = $container.find("[data-cytoscape-view]")
				cytoscapeInstance = cytoscape({
					container: cytoscapeView,
					style: [{
						selector: 'node',
						style: {}
          }, {
						selector: 'edge',
						style: {}
          }],
					layout: defaultLayout
				});
				cytoscapeInstance.add([{
					id: '1'
        }]);
				if (_this.props.initializedCallback) {
					_this.props.initializedCallback(cytoscapeInstance)
				}
			}
		}
	}

	function getEventService() {
		return {
			init: () => {
				postal.channel().subscribe('defaultConfig.reload', () => {
					base.reloadDefaultConfig()
				})
			}
		}
	}
}

const defaultLayout = {
  name: 'cose',
  // Called on `layoutready`
  ready: function () {},

  // Called on `layoutstop`
  stop: function () {},

  // Whether to animate while running the layout
  animate: true,

  // The layout animates only after this many milliseconds
  // (prevents flashing on fast runs)
  animationThreshold: 250,

  // Number of iterations between consecutive screen positions update
  // (0 -> only updated on the end)
  refresh: 20,

  // Whether to fit the network view after when done
  fit: true,

  // Padding on fit
  padding: 30,

  // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  boundingBox: undefined,

  // Randomize the initial positions of the nodes (true) or use existing positions (false)
  randomize: false,

  // Extra spacing between components in non-compound graphs
  componentSpacing: 100,

  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: function (node) {
    return 400000;
  },

  // Node repulsion (overlapping) multiplier
  nodeOverlap: 10,

  // Ideal edge (non nested) length
  idealEdgeLength: function (edge) {
    return 10;
  },

  // Divisor to compute edge forces
  edgeElasticity: function (edge) {
    return 100;
  },

  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor: 5,

  // Gravity force (constant)
  gravity: 80,

  // Maximum number of iterations to perform
  numIter: 1000,

  // Initial temperature (maximum node displacement)
  initialTemp: 200,

  // Cooling factor (how the temperature is reduced between consecutive iterations
  coolingFactor: 0.95,

  // Lower temperature threshold (below this point the layout will end)
  minTemp: 1.0,

  // Whether to use threading to speed up the layout
  useMultitasking: true
}
