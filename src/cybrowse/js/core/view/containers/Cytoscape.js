import React, {
	Component
} from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import _ from 'lodash'
import immutable from 'immutable'
import postal from 'postal'
import toastr from 'toastr'
import async from 'async'
import assert from 'assert'
import {
	createStore,
	combineReducers,
	bindActionCreators,
	applyMiddleware
} from 'redux'
import {
	connect,
	Provider
} from 'react-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import cytoscape from 'cytoscape'
import {
	eventDispatcher,
} from '../../service'
import {
	DataActions
} from '../actions'

class Cytoscape extends Component {
	componentDidMount() {
		this.initCytoscape()
		this.subscribe()
	}
	componentWillUnmount() {
		this.unsubscribe()
	}
	initCytoscape() {
		this.cy = cytoscape({
			container: this.refs.cytoscape,
			style: [{
				selector: 'node',
				style: this.props.computedNodeConfig
      }, {
				selector: 'edge',
				style: this.props.computedEdgeConfig
      }, {
				selector: 'edge',
				style: {
					background: 'rgba(100,200,200,0.2)'
				}
      }],
			layout: this.props.computedNetworkConfig.layout || defaultLayout
		});
		this.cy.add([{
			id: '1'
		}, {
			id: '2'
		}])
		postal.channel().publish('cytoscapeInstance.change', this.cy)
	}
	subscribe() {

	}
	unsubscribe() {

	}

	renderInitialized() {
		return ( < div ref = 'cytoscape'
			style = {{
					height: "300px",
					background: "rgba(2,2,2,0.2)"
				}} >

			< /div>
		)
	}
	render() {
		return this.renderInitialized()
	}
}
Cytoscape.propTypes = {
	dispatch: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		data: state.data,
		computedNetworkConfig: state.computedNetworkConfig,
		computedNodeConfig: state.computedNodeConfig,
		computedEdgeConfig: state.computedEdgeConfig,
	}
}

function mapActionToProps(dispatch, state) {
	return {
		loadData: bindActionCreators(DataActions.loadData, dispatch),
		dispatch: dispatch
	}
}
export default connect(
	mapStateToProps,
	mapActionToProps
)(Cytoscape)
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
